#!/usr/bin/env python3
"""Resume publishing an exact content SHA, including unchanged-content retries."""
import argparse
import json
import re
import subprocess
import time
from datetime import datetime, timezone
from arxiv_client import atomic_json
from run_progress import ROOT, checkpoint

REPO = 'Guiloua/daily-dg-advance'


def gh(*args):
    result = subprocess.run(['gh', *args], capture_output=True, text=True, check=False)
    if result.returncode:
        raise RuntimeError('GitHub request failed; pending mirror state retained')
    return json.loads(result.stdout) if result.stdout.strip() else {}


def matching_run(runs, sha, source_sha=None):
    return next((run for run in runs if run.get('display_title') == f'Geometry Pages {sha}'
                 and (source_sha is None or run.get('head_sha') == source_sha)), None)


def ensure(sha, *, api=gh, clock=time.monotonic, sleep=time.sleep, source_sha=None):
    if not re.fullmatch('[0-9a-f]{40}', sha):
        raise ValueError('A full content SHA is required')
    path = ROOT / 'pages-outbox.json'
    pending = {'contentSha': sha, 'status': 'pending', 'updatedAt': datetime.now(timezone.utc).isoformat()}
    atomic_json(path, pending)
    deadline = clock() + 1200
    dispatched = False
    while clock() < deadline:
        runs = api('api', f'repos/{REPO}/actions/workflows/pages.yml/runs?per_page=100')['workflow_runs']
        run = matching_run(runs, sha, source_sha)
        if run and run['status'] == 'completed' and run['conclusion'] == 'success':
            pending.update(status='verified', workflowRunId=run['id'])
            atomic_json(path, pending)
            checkpoint('pages_verified', sha, pending)
            print(json.dumps(pending))
            return
        if run and run['status'] == 'completed' and dispatched:
            raise RuntimeError('Pages deployment failed; same content SHA remains pending')
        if not dispatched and (not run or run['status'] == 'completed'):
            api('api', '--method', 'POST', f'repos/{REPO}/dispatches',
                '-f', 'event_type=static-content-updated', '-f', f'client_payload[content_sha]={sha}')
            dispatched = True
            # Failed old runs remain visible until the new dispatch is indexed.
            previous_id = run['id'] if run else None
            pending.update(status='dispatched', previousRunId=previous_id)
            atomic_json(path, pending)
            sleep(15)
            while clock() < deadline:
                fresh = api('api', f'repos/{REPO}/actions/workflows/pages.yml/runs?per_page=100')['workflow_runs']
                fresh_run = matching_run(fresh, sha, source_sha)
                if fresh_run and fresh_run['id'] != previous_id:
                    break
                sleep(15)
        sleep(15)
    raise RuntimeError('Pages verification timed out; keep prior online version and resume same SHA')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--sha', required=True)
    args = parser.parse_args()
    source_sha = gh('api', f'repos/{REPO}/commits/main')['sha']
    ensure(args.sha, source_sha=source_sha)
