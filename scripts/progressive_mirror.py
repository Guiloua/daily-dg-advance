#!/usr/bin/env python3
"""Drain the latest acknowledged snapshot per day; preserve failures for retry."""
import fcntl
import json
import os
import subprocess
import urllib.request
from pathlib import Path
from arxiv_client import atomic_json
from progressive_publish import ROOT


def main():
    path = ROOT / '.automation/progress/mirror-outbox.json'
    if not path.exists():
        return
    with (ROOT / '.automation/daily-write.flock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        state = json.loads(path.read_text())
        pending = [(day, item) for day, item in state['days'].items() if item['status'] != 'verified']
        for day, item in sorted(pending, reverse=True):
            environment = {**os.environ, 'GEOMETRY_PROGRESSIVE': '1'}
            result = subprocess.run(['bash', str(ROOT / 'scripts/publish_static_mirror.sh'), 'https://geometry-arxiv-daily-jch.zychern672259.chatgpt.site', day, item['snapshotPath']], cwd=ROOT, env=environment, check=False)
            if result.returncode:
                item['status'] = 'failed';atomic_json(path, state)
                raise RuntimeError('Mirror deployment failed; website remains published')
            url = 'https://guiloua.github.io/daily-dg-advance/data/daily/' + day + '.json?revision=' + str(item['revision'])
            with urllib.request.urlopen(urllib.request.Request(url, headers={'Cache-Control': 'no-cache'}), timeout=60) as response:
                actual = json.load(response)
            expected = json.loads(Path(item['snapshotPath']).read_text())
            if actual != expected:
                item['status'] = 'failed';atomic_json(path, state)
                raise RuntimeError('Mirror content differs from acknowledged website snapshot')
            item['status'] = 'verified';atomic_json(path, state)
            print(json.dumps({'date': day, 'revision': item['revision'], 'mirror': 'verified'}))


if __name__ == '__main__':
    main()
