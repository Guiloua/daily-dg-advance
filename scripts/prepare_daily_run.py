#!/usr/bin/env python3
"""Prepare one resumable slot. Agents supply analysis, not ad-hoc HTTP clients."""
import argparse
import json
import os
from pathlib import Path
from arxiv_client import atomic_json, Deferred
from arxiv_listing import build_manifest, _download, listing_date
from arxiv_fetch import fetch_ids
from run_progress import checkpoint, cached_analyses, fingerprint


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--date', help='Optional expected announcement date; defaults to official latest, including holidays')
    parser.add_argument('--run-id', required=True)
    parser.add_argument('--scheduled-for', required=True)
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    os.environ['ARXIV_RUN_ID'] = args.run_id
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    latest = listing_date(_download('https://arxiv.org/list/math.DG/new'))
    if not latest or (args.date and args.date != latest):
        raise RuntimeError('Expected announcement date is not yet confirmed; retain old report')
    manifest = build_manifest(latest, current=True)
    manifest['runId'] = args.run_id
    manifest['scheduledFor'] = args.scheduled_for
    atomic_json(out / 'manifest.json', manifest)
    checkpoint('manifest_confirmed', args.run_id, manifest)
    papers = fetch_ids(manifest['expectedIds'])
    source = {**manifest, 'papers': papers}
    atomic_json(out / 'source.json', source)
    checkpoint('metadata_complete', fingerprint(manifest['sourceManifest']), {'sourcePath': str((out / 'source.json').resolve())})
    # Kept separate: never overwrite analyses already authored in this run.
    atomic_json(out / 'reusable-analyses.json', cached_analyses(papers))
    if manifest['replacementIds']:
        try:
            atomic_json(out / 'revision-metadata.json', {'papers': fetch_ids(manifest['replacementIds'])})
        except Deferred:
            atomic_json(out / 'revisions-pending.json', {'ids': manifest['replacementIds'], 'cursorMayAdvance': False})
    print(json.dumps({'runId': args.run_id, 'announcementDate': latest,
                      'expectedCount': manifest['expectedCount'], 'reusableAnalyses': len(cached_analyses(papers))}))


if __name__ == '__main__':
    main()
