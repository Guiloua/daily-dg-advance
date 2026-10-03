#!/usr/bin/env python3
"""Reclaim reviewed sources only from exact, acknowledged two-site snapshots."""
import argparse
import copy
import fcntl
import hashlib
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path

from arxiv_client import atomic_json
from cache_lifecycle import source_lock
from progressive_publish import digest
from review_evidence import HASH, IDENTIFIER, pdf_identity, review_key, valid_review

ROOT = Path(__file__).resolve().parents[1]


class CleanupRejected(ValueError):
    """A fixed, non-sensitive explanation for a failed reclamation guard."""


def error_reason(error):
    if isinstance(error, CleanupRejected):
        return str(error)
    if isinstance(error, json.JSONDecodeError):
        return 'Invalid JSON evidence'
    if isinstance(error, OSError):
        return error.strerror or type(error).__name__
    return type(error).__name__


def safe_path(path, root, *, file=True):
    """Confine both evidence reads and deletions to non-symlink automation paths."""
    base = Path(root).resolve() / '.automation'
    path = Path(path)
    path = Path(os.path.abspath(path if path.is_absolute() else Path(root) / path))
    resolved = path.resolve()
    if resolved == base or base not in resolved.parents:
        return None
    for parent in (path, *path.parents):
        if parent.is_symlink():
            return None
        if parent.resolve() == base:
            break
    path = resolved
    if file is None:
        return path
    return path if (path.is_file() if file else path.is_dir()) else None


def read_json(path, root):
    checked = safe_path(path, root)
    if checked is None:
        raise CleanupRejected('Missing or unsafe automation evidence')
    return json.loads(checked.read_text())


def complete_feed(feed, day, item):
    if (feed.get('schemaVersion') != 2 or feed.get('date') != day
            or item.get('status') != 'verified'
            or type(feed.get('revision')) is not int
            or feed['revision'] != item.get('revision')
            or not HASH.fullmatch(feed.get('contentHash', ''))
            or item.get('contentHash') != feed['contentHash']
            or digest({**feed, 'contentHash': ''}) != feed['contentHash']):
        return False
    entries = feed.get('entries', [])
    categories = feed.get('categories', [])
    confirmed = {identifier for category in categories for identifier in
                 category.get('newIds', []) + category.get('crossListIds', [])}
    count = len(entries)
    coverage = feed.get('coverage', {})
    if (coverage.get('complete') is not True or coverage.get('listingsComplete') is not True
            or feed.get('listingConflicts')
            or not all(any(c.get('category') == key and c.get('complete') is True for c in categories)
                       for key in ('mathDg', 'mathMg', 'mathGt'))
            or len(confirmed) != count or {e['arxivId'] for e in entries} != confirmed
            or any(type(coverage.get(key)) is not int or coverage[key] != count for key in
                   ('expectedCount', 'confirmedCount', 'publishedCount', 'metadataCount', 'analyzedCount'))):
        return False
    for entry in entries:
        metadata = entry.get('metadata', {})
        analysis = entry.get('analysis') or {}
        if (not all(metadata.get(key) for key in ('title', 'authors', 'abstract', 'categories',
                                                  'primaryCategory', 'version', 'submittedAt', 'updatedAt'))
                or analysis.get('aiStatus') not in ('explicit', 'no_disclosure_observed')
                or (analysis.get('aiStatus') == 'explicit' and not all(
                    analysis.get(key) for key in ('aiEvidence', 'aiEvidenceSource')))
                or not valid_review(entry, analysis.get('aiReview'))):
            return False
    return True


def protected_references(root, feeds):
    """Use current pointers, not superseded failed-run files, to protect recovery."""
    protected = set()
    protected_days = set()

    def protect_feed(feed):
        for entry in feed.get('entries', []):
            protected.add((entry['arxivId'], entry.get('metadata', {}).get('version')))

    def protect_ids(value):
        if isinstance(value, str) and IDENTIFIER.fullmatch(value):
            protected.add((value, None))
        elif isinstance(value, list):
            for child in value:
                protect_ids(child)
        elif isinstance(value, dict):
            for child in value.values():
                protect_ids(child)

    for path in sorted((root / '.automation/daily-outcomes').glob('*.json')):
        receipt = read_json(path, root)
        if receipt.get('status') in ('success', 'no_new'):
            continue
        protected_days.update(receipt.get('publishedDays', []))
        protected_days.add(receipt.get('announcementDate') or receipt.get('scheduledDate'))
        protect_ids(receipt.get('pending', {}))
        directory = receipt.get('runDirectory')
        if directory:
            directory = safe_path(directory, root, file=False)
            if directory is None:
                raise CleanupRejected('Active recovery directory is missing or unsafe')
        if directory:
            for candidate in directory.glob('candidate-*.json'):
                protect_feed(read_json(candidate, root))
    for path in sorted((root / '.automation/progress').glob('*pending*.json')):
        pending = read_json(path, root)
        if pending.get('status') in ('success', 'resolved', 'completed'):
            continue
        protect_ids(pending.get('remaining', []))
        if pending.get('resumeFeed'):
            protect_feed(read_json(pending['resumeFeed'], root))
    for day, (feed, eligible) in feeds.items():
        if not eligible or day in protected_days:
            protect_feed(feed)
    return protected, protected_days


