#!/usr/bin/env python3
"""Checkpoint listing information before optional enrichment, including during cooldown."""
import argparse
import html
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from arxiv_client import atomic_json, Deferred, request
from arxiv_listing import parse_listing, listing_date, CATEGORIES
from arxiv_fetch import fetch_ids
from progressive_publish import digest

ROOT = Path(__file__).resolve().parents[1]


def text(value):
    return ' '.join(html.unescape(re.sub(r'<[^>]+>', ' ', value)).split())


def parse_category(document, category, url, observed_at):
    date = listing_date(document)
    if not date:
        raise ValueError('Official announcement date is not confirmed')
    complete = True
    try:
        events = parse_listing(document)
    except RuntimeError:
        complete = False
        # Salvage individually present entries without claiming a complete list.
        events = parse_listing(re.sub(r'showing\s+\d+\s+of\s+\d+\s+entries', 'partial entries', document, flags=re.I))
    ids = set(events.new_ids + events.cross_list_ids)
    if not ids and not re.search(r'(showing\s+0\s+of\s+0|No new submissions|No updates)', document, re.I):
        raise ValueError('Unrecognized or empty listing; not a zero announcement')
    source = {'url': url, 'observedAt': observed_at, 'contentHash': digest(document)}
    snapshot = {'date': date, 'category': category, 'complete': complete, 'newIds': list(events.new_ids), 'crossListIds': list(events.cross_list_ids), 'replacementIds': list(events.replacement_ids), 'source': source}
    entries = []
    for header, body in re.findall(r'<dt\b[^>]*>(.*?)</dt>\s*<dd\b[^>]*>(.*?)</dd>', document, re.S | re.I):
        match = re.search(r'/abs/([^"\s<>]+)', header)
        if not match:
            continue
        identifier = re.sub(r'v\d+$', '', match[1])
        if identifier not in ids:
            continue
        metadata = {}
        for field, css in [('title', 'list-title'), ('comment', 'list-comments'), ('categories', 'list-subjects')]:
            found = re.search(r'<div\s+class=["\']' + css + r'[^"\']*["\'][^>]*>(.*?)</div>', body, re.S | re.I)
            if found:
                value = text(found[1])
                if field == 'categories':
                    cats = re.findall(r'\(([a-z][a-z0-9-]*(?:\.[A-Z]{2})?)\)', value)
                    if cats:
                        metadata['categories'] = cats
                        metadata['primaryCategory'] = cats[0]
                else:
                    value = re.sub(r'^(Title|Comments):\s*', '', value)
                    if value:
                        metadata[field] = value
        authors = re.search(r'<div\s+class=["\']list-authors["\'][^>]*>(.*?)</div>', body, re.S | re.I)
        if authors:
            names = [text(v) for v in re.findall(r'<a\b[^>]*>(.*?)</a>', authors[1], re.S)]
            if names:
                metadata['authors'] = names
        abstract = re.search(r'<p\s+class=["\']mathjax["\'][^>]*>(.*?)</p>', body, re.S | re.I)
        if abstract and text(abstract[1]):
            metadata['abstract'] = text(abstract[1])
        version = re.search(r'/(?:html|abs)/' + re.escape(identifier) + r'v(\d+)(?=["\s<>])', header)
        if version:
            metadata['version'] = int(version[1])
        entries.append({'arxivId': identifier, 'metadata': metadata, 'source': source})
    return snapshot, entries


