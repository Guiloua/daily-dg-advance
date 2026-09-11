"""Single-connection arXiv transport shared by all local automation processes.

ARXIV_RUN_ID must be identical for subprocesses in one scheduled run. Cache scope
is the scheduled slot, so the afternoon always rechecks the morning's listing.
No credentials, request payloads or response bodies are logged.
"""
from __future__ import annotations

import fcntl
import hashlib
import json
import os
import random
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(os.environ.get('ARXIV_CACHE_DIR', str(Path(__file__).resolve().parents[1] / '.automation' / 'arxiv-cache')))


class Deferred(RuntimeError):
    """Progress is safe on disk; resume in the next scheduled slot."""


def atomic_json(path: Path, value: dict):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + f'.{os.getpid()}.tmp')
    temporary.write_text(json.dumps(value, ensure_ascii=False), encoding='utf-8')
    temporary.replace(path)


def retry_after(value: str | None, now: float) -> float | None:
    if not value:
        return None
    try:
        return max(0, float(value))
    except ValueError:
        try:
            return max(0, parsedate_to_datetime(value).timestamp() - now)
        except (ValueError, TypeError, OverflowError):
            return None


class ArxivClient:
    def __init__(self, root=ROOT, run_id=None, *, clock=time.time,
                 sleep=time.sleep, opener=urllib.request.urlopen, jitter=random.uniform):
        self.root = Path(root)
        self.root.mkdir(parents=True, exist_ok=True)
        self.run_id = run_id or os.environ.get('ARXIV_RUN_ID') or f'manual-{os.getpid()}'
        self.clock, self.sleep, self.opener, self.jitter = clock, sleep, opener, jitter
        self.run_key = hashlib.sha256(self.run_id.encode()).hexdigest()

    def request(self, url: str, *, cache=True) -> bytes:
        parsed = urllib.parse.urlsplit(url)
        if parsed.scheme != 'https' or parsed.hostname not in ('arxiv.org', 'export.arxiv.org'):
            raise ValueError('Only approved HTTPS arXiv sources are allowed')
        immutable = bool(re.search(r'^/(?:html|pdf|abs)/.+v\d+$', parsed.path))
        key = hashlib.sha256((('versioned' if immutable else self.run_id) + '\n' + url).encode()).hexdigest()
        cache_path = self.root / (key + '.json')
        # Lock is held through network IO, including cooldown. Other processes
        # never overlap an in-flight request; killed processes release flock.
        with (self.root / 'transport.lock').open('a') as lock:
            started_wait = self.clock()
            while True:
                try:
                    fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
                    break
                except BlockingIOError:
                    if self.clock() - started_wait >= 1200:
                        raise Deferred('arXiv transport is busy; resume next slot') from None
                    self.sleep(1)
            state_path = self.root / 'state.json'
            state = json.loads(state_path.read_text()) if state_path.exists() else {}
            budget_path = self.root / (self.run_key + '.budget.json')
            budget = json.loads(budget_path.read_text()) if budget_path.exists() else {'waited': 0}
            budget['waited'] += max(0, self.clock() - started_wait)
            atomic_json(budget_path, budget)
            if cache and cache_path.exists():
                cached = json.loads(cache_path.read_text())
                budget['cacheHits'] = budget.get('cacheHits', 0) + 1
                atomic_json(budget_path, budget)
                return bytes.fromhex(cached['body'])
            attempts = budget.setdefault('attempts', {})
            if attempts.get(key, 0) >= 3:
                raise Deferred('This request already exhausted its attempts in this slot')
            for attempt in range(attempts.get(key, 0), 3):
                wait = max(0, state.get('nextAllowedAt', 0) - self.clock())
                if budget['waited'] + wait > 1200:
                    raise Deferred('arXiv cooldown exceeds this run’s waiting budget; resume next slot')
                budget['waited'] += wait
                atomic_json(budget_path, budget)
                while wait > 0:
                    self.sleep(min(wait, 30))
                    wait = max(0, state.get('nextAllowedAt', 0) - self.clock())
                error_code = None
                attempts[key] = attempt + 1
                budget['requests'] = budget.get('requests', 0) + 1
                atomic_json(budget_path, budget)
                try:
                    req = urllib.request.Request(url, headers={'User-Agent': 'GeometryArxivDaily/3.0 (research briefing)'})
                    with self.opener(req, timeout=60) as response:
                        body = response.read()
                    if cache:
                        atomic_json(cache_path, {'url': url, 'fetchedAt': datetime.now(timezone.utc).isoformat(),
                                                 'sha256': hashlib.sha256(body).hexdigest(), 'body': body.hex()})
                    return body
                except urllib.error.HTTPError as error:
                    error_code = error.code
                    if error.code not in (429, 500, 502, 503, 504):
                        raise RuntimeError(f'arXiv HTTP {error.code}; no automatic retry') from None
                    delay = retry_after(error.headers.get('Retry-After'), self.clock())
                    if delay is None:
                        delay = (60, 180, 600)[attempt] + self.jitter(0, 5)
                    state['nextAllowedAt'] = self.clock() + max(4, delay)
                except (urllib.error.URLError, TimeoutError, OSError):
                    state['nextAllowedAt'] = self.clock() + (15, 60, 180)[attempt] + self.jitter(0, 5)
                finally:
                    state['nextAllowedAt'] = max(state.get('nextAllowedAt', 0), self.clock() + 4)
                    atomic_json(state_path, state)
                if attempt == 2:
                    raise Deferred(f'arXiv unavailable after three attempts (HTTP {error_code or "network"}); progress retained')
        raise AssertionError('unreachable')


def request(url: str) -> bytes:
    return ArxivClient().request(url)


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Polite, cached fulltext/metadata read; never bypass cooldown')
    parser.add_argument('--url', required=True)
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    body = request(args.url)
    Path(args.out).write_bytes(body)
    print(json.dumps({'status': 'downloaded', 'bytes': len(body)}))
