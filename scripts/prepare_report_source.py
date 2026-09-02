#!/usr/bin/env python3
"""Attach official-schedule announcement dates to fetched arXiv metadata."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from backfill_volume import announcement_date


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('input')
    parser.add_argument('--date', required=True)
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    payload = json.loads(Path(args.input).read_text(encoding='utf-8'))
    selected = []
    for paper in payload['papers']:
        if str(announcement_date(paper['submittedAt'])) == args.date:
            paper['announcementDate'] = args.date
            selected.append(paper)
    Path(args.out).write_text(json.dumps({'announcementDate': args.date, 'papers': selected}, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"Selected {len(selected)} papers for the {args.date} announcement")


if __name__ == '__main__':
    main()