def candidate(run, snapshots, entries, day):
    groups = [s for s in snapshots if s['date'] == day]
    known = {i for g in groups for i in g['newIds'] + g['crossListIds']}
    return {'runId': run['runId'], 'scheduledFor': run['scheduledFor'], 'date': day, 'categories': groups, 'entries': [e for i, e in sorted(entries.items()) if i in known]}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--run-id', required=True)
    parser.add_argument('--scheduled-for', required=True)
    parser.add_argument('--out', required=True)
    parser.add_argument('--from-run', help='Reuse exact official listing cache from an earlier run; preserve source times')
    parser.add_argument('--analyses', help='JSON analyses keyed by ID, with --analysis-source basis')
    parser.add_argument('--analysis-source', help='Source JSON with papers, or ID-keyed listing-reading.json')
    parser.add_argument('--publish', action='store_true')
    parser.add_argument('--enrich', action='store_true')
    args = parser.parse_args()
    os.environ['ARXIV_RUN_ID'] = args.run_id
    os.environ['ARXIV_SCHEDULED_FOR'] = args.scheduled_for
    out = Path(args.out);out.mkdir(parents=True, exist_ok=True)
    run = {'runId': args.run_id, 'scheduledFor': args.scheduled_for}
    snapshots, entries, published = [], {}, []
    from zoneinfo import ZoneInfo
    started = datetime.now(ZoneInfo('Asia/Shanghai')).isoformat()
    initial = {'schemaVersion': 2, **run, 'scheduledDate': args.scheduled_for[:10], 'startedAt': started, 'status': 'running'}
    if args.publish:
        atomic_json(ROOT / '.automation/daily-outcomes' / (args.scheduled_for[:10] + '.json'), initial)
        atomic_json(ROOT / '.automation/daily-outcomes/history' / (args.run_id + '.json'), initial)
    def emit(day):
        data = candidate(run, snapshots, entries, day)
        path = out / ('candidate-' + day + '.json');atomic_json(path, data)
        if args.publish:
            subprocess.run([sys.executable, str(ROOT / 'scripts/progressive_publish.py'), str(path), '--out', str(out / ('publications-' + day))], check=True)
            published.append(day)
    try:
        for key, cat in CATEGORIES.items():
            url = 'https://arxiv.org/list/' + cat + '/new'
            if args.from_run:
                cache_key = __import__('hashlib').sha256((args.from_run + '\n' + url).encode()).hexdigest()
                cache_path = ROOT / '.automation/arxiv-cache' / (cache_key + '.json')
                if not cache_path.exists():
                    continue
                cached = json.loads(cache_path.read_text())
                document = bytes.fromhex(cached['body']).decode();observed = cached['fetchedAt']
            else:
                document = request(url).decode();observed = datetime.now(timezone.utc).isoformat()
            snapshot, found = parse_category(document, key, url, observed)
            snapshots.append(snapshot)
            for identifier in snapshot['newIds'] + snapshot['crossListIds']:
                entries.setdefault(identifier, {'arxivId': identifier, 'metadata': {}, 'source': snapshot['source']})
            for entry in found:
                entries[entry['arxivId']] = entry
            atomic_json(out / ('listing-' + key + '.json'), {'snapshot': snapshot, 'entries': found})
            emit(snapshot['date'])
            if args.publish and len(published) == 1:
                subprocess.run([sys.executable, str(ROOT / 'scripts/progressive_mirror.py')], check=False)
        if args.analyses:
            if not args.analysis_source:
                raise ValueError('--analysis-source is required; analyses cannot be reused without evidence')
            analyses = json.loads(Path(args.analyses).read_text())
            basis = json.loads(Path(args.analysis_source).read_text())
            if 'papers' in basis:
                basis = {p['arxivId']: p for p in basis['papers']}
            for identifier, analysis in analyses.items():
                if identifier not in entries or identifier not in basis:
                    continue
                entry = entries[identifier];old = basis[identifier]
                if ' '.join(old.get('abstract', '').split()) != ' '.join(entry['metadata'].get('abstract', '').split()):
                    continue
                if old.get('version') and entry['metadata'].get('version') and old['version'] != entry['metadata']['version']:
                    continue
                entry['analysis'] = analysis
                entry['analysisBasis'] = {'abstract': old['abstract'], 'version': old.get('version')}
            for day in sorted({s['date'] for s in snapshots}):
                emit(day)
        if args.enrich:
            papers = fetch_ids(sorted(entries))
            for paper in papers:
                entry = entries[paper['arxivId']]
                old = entry['metadata']
                if old.get('abstract') != paper['abstract'] or (old.get('version') and old['version'] != paper['version']):
                    entry.pop('analysis', None);entry.pop('analysisBasis', None)
                entry['metadata'] = {k: v for k, v in paper.items() if k in ['title', 'authors', 'abstract', 'categories', 'primaryCategory', 'comment', 'version', 'submittedAt', 'updatedAt']}
                entry['source'] = {'url': 'https://export.arxiv.org/api/query', 'observedAt': datetime.now(timezone.utc).isoformat(), 'contentHash': digest(paper)}
            for day in sorted({s['date'] for s in snapshots}):
                emit(day)
    except (Deferred, RuntimeError, ValueError, OSError, subprocess.CalledProcessError) as error:
        atomic_json(out / 'pending.json', {**run, 'reason': str(error), 'publishedDays': sorted(set(published)), 'cursorMayAdvance': False})
        if not published or isinstance(error, subprocess.CalledProcessError):
            if args.publish:
                failed = {**initial, 'status': 'failed', 'completedAt': datetime.now(timezone.utc).isoformat(), 'errorSummary': str(error)}
                atomic_json(ROOT / '.automation/daily-outcomes' / (args.scheduled_for[:10] + '.json'), failed)
                atomic_json(ROOT / '.automation/daily-outcomes/history' / (args.run_id + '.json'), failed)
            raise
    finally:
        atomic_json(out / 'progress.json', {**run, 'publishedDays': sorted(set(published)), 'knownIds': sorted(entries), 'cursorMayAdvance': False, 'revisionsPending': sorted({i for s in snapshots for i in s['replacementIds']})})
    if args.publish:
        mirror = subprocess.run([sys.executable, str(ROOT / 'scripts/progressive_mirror.py')], check=False)
        outcome = subprocess.run([sys.executable, str(ROOT / 'scripts/progressive_outcome.py'), '--run', str(out)], check=False)
        if mirror.returncode or outcome.returncode:
            raise RuntimeError('Publication or mirror verification incomplete; pending work retained')
    print(json.dumps({'runId': args.run_id, 'knownCount': len(entries), 'publishedDays': sorted(set(published))}))


if __name__ == '__main__':
    main()
