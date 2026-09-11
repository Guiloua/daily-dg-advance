#!/usr/bin/env python3
"""Publish a validated report or volume-history JSON payload without logging secrets."""

from __future__ import annotations

import argparse
import json
import urllib.request
import urllib.error
import urllib.parse
import time
from pathlib import Path
from datetime import datetime
from run_progress import checkpoint, fingerprint


def batch_is_visible(batch, feed, state):
    """Compare content, not just counts, after an uncertain write response."""
    if feed.get('date') != batch['announcementDay']['date'] or feed.get('lastUpdated') != batch['run']['completedAt']:
        return False
    coverage = feed.get('coverage', {})
    count = batch['run']['expectedCount']
    if not coverage.get('complete') or coverage.get('expectedCount') != count or coverage.get('publishedCount') != count:
        return False
    if state.get('sourceCursor') != batch['run']['sourceCursor']:
        return False
    actual = {(r['arxivId'], r['version']): r for r in feed.get('reports', [])}
    for report in batch['reports']:
        current = actual.get((report['arxivId'], report['version']), {})
        if any(current.get(key) != value for key, value in report.items()):
            return False
    return {r['arxivId'] for r in feed.get('reports', []) if r.get('entryKind') != 'revision'} == {r['arxivId'] for r in batch['reports'] if r.get('entryKind') != 'revision'}


def read_state_and_feed(site, token, batch):
    def read(path, private=False):
        headers = {'Accept': 'application/json', 'Cache-Control': 'no-cache'}
        if private: headers['Authorization'] = f'Bearer {token}'
        with urllib.request.urlopen(urllib.request.Request(site + path, headers=headers), timeout=60) as response:
            return json.loads(response.read())
    state = read('/api/ingest/state', True)
    feed = read('/api/reports?' + urllib.parse.urlencode({'date': batch['announcementDay']['date'], 'verify': time.time_ns()}))
    return state, feed


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("payload")
    parser.add_argument(
        "--endpoint",
        choices=("report", "report-v2", "volume-history"),
        default="report-v2",
    )
    parser.add_argument("--site-file", default=".automation/site-url")
    parser.add_argument("--token-file", default=".automation/ingest-token")
    args = parser.parse_args()
    site = Path(args.site_file).read_text(encoding="utf-8").strip().rstrip("/")
    if site != 'https://geometry-arxiv-daily-jch.zychern672259.chatgpt.site':
        raise RuntimeError('Refusing to send credentials to an unapproved production origin')
    token = Path(args.token_file).read_text(encoding="utf-8").strip()
    body = Path(args.payload).read_bytes()
    paths = {
        "report": "/api/ingest/v1",
        "report-v2": "/api/ingest/v2",
        "volume-history": "/api/ingest/volume-history",
    }
    path = paths[args.endpoint]
    batch = json.loads(body)
    if args.endpoint == 'report-v2':
        state, feed = read_state_and_feed(site, token, batch)
        if batch_is_visible(batch, feed, state):
            checkpoint('ingest_verified', fingerprint(batch), {'runId': batch['run']['runId']})
            print(json.dumps({'status': 'already_verified', 'runId': batch['run']['runId']}))
            return
        if feed.get('lastUpdated') and datetime.fromisoformat(feed['lastUpdated'].replace('Z', '+00:00')) > datetime.fromisoformat(batch['run']['completedAt'].replace('Z', '+00:00')):
            raise RuntimeError('A newer report exists; refusing to replay an older batch')
    request = urllib.request.Request(f"{site}{path}", data=body, method="POST", headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json", "User-Agent": "GeometryArxivDaily/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            result = json.loads(response.read())
    except (urllib.error.URLError, TimeoutError, OSError):
        if args.endpoint != 'report-v2':
            raise RuntimeError('Write response uncertain; verify before retrying') from None
        state, feed = read_state_and_feed(site, token, batch)
        if not batch_is_visible(batch, feed, state):
            raise RuntimeError('Write not confirmed; retain the exact batch and verify before retrying') from None
        result = {'status': 'verified_after_uncertain_response', 'runId': batch['run']['runId']}
    if args.endpoint == 'report-v2':
        state, feed = read_state_and_feed(site, token, batch)
        if not batch_is_visible(batch, feed, state):
            raise RuntimeError('Write returned but publication verification failed; retain batch')
        checkpoint('ingest_verified', fingerprint(batch), {'runId': batch['run']['runId']})
    print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()
