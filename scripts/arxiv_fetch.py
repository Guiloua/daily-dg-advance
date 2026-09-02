#!/usr/bin/env python3
"""Fetch arXiv metadata politely for the Geometry arXiv Daily automation."""

from __future__ import annotations

import argparse
import json
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from pathlib import Path

API = "https://export.arxiv.org/api/query"
ATOM = {"a": "http://www.w3.org/2005/Atom", "x": "http://arxiv.org/schemas/atom"}
CATEGORIES = ("math.DG", "math.MG", "math.GT")
USER_AGENT = "GeometryArxivDaily/1.0 (research briefing; contact via deployed site)"


def request(url: str) -> bytes:
    error: Exception | None = None
    for attempt in range(3):
        if attempt:
            time.sleep(3 * attempt)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=60) as response:
                return response.read()
        except Exception as exc:
            error = exc
    raise RuntimeError(f"arXiv request failed after three attempts: {error}")


def clean(value: str | None) -> str:
    return " ".join((value or "").split())


def fetch(since: datetime, until: datetime, page_size: int = 200) -> list[dict]:
    query = " OR ".join(f"cat:{category}" for category in CATEGORIES)
    date_range = f"submittedDate:[{since:%Y%m%d%H%M} TO {until:%Y%m%d%H%M}]"
    search = f"({query}) AND {date_range}"
    output: dict[tuple[str, int], dict] = {}
    start = 0
    while True:
        params = urllib.parse.urlencode({"search_query": search, "start": start, "max_results": page_size, "sortBy": "submittedDate", "sortOrder": "ascending"})
        root = ET.fromstring(request(f"{API}?{params}"))
        entries = root.findall("a:entry", ATOM)
        for entry in entries:
            raw_id = clean(entry.findtext("a:id", namespaces=ATOM)).rsplit("/", 1)[-1]
            base, version_text = raw_id.rsplit("v", 1)
            version = int(version_text)
            categories = [node.attrib["term"] for node in entry.findall("a:category", ATOM)]
            output[(base, version)] = {
                "arxivId": base,
                "version": version,
                "title": clean(entry.findtext("a:title", namespaces=ATOM)),
                "authors": [clean(node.findtext("a:name", namespaces=ATOM)) for node in entry.findall("a:author", ATOM)],
                "abstract": clean(entry.findtext("a:summary", namespaces=ATOM)),
                "categories": categories,
                "primaryCategory": entry.find("x:primary_category", ATOM).attrib["term"],
                "submittedAt": clean(entry.findtext("a:published", namespaces=ATOM)),
                "updatedAt": clean(entry.findtext("a:updated", namespaces=ATOM)),
                "arxivUrl": f"https://arxiv.org/abs/{base}",
                "pdfUrl": f"https://arxiv.org/pdf/{base}",
                "comment": clean(entry.findtext("x:comment", namespaces=ATOM)),
            }
        total = int(root.findtext("opensearch:totalResults", default="0", namespaces={"opensearch": "http://a9.com/-/spec/opensearch/1.1/"}))
        start += len(entries)
        if not entries or start >= total:
            break
        time.sleep(3)
    return list(output.values())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--since", help="ISO datetime; defaults to 72 hours ago")
    parser.add_argument("--until", help="ISO datetime; defaults to now")
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    now = datetime.now(timezone.utc)
    since = datetime.fromisoformat(args.since.replace("Z", "+00:00")) if args.since else now - timedelta(hours=72)
    until = datetime.fromisoformat(args.until.replace("Z", "+00:00")) if args.until else now
    payload = {"fetchedAt": now.isoformat(), "window": {"since": since.isoformat(), "until": until.isoformat()}, "papers": fetch(since, until)}
    Path(args.out).write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Fetched {len(payload['papers'])} unique arXiv versions into {args.out}")


if __name__ == "__main__":
    main()
