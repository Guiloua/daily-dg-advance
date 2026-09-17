"""Fill missing Atom fields without repeating completed research or requests.

Only version- and text-bound successful metadata is cached. Failed responses
never enter this cache; the shared arxiv_client still owns transport/cooldown.
"""
import copy
import fcntl
import hashlib
import json
import time
from datetime import datetime, timezone
from pathlib import Path
from arxiv_client import atomic_json, Deferred

FIELDS = ('title', 'authors', 'abstract', 'categories', 'primaryCategory',
          'version', 'submittedAt', 'updatedAt')


def missing_fields(entry):
    return [key for key in FIELDS if not entry['metadata'].get(key)]


def binding(metadata):
    if not metadata.get('version'):
        return None
    values = [metadata.get(k, '') for k in ('version', 'title', 'abstract', 'comment')]
    return hashlib.sha256(json.dumps(values, ensure_ascii=False).encode()).hexdigest()


def compatible(current, previous):
    return binding(current) is not None and binding(current) == binding(previous)


def reuse_entry(current, previous):
    """Reuse only the same checked version/text; keep fresh listing provenance."""
    result = copy.deepcopy(current)
    if not previous or not compatible(result['metadata'], previous['metadata']):
        return result
    for key, value in previous['metadata'].items():
        if not result['metadata'].get(key):
            result['metadata'][key] = copy.deepcopy(value)
    if previous.get('analysis') and previous.get('analysisBasis'):
        result['analysis'] = copy.deepcopy(previous['analysis'])
        result['analysisBasis'] = copy.deepcopy(previous['analysisBasis'])
    return result


def enrich_missing(entries, cache_dir, fetcher, on_batch=None, batch_size=20):
    """Mutate only absent fields and checkpoint each successful batch/row.

    Atom has no field projection: ask only for IDs still missing fields, then
    discard already-known fields locally. Never replace analyzed text or AI
    evidence because Atom uses slightly different whitespace/TeX formatting.
    """
    cache_dir = Path(cache_dir)
    cache_dir.mkdir(parents=True, exist_ok=True)
    if not 1 <= batch_size <= 100:
        raise ValueError('Metadata batch size must be between 1 and 100')
    # Recheck the per-paper cache after the other process finishes, not before.
    with (cache_dir / 'enrich.lock').open('a') as lock:
        started = time.monotonic()
        while True:
            try:
                fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
                break
            except BlockingIOError:
                if time.monotonic() - started >= 1200:
                    raise Deferred('Metadata recovery is busy; saved work retained')
                time.sleep(1)
        return _enrich_locked(entries, cache_dir, fetcher, on_batch, batch_size)


def _enrich_locked(entries, cache_dir, fetcher, on_batch, batch_size):

    def path(entry):
        key = binding(entry['metadata'])
        if not key:
            return None
        name = hashlib.sha256((entry['arxivId'] + ':' + key).encode()).hexdigest()
        return cache_dir / (name + '.json')

    def fill(entry, metadata, source=None):
        old = entry['metadata']
        if old.get('version') and old['version'] != metadata.get('version'):
            raise ValueError('Atom version mismatch; reviewed work retained: ' + entry['arxivId'])
        changed = False
        for key in FIELDS:
            if not old.get(key) and metadata.get(key):
                old[key] = copy.deepcopy(metadata[key])
                changed = True
        if changed and source:
            entry['source'] = copy.deepcopy(source)

    for entry in entries.values():
        cached_path = path(entry)
        if cached_path and cached_path.exists():
            cached = json.loads(cached_path.read_text())
            if cached.get('arxivId') == entry['arxivId'] and cached.get('binding') == binding(entry['metadata']):
                fill(entry, cached['metadata'], cached.get('source'))
        if cached_path and not missing_fields(entry):
            atomic_json(cached_path, {'arxivId': entry['arxivId'], 'binding': binding(entry['metadata']), 'metadata': entry['metadata'], 'source': entry.get('source')})
    if on_batch:
        on_batch()
    pending = sorted(key for key, entry in entries.items() if missing_fields(entry))
    for offset in range(0, len(pending), batch_size):
        ids = pending[offset:offset + batch_size]
        versions = {key: entries[key]['metadata']['version'] for key in ids if entries[key]['metadata'].get('version')}
        rows = fetcher(ids, expected_versions=versions)
        if len({row['arxivId'] for row in rows}) != len(rows) or any(row['arxivId'] not in ids for row in rows):
            raise ValueError('Unexpected or duplicate Atom IDs')
        for row in rows:
            entry = entries[row['arxivId']]
            source = {'url': 'https://export.arxiv.org/api/query', 'observedAt': datetime.now(timezone.utc).isoformat(), 'contentHash': hashlib.sha256(json.dumps(row, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()}
            fill(entry, row, source)
            cached_path = path(entry)
            if cached_path and not missing_fields(entry):
                atomic_json(cached_path, {'arxivId': entry['arxivId'], 'binding': binding(entry['metadata']), 'metadata': entry['metadata'], 'source': entry['source']})
        if on_batch:
            on_batch()
        if any(missing_fields(entries[key]) for key in ids):
            raise RuntimeError('Atom omitted required metadata; completed rows retained')
    return entries
