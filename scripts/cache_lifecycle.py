"""Coordinate source readers with post-publication cache reclamation."""
import fcntl
import os
from contextlib import contextmanager
from pathlib import Path


def cache_root():
    return Path(os.environ.get('ARXIV_CACHE_DIR', str(
        Path(__file__).resolve().parents[1] / '.automation/arxiv-cache')))


@contextmanager
def source_lock(root=None, *, exclusive=False):
    root = Path(root) if root is not None else cache_root()
    root.parent.mkdir(parents=True, exist_ok=True)
    with (root.parent / 'cache-sources.lock').open('a') as handle:
        fcntl.flock(handle, fcntl.LOCK_EX if exclusive else fcntl.LOCK_SH)
        yield