def is_protected(entry, protected):
    return ((entry['arxivId'], None) in protected
            or (entry['arxivId'], entry['metadata']['version']) in protected)


def source_files(root):
    automation = root / '.automation'
    for directory, dirs, files in os.walk(automation, followlinks=False):
        dirs[:] = [name for name in dirs if name not in
                   ('arxiv-cache', 'progress', 'daily-outcomes', 'release-health-outcomes', 'cache-cleanup')
                   and not (Path(directory) / name).is_symlink()]
        for name in files:
            if re.fullmatch(r'(?:[a-z-]+--\d{7}|\d{4}\.\d{4,5})(?:v[1-9]\d*)?\.json', name):
                path = safe_path(Path(directory) / name, root)
                if path:
                    yield path


def fingerprint(path):
    h = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def collect(root):
    state_path = root / '.automation/progress/mirror-outbox.json'
    state = read_json(state_path, root) if state_path.exists() else {'days': {}}
    feeds = {}
    for day, item in state['days'].items():
        feed = read_json(item['snapshotPath'], root)
        feeds[day] = (feed, complete_feed(feed, day, item))
    protected, protected_days = protected_references(root, feeds)
    entries = {}
    eligible_days = []
    skipped_days = []
    for day, (feed, eligible) in sorted(feeds.items()):
        if not eligible or day in protected_days:
            skipped_days.append(day)
            continue
        eligible_days.append(day)
        for entry in feed['entries']:
            if not is_protected(entry, protected):
                entries[(entry['arxivId'], entry['metadata']['version'],
                         entry['analysis']['aiReview']['contentHash'])] = entry
    candidates = {}

    def add(path):
        checked = safe_path(path, root)
        if checked:
            stat = checked.stat()
            candidates[checked] = (stat.st_dev, stat.st_ino, stat.st_size, stat.st_mtime_ns, stat.st_blocks * 512)

    for path in source_files(root):
        record = read_json(path, root)
        entry = entries.get((record.get('arxivId'), record.get('version'), record.get('contentHash')))
        if not entry:
            continue
        review = entry['analysis']['aiReview']
        if any(record.get(key) != review.get(key) for key in ('metadataHash', 'ruleVersion', 'sourceUrl')):
            continue
        slug = record['arxivId'].replace('/', '--')
        if path.stem not in (slug, slug + 'v' + str(record['version'])):
            continue
        pdf = safe_path(path.with_suffix('.pdf'), root)
        if pdf and fingerprint(pdf) != review['contentHash']:
            continue
        # A symlink or an unsafe PDF blocks its paired text too.
        if path.with_suffix('.pdf').is_symlink() or (path.with_suffix('.pdf').exists() and pdf is None):
            continue
        add(path.with_suffix('.pdf'))
        add(path.with_suffix('.txt'))
    for path in sorted((root / '.automation/arxiv-cache').glob('*.json')):
        if not HASH.fullmatch(path.stem) or not safe_path(path, root):
            continue
        cached = read_json(path, root)
        identity = pdf_identity(cached.get('url', ''))
        if not identity:
            continue
        matches = [entry for (identifier, version, content_hash), entry in entries.items()
                   if identifier == identity[0] and (identity[1] is None or identity[1] == version)
                   and content_hash == cached.get('sha256')]
        if matches and hashlib.sha256(bytes.fromhex(cached['body'])).hexdigest() == cached['sha256']:
            add(path)
    return entries, candidates, eligible_days, skipped_days


def retain_reviews(root, entries):
    path = root / '.automation/progress/retained-ai-reviews.json'
    if not safe_path(path, root, file=None):
        raise CleanupRejected('Unsafe retained-review path')
    retained = read_json(path, root) if path.exists() else {}
    previous = copy.deepcopy(retained)
    for entry in entries.values():
        review = entry['analysis']['aiReview']
        retained[review_key(entry)] = {
            **review, 'arxivId': entry['arxivId'], 'extractionComplete': True,
            'pageCountMatches': True, 'matches': [], 'metadataMatches': [],
            'retainedAnalysis': {key: copy.deepcopy(entry['analysis'][key]) for key in
                                 ('aiStatus', 'aiEvidence', 'aiEvidenceSource', 'aiUsage', 'aiReview')
                                 if key in entry['analysis']},
        }
    if retained != previous:
        atomic_json(path, retained)


