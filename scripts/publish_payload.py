#!/usr/bin/env python3
"""Publish a validated report or volume-history JSON payload without logging secrets."""

from __future__ import annotations

import argparse
import json
import urllib.request
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("payload")
    parser.add_argument(
        "--endpoint",
        choices=("report", "report-v2", "volume-history"),
        default="report-v2",
    )
    parser.add_argument("--site-file", default=".automation/site-url")
    parser.add_argument("--token-file", default=".automation/ingest-token")
    args = parser.parse_args()
    site = Path(args.site_file).read_text(encoding="utf-8").strip().rstrip("/")
    token = Path(args.token_file).read_text(encoding="utf-8").strip()
    body = Path(args.payload).read_bytes()
    paths = {
        "report": "/api/ingest/v1",
        "report-v2": "/api/ingest/v2",
        "volume-history": "/api/ingest/volume-history",
    }
    path = paths[args.endpoint]
    request = urllib.request.Request(f"{site}{path}", data=body, method="POST", headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json", "User-Agent": "GeometryArxivDaily/1.0"})
    with urllib.request.urlopen(request, timeout=120) as response:
        result = json.loads(response.read())
    print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()
