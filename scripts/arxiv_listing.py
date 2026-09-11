#!/usr/bin/env python3
"""Read official arXiv new/catchup pages and build a category event manifest."""

from __future__ import annotations

import argparse
import html
import json
import re
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo
from arxiv_client import request


CATEGORIES = {
    "mathDg": "math.DG",
    "mathMg": "math.MG",
    "mathGt": "math.GT",
}
USER_AGENT = "GeometryArxivDaily/2.0 (research briefing; contact via deployed site)"
SECTION_RE = re.compile(
    r"<h3[^>]*>(?P<title>.*?)</h3>(?P<body>.*?)(?=<h3[^>]*>|$)",
    re.IGNORECASE | re.DOTALL,
)
ID_RE = re.compile(r'href\s*=\s*["\']/abs/([^"\'?#]+)', re.IGNORECASE)
TAG_RE = re.compile(r"<[^>]+>")


@dataclass(frozen=True)
class ListingEvents:
    new_ids: tuple[str, ...]
    cross_list_ids: tuple[str, ...]
    replacement_ids: tuple[str, ...]

    @property
    def publication_count(self) -> int:
        return len(self.new_ids) + len(self.cross_list_ids)


def _unique(values: list[str]) -> tuple[str, ...]:
    return tuple(dict.fromkeys(values))


def _base_id(value: str) -> str:
    return re.sub(r"v\d+$", "", value.strip())


def parse_listing(document: str) -> ListingEvents:
    groups: dict[str, list[str]] = {
        "new": [],
        "cross": [],
        "replacement": [],
    }
    for match in SECTION_RE.finditer(document):
        title = html.unescape(TAG_RE.sub(" ", match.group("title")))
        normalized = " ".join(title.split()).lower()
        if normalized.startswith("new submissions"):
            key = "new"
        elif normalized.startswith(("cross submissions", "cross-lists")):
            key = "cross"
        elif normalized.startswith(("replacements", "replacement submissions")):
            key = "replacement"
        else:
            continue
        ids = _unique([_base_id(value) for value in ID_RE.findall(match.group('body'))])
        counts = re.search(r'showing\s+(\d+)\s+of\s+(\d+)\s+entries', normalized)
        if counts and (int(counts[1]) != int(counts[2]) or len(ids) != int(counts[2])):
            raise RuntimeError('Incomplete arXiv listing; refusing truncated page')
        groups[key].extend(ids)
    return ListingEvents(
        new_ids=_unique(groups["new"]),
        cross_list_ids=_unique(groups["cross"]),
        replacement_ids=_unique(groups["replacement"]),
    )


def listing_date(document: str) -> str | None:
    match = re.search(
        r"Showing new listings for\s+(?:<[^>]+>)*([^<\n]+)",
        document,
        re.IGNORECASE,
    )
    if not match:
        return None
    label = html.unescape(match.group(1)).strip()
    try:
        return datetime.strptime(label, "%A, %d %B %Y").date().isoformat()
    except ValueError:
        return None


def _download(url: str) -> str:
    return request(url).decode('utf-8', errors='strict')


def fetch_listing(category: str, announcement_date: str, *, current: bool | None = None) -> tuple[ListingEvents, str]:
    today = datetime.now(ZoneInfo('Asia/Shanghai')).date().isoformat()
    current = announcement_date == today if current is None else current
    url = (f'https://arxiv.org/list/{category}/new' if current
           else f'https://arxiv.org/catchup/{category}/{announcement_date}')
    document = _download(url)
    parsed_date = listing_date(document)
    if (current and parsed_date != announcement_date) or (parsed_date and parsed_date != announcement_date):
        raise RuntimeError(f'Unconfirmed announcement date for {category}; keep prior report')
    if not re.search(r'(New submissions|Cross submissions|Cross-lists|Replacement submissions|Replacements|No new submissions|No updates)', document, re.I):
        raise RuntimeError(f'Unrecognized listing for {category}; not a zero-publication day')
    events = parse_listing(document)
    if not events.publication_count and not events.replacement_ids and not re.search(r'(showing\s+0\s+of\s+0|No new submissions|No updates)', document, re.I):
        raise RuntimeError(f'Empty or truncated listing for {category}; zero not confirmed')
    return events, url


def build_manifest(announcement_date: str, *, current: bool | None = None) -> dict:
    source_manifest: dict[str, dict[str, list[str]]] = {}
    sources: list[str] = []
    replacements: set[str] = set()
    daily_volume = {"announcementDate": announcement_date}
    category_items = list(CATEGORIES.items())
    for position, (key, category) in enumerate(category_items):
        events, source = fetch_listing(category, announcement_date, current=current)
        replacements.update(events.replacement_ids)
        source_manifest[key] = {
            "newIds": list(events.new_ids),
            "crossListIds": list(events.cross_list_ids),
        }
        daily_volume[key] = events.publication_count
        sources.append(source)
        if position < len(category_items) - 1:
            time.sleep(3)
    expected_ids = {
        arxiv_id
        for category in source_manifest.values()
        for field in ("newIds", "crossListIds")
        for arxiv_id in category[field]
    }
    return {
        "announcementDate": announcement_date,
        "source": ", ".join(sources),
        "sourceManifest": source_manifest,
        "dailyVolume": daily_volume,
        "expectedIds": sorted(expected_ids),
        "expectedCount": len(expected_ids),
        "replacementIds": sorted(replacements),
        "verifiedAt": datetime.now(ZoneInfo('Asia/Shanghai')).isoformat(),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", required=True, dest="announcement_date")
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    payload = build_manifest(args.announcement_date)
    Path(args.out).write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(
        f"Built manifest for {args.announcement_date}: "
        f"DG={payload['dailyVolume']['mathDg']} "
        f"MG={payload['dailyVolume']['mathMg']} "
        f"GT={payload['dailyVolume']['mathGt']} "
        f"unique={payload['expectedCount']}"
    )


if __name__ == "__main__":
    main()
