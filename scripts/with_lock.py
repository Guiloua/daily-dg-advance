"""Process-owned lock released even on interruption; no stale mkdir lock."""
import fcntl
import subprocess
import sys
from pathlib import Path

if __name__ == '__main__':
    path = Path(sys.argv[1])
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('a') as handle:
        try:
            fcntl.flock(handle, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            raise SystemExit('An update is already running; do not start a second writer')
        raise SystemExit(subprocess.call(sys.argv[2:]))
