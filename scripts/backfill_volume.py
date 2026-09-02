#!/usr/bin/env python3
"""Build a rolling 24-month v1 volume history from the official arXiv API."""

from __future__ import annotations

import argparse
import json
import time
from collections import defaultdict
from datetime import date, datetime, time as clock, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

from arxiv_fetch import CATEGORIES, fetch
from arxiv_listing import build_manifest

EASTERN = ZoneInfo("America/New_York")
SHANGHAI = ZoneInfo("Asia/Shanghai")
HOLIDAYS = {
    date(2024, 9, 2), date(2024, 10, 8), date(2024, 11, 28), date(2024, 12, 25), date(2024, 12, 26), date(2024, 12, 31),
    date(2025, 1, 1), date(2025, 1, 20), date(2025, 6, 19), date(2025, 7, 6), date(2025, 9, 1), date(2025, 11, 27), date(2025, 12, 25), date(2025, 12, 30),
    date(2026, 1, 1), date(2026, 1, 19), date(2026, 6, 19), date(2026, 7, 3), date(2026, 9, 7),
}


def next_announcement_day(day: date) -> date:
    candidate = day
    while candidate.weekday() not in (0, 1, 2, 3, 6) or candidate in HOLIDAYS:
        candidate += timedelta(days=1)
    return candidate


def announcement_date(submitted: str) -> date:
    moment = datetime.fromisoformat(submitted.replace("Z", "+00:00")).astimezone(EASTERN)
    weekday = moment.weekday()
    before_cutoff = moment.time() < clock(14, 0)
    offsets = {
        (0, True): 0, (0, False): 1,
        (1, True): 0, (1, False): 1,
        (2, True): 0, (2, False): 1,
        (3, True): 0, (3, False): 3,
        (4, True): 2, (4, False): 3,
        (5, True): 2, (5, False): 2,
        (6, True): 1, (6, False): 1,
    }
    eastern_day = next_announcement_day(moment.date() + timedelta(days=offsets[(weekday, before_cutoff)]))
    eastern_announcement = datetime.combine(eastern_day, clock(20, 0), EASTERN)
    return eastern_announcement.astimezone(SHANGHAI).date()


def point_from_manifest(manifest: dict) -> dict:
    """Convert an exact official New/Cross-list manifest to legacy storage fields."""
    category_ids = []
    for key in ("mathDg", "mathMg", "mathGt"):
        category = manifest["sourceManifest"][key]
        category_ids.append(set(category["newIds"] + category["crossListIds"]))
    union = set().union(*category_ids)
    counts = [len(ids) for ids in category_ids]
    return {
        "announcementDate": manifest["announcementDate"],
        "mathDg": counts[0],
        "mathMg": counts[1],
        "mathGt": counts[2],
        # Retained only because the existing D1 columns are non-null. The UI and
        # public weekly trend no longer read these two compatibility values.
        "totalUnique": len(union),
        "crosslistOverlap": sum(counts) - len(union),
    }


def exact_recent_points(start: date, end: date) -> list[dict]:
    points = []
    day = start
    while day <= end:
        if day.weekday() < 5:
            try:
                manifest = build_manifest(day.isoformat())
            except RuntimeError as error:
                print(f"Skipping {day}: {error}")
            else:
                points.append(point_from_manifest(manifest))
                print(
                    f"Exact {day}: DG={points[-1]['mathDg']} "
                    f"MG={points[-1]['mathMg']} GT={points[-1]['mathGt']}"
                )
        day += timedelta(days=1)
    return points


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True)
    parser.add_argument("--end", help="Latest Shanghai announcement date, YYYY-MM-DD")
    parser.add_argument(
        "--exact-days",
        type=int,
        default=90,
        help="Replace this many recent calendar days with official catchup counts",
    )
    parser.add_argument(
        "--recent-only",
        action="store_true",
        help="Only emit the exact recent catchup window; keep older D1 rows untouched",
    )
    args = parser.parse_args()
    end = date.fromisoformat(args.end) if args.end else datetime.now(SHANGHAI).date()
    start = end - timedelta(days=731)
    exact_start = max(start, end - timedelta(days=max(1, args.exact_days) - 1))

    if args.recent_only:
        points = exact_recent_points(exact_start, end)
        payload = {
            "schemaVersion": 1,
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "source": "arXiv official category catchup pages: New submissions + Cross-lists; Replacements excluded",
            "points": points,
        }
        Path(args.out).write_text(
            json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(f"Built {len(points)} exact recent announcement-day points")
        return
    # The combined category query returns each paper once, including its complete
    # category list. The initial published timestamp represents the v1 event even
    # when the current record has later revisions.
    papers_by_id: dict[str, dict] = {}
    window_start = start - timedelta(days=5)
    while window_start <= end:
        if window_start.month == 12:
            next_month = date(window_start.year + 1, 1, 1)
        else:
            next_month = date(window_start.year, window_start.month + 1, 1)
        window_end = min(next_month - timedelta(days=1), end + timedelta(days=1))
        records = fetch(
            datetime.combine(window_start, clock.min, timezone.utc),
            datetime.combine(window_end, clock.max, timezone.utc),
            page_size=1000,
        )
        papers_by_id.update({paper["arxivId"]: paper for paper in records})
        window_start = next_month
        if window_start <= end:
            time.sleep(3)

    by_day: dict[date, dict[str, set[str]]] = defaultdict(lambda: {category: set() for category in CATEGORIES})
    for paper in papers_by_id.values():
        day = announcement_date(paper["submittedAt"])
        if not start <= day <= end:
            continue
        for category in CATEGORIES:
            if category in paper["categories"]:
                by_day[day][category].add(paper["arxivId"])

    points = []
    day = start
    while day <= end:
        # Shanghai Monday-Friday corresponds to arXiv's Sunday-Thursday evening announcements.
        eastern_announcement_day = day - timedelta(days=1)
        if day.weekday() < 5 and eastern_announcement_day not in HOLIDAYS:
            groups = by_day[day]
            union = set().union(*groups.values())
            counts = [len(groups[category]) for category in CATEGORIES]
            points.append({"announcementDate": day.isoformat(), "mathDg": counts[0], "mathMg": counts[1], "mathGt": counts[2], "totalUnique": len(union), "crosslistOverlap": sum(counts) - len(union)})
        day += timedelta(days=1)

    exact_points = exact_recent_points(exact_start, end)
    exact_by_date = {point["announcementDate"]: point for point in exact_points}
    points = [
        exact_by_date.get(point["announcementDate"], point)
        for point in points
        if point["announcementDate"] < exact_start.isoformat()
        or point["announcementDate"] in exact_by_date
    ]
    existing_dates = {point["announcementDate"] for point in points}
    points.extend(
        point for point in exact_points if point["announcementDate"] not in existing_dates
    )
    points.sort(key=lambda point: point["announcementDate"])

    payload = {"schemaVersion": 1, "generatedAt": datetime.now(timezone.utc).isoformat(), "source": "arXiv API v1 reconstruction (older history) + official category catchup pages for the recent exact window", "points": points}
    Path(args.out).write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Built {len(points)} announcement-day points from {len(papers_by_id)} unique v1 papers")


if __name__ == "__main__":
    main()