def cleanup(root=ROOT, *, dry_run=False):
    root = Path(root).resolve()
    automation = root / '.automation'
    report = {'status': 'ok', 'dryRun': dry_run, 'deletedFiles': 0, 'freedBytes': 0,
              'eligibleDays': [], 'skippedDays': [], 'errors': [], 'files': []}
    try:
        if automation.is_symlink():
            raise CleanupRejected('Unsafe automation root')
        automation.mkdir(exist_ok=True)
        cache = automation / 'arxiv-cache'
        if cache.is_symlink():
            raise CleanupRejected('Unsafe transport cache root')
        configured = os.environ.get('ARXIV_CACHE_DIR')
        if configured and Path(configured).resolve() != cache:
            raise CleanupRejected('Cleanup must share the configured project transport cache')
        cache.mkdir(exist_ok=True)
        for path in (automation / 'daily-write.flock', automation / 'cache-sources.lock', cache / 'transport.lock'):
            if not safe_path(path, root, file=None):
                raise CleanupRejected('Unsafe cache lock')
        # Publication -> source lifecycle -> transport; source readers never
        # acquire the publication lock, and transport readers hold only transport.
        with (automation / 'daily-write.flock').open('a') as publication:
            fcntl.flock(publication, fcntl.LOCK_EX)
            with source_lock(cache, exclusive=True), (cache / 'transport.lock').open('a') as transport:
                fcntl.flock(transport, fcntl.LOCK_EX)
                entries, candidates, days, skipped = collect(root)
                report.update(eligibleDays=days, skippedDays=skipped,
                              files=[str(p.relative_to(root)) for p in sorted(candidates)],
                              candidateFiles=len(candidates), candidateBytes=sum(s[4] for s in candidates.values()))
                if not dry_run:
                    # Persist reusable hash-bound decisions before removing sources.
                    retain_reviews(root, entries)
                    for path, original in candidates.items():
                        try:
                            if not safe_path(path, root):
                                raise CleanupRejected('Source path changed')
                            stat = path.stat()
                            if (stat.st_dev, stat.st_ino, stat.st_size, stat.st_mtime_ns) != original[:4]:
                                raise CleanupRejected('Source changed')
                            path.unlink()
                            report['deletedFiles'] += 1
                            report['freedBytes'] += original[4]
                        except (OSError, ValueError) as error:
                            report['errors'].append({'file': str(path.relative_to(root)), 'error': type(error).__name__,
                                                     'reason': error_reason(error)})
    except (OSError, ValueError, KeyError, TypeError) as error:
        report['errors'].append({'error': type(error).__name__, 'reason': error_reason(error)})
    if report['errors']:
        report['status'] = 'failed'
    if not dry_run and not automation.is_symlink():
        try:
            log = automation / 'cache-cleanup/latest.json'
            if log.parent.is_symlink() or log.is_symlink():
                raise CleanupRejected('Unsafe cleanup log')
            atomic_json(log, {**report, 'completedAt': datetime.now(timezone.utc).isoformat()})
        except (OSError, ValueError):
            report['status'] = 'failed'
            report['errors'].append({'error': 'CleanupLogUnavailable'})
    return report


def after_verification(root=ROOT):
    """Cleanup errors are observable, but never turn a verified publication into failure."""
    try:
        report = cleanup(root)
        summary = {key: report[key] for key in ('status', 'deletedFiles', 'freedBytes', 'errors')}
    except Exception as error:
        summary = {'status': 'failed', 'deletedFiles': 0, 'freedBytes': 0,
                   'errors': [{'error': type(error).__name__}]}
    print(json.dumps({'cacheCleanup': summary}))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--run', type=Path, help='Require this run to have a successful, matching final receipt')
    parser.add_argument('--dry-run', action='store_true', help='List candidates without deleting or retaining review records')
    args = parser.parse_args()
    if args.run:
        progress = read_json(args.run / 'progress.json', ROOT)
        receipt = read_json(ROOT / '.automation/daily-outcomes/history' / (progress['runId'] + '.json'), ROOT)
        if (receipt.get('status') != 'success' or receipt.get('runId') != progress['runId']
                or receipt.get('scheduledFor') != progress['scheduledFor']
                or not all(receipt.get(k) is True for k in ('sitesVerified', 'pagesVerified', 'ingestVerified'))):
            parser.error('Run has no matching successful publication verification')
    report = cleanup(dry_run=args.dry_run)
    print(json.dumps(report, ensure_ascii=False))
    if report['status'] == 'failed':
        raise SystemExit(1)


if __name__ == '__main__':
    main()
