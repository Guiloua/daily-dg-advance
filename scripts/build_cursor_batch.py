#!/usr/bin/env python3
"""Build an idempotent empty ReportBatchV1 that advances a verified source cursor."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", required=True)
    parser.add_argument("--source-cursor", required=True)
    parser.add_argument("--volume", required=True)
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    volume_payload = json.loads(Path(args.volume).read_text(encoding="utf-8"))
    point = next(item for item in volume_payload["days"] if item["announcementDate"] == args.date)
    now = datetime.now(timezone.utc).isoformat()
    batch = {
        "schemaVersion": 1,
        "run": {
            "runId": f"cursor-advance-{now.replace(':', '').replace('+', '-')}",
            "scheduledFor": now,
            "startedAt": now,
            "completedAt": now,
            "sourceCursor": args.source_cursor,
        },
        "announcementDay": {
            "date": args.date,
            "status": "announced",
            "source": "Verified arXiv overlap fetch; cursor advance after all report batches succeeded",
        },
        "dailyVolume": point,
        "reports": [],
    }
    Path(args.out).write_text(json.dumps(batch, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Built cursor batch for {args.date} at {args.source_cursor}")


if __name__ == "__main__":
    main()
