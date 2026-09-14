#!/usr/bin/env python3
"""Publish immutable incremental snapshots; a lost response is verified by receipt."""
import argparse
import hashlib
import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from arxiv_client import atomic_json

ROOT = Path(__file__).resolve().parents[1]
SITE = 'https://geometry-arxiv-daily-jch.zychern672259.chatgpt.site'


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()


def request_json(path, body=None, private=False):
    headers = {'Accept': 'application/json', 'Cache-Control': 'no-cache'}
    if os.environ.get('OAI_SITES_AUTHORIZATION'):
        headers['OAI-Sites-Authorization'] = 'Bearer ' + os.environ['OAI_SITES_AUTHORIZATION']
    if private:
        headers['Authorization'] = 'Bearer ' + (ROOT / '.automation/ingest-token').read_text().strip()
    if body is not None:
        headers['Content-Type'] = 'application/json'
    request = urllib.request.Request(SITE + path, data=json.dumps(body, ensure_ascii=False).encode() if body is not None else None, headers=headers)
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.load(response)


def verify_receipt(batch):
    try:
        receipt = request_json('/api/ingest/receipt?id=' + urllib.parse.quote(batch['publicationId']), private=True)
    except urllib.error.HTTPError as error:
        if error.code == 404:
            return None
        raise
    if receipt['contentHash'] != batch['contentHash']:
        raise RuntimeError('Publication ID belongs to different content')
    snapshot = receipt['snapshot']
    if digest({**snapshot, 'contentHash': ''}) != snapshot['contentHash']:
        raise RuntimeError('Receipt snapshot hash mismatch')
    return snapshot


def publish(candidate, directory, api=request_json, verify=verify_receipt):
    directory = Path(directory)
    directory.mkdir(parents=True, exist_ok=True)
    intent = digest(candidate)
    intent_path = directory / (intent + '.json')
    if intent_path.exists():
        batch = json.loads(intent_path.read_text())
    else:
        current = api('/api/reports/v2?date=' + candidate['date'])
        batch = {**candidate, 'schemaVersion': 3, 'baseRevision': current['revision'], 'publicationId': 'progressive-' + intent[:40] + '-' + str(current['revision'])}
        batch['contentHash'] = digest(batch)
        atomic_json(intent_path, batch)
    for _ in range(3):
        snapshot = verify(batch)
        if snapshot is None:
            try:
                snapshot = api('/api/ingest/v3', batch, True)
            except urllib.error.HTTPError as error:
                if error.code != 409:
                    raise
                current = api('/api/reports/v2?date=' + candidate['date'])
                batch = {**candidate, 'schemaVersion': 3, 'baseRevision': current['revision'], 'publicationId': 'progressive-' + intent[:40] + '-' + str(current['revision'])}
                batch['contentHash'] = digest(batch)
                atomic_json(intent_path, batch)
                continue
            except (urllib.error.URLError, TimeoutError, OSError):
                snapshot = verify(batch)
                if snapshot is None:
                    raise RuntimeError('Write unconfirmed; immutable batch retained') from None
        confirmed = verify(batch)
        if confirmed is None or confirmed != snapshot:
            raise RuntimeError('Published content does not match immutable receipt')
        current = api('/api/reports/v2?date=' + candidate['date'])
        if current['revision'] < snapshot['revision']:
            raise RuntimeError('Published revision is not visible')
        if digest({**current, 'contentHash': ''}) != current['contentHash']:
            raise RuntimeError('Visible snapshot hash mismatch')
        atomic_json(directory / 'published.json', current)
        outbox = ROOT / '.automation/progress/mirror-outbox.json'
        state = json.loads(outbox.read_text()) if outbox.exists() else {'days': {}}
        old = state['days'].get(current['date'])
        if not old or old['revision'] < current['revision']:
            state['days'][current['date']] = {'revision': current['revision'], 'contentHash': current['contentHash'], 'status': 'pending', 'snapshotPath': str((directory / 'published.json').resolve())}
            atomic_json(outbox, state)
        return current
    raise RuntimeError('Concurrent updates prevented publication; retry saved intent')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('candidate')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    # All callers, including the daily orchestrator, share this short-lived lock.
    import fcntl
    with (ROOT / '.automation/daily-write.flock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        result = publish(json.loads(Path(args.candidate).read_text()), args.out)
    print(json.dumps({'date': result['date'], 'revision': result['revision'], 'coverage': result['coverage']}))


if __name__ == '__main__':
    main()
