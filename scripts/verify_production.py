#!/usr/bin/env python3
"""Verify production availability and count invariants without logging paper text."""

from __future__ import annotations

import argparse
import json
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

from arxiv_listing import CATEGORIES, _download, listing_date, parse_listing


USER_AGENT = "GeometryArxivDailyHealth/1.0"


@dataclass(frozen=True)
class ExpectedAnnouncement:
    date: str
    math_dg: int
    math_mg: int
    math_gt: int


def _request(url: str, *, method: str = "GET", body: bytes | None = None):
    request = urllib.request.Request(
        url,
        data=body,
        method=method,
        headers={"User-Agent": USER_AGENT, "Content-Type": "application/json"},
    )
    return urllib.request.urlopen(request, timeout=90)


def _json(url: str) -> tuple[int, dict]:
    try:
        with _request(url) as response:
            return response.status, json.loads(response.read())
    except urllib.error.HTTPError as error:
        try:
            payload = json.loads(error.read())
        except (json.JSONDecodeError, UnicodeDecodeError):
            payload = {}
        return error.code, payload


def official_announcement() -> ExpectedAnnouncement:
    values: dict[str, tuple[str, int]] = {}
    for position, (key, category) in enumerate(CATEGORIES.items()):
        document = _download(f"https://arxiv.org/list/{category}/new")
        date = listing_date(document)
        if not date:
            raise RuntimeError(f"Could not determine the current {category} announcement date")
        values[key] = (date, parse_listing(document).publication_count)
        if position < len(CATEGORIES) - 1:
            time.sleep(3)
    dates = {value[0] for value in values.values()}
    if len(dates) != 1:
        raise RuntimeError("Target categories disagree on the current announcement date")
    return ExpectedAnnouncement(
        date=dates.pop(),
        math_dg=values["mathDg"][1],
        math_mg=values["mathMg"][1],
        math_gt=values["mathGt"][1],
    )


def verify_payloads(
    health: dict,
    reports: dict,
    volume: dict,
    expected: ExpectedAnnouncement | None = None,
) -> list[str]:
    errors: list[str] = []
    if health.get("status") != "ok":
        errors.append("health endpoint is degraded")
    coverage = health.get("coverage", {})
    publication_reports = [
        report
        for report in reports.get("reports", [])
        if report.get("entryKind") != "revision"
    ]
    counts = {
        int(coverage.get("expectedCount", -1)),
        int(coverage.get("publishedCount", -2)),
        int(coverage.get("databasePublicationCount", -3)),
        len(publication_reports),
    }
    if len(counts) != 1 or not coverage.get("complete"):
        errors.append("report coverage counts do not agree")
    latest_date = health.get("latestAnnouncementDate")
    if reports.get("date") != latest_date:
        errors.append("reports and database latest dates do not agree")

    latest_week = health.get("latestCompleteWeek")
    api_weeks = volume.get("weeks", [])
    if not latest_week or not api_weeks or api_weeks[-1] != latest_week:
        errors.append("health and volume latest complete weeks do not agree")
    elif latest_week:
        daily_points = [
            point
            for point in volume.get("points", [])
            if latest_week["weekStart"]
            <= point.get("announcementDate", "")
            <= latest_week["weekEnding"]
        ]
        for field in ("mathDg", "mathMg", "mathGt"):
            if sum(int(point.get(field, 0)) for point in daily_points) != int(
                latest_week[field]
            ):
                errors.append(f"weekly {field} total does not equal its daily sum")

    if expected:
        if latest_date != expected.date:
            errors.append("site latest date does not match the official arXiv announcement")
        day = next(
            (
                point
                for point in volume.get("points", [])
                if point.get("announcementDate") == expected.date
            ),
            None,
        )
        expected_counts = {
            "mathDg": expected.math_dg,
            "mathMg": expected.math_mg,
            "mathGt": expected.math_gt,
        }
        if not day:
            errors.append("official announcement day is missing from volume data")
        elif any(int(day.get(key, -1)) != value for key, value in expected_counts.items()):
            errors.append("daily category totals do not match official arXiv listings")
    return errors


def verify_daily_outcome(receipt: dict, scheduled_date: str, announcement_date: str, count: int) -> list[str]:
    """Task completion and healthy historical data are not evidence of a successful run."""
    if not isinstance(receipt, dict):
        return ["daily outcome is not an object"]
    errors = []
    if receipt.get("schemaVersion") != 1 or not receipt.get("runId"):
        errors.append("daily outcome identity is missing")
    if receipt.get("scheduledDate") != scheduled_date:
        errors.append("daily outcome is missing or stale for this scheduled day")
    if receipt.get("status") not in ("success", "no_new"):
        errors.append("daily run is not successful or verified no-new")
    if receipt.get("status") == "success" and receipt.get("ingestVerified") is not True:
        errors.append("daily publication has no ingest confirmation")
    if any(receipt.get(key) is not True for key in ("officialVerified", "sitesVerified", "pagesVerified")):
        errors.append("daily outcome verification is incomplete")
    if receipt.get("announcementDate") != announcement_date:
        errors.append("daily outcome and official announcement dates disagree")
    if any(type(receipt.get(key)) is not int or receipt[key] != count for key in ("expectedCount", "publishedCount")):
        errors.append("daily outcome and production counts disagree")
    return errors


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", required=True)
    parser.add_argument("--check-arxiv", action="store_true")
    parser.add_argument("--daily-outcome", type=Path, help="Required by scheduled health checks; no secrets in this receipt")
    args = parser.parse_args()
    receipt = None
    if args.daily_outcome:
        if not args.check_arxiv:
            parser.error("--daily-outcome requires --check-arxiv")
        try:
            receipt = json.loads(args.daily_outcome.read_text())
        except (OSError, ValueError):
            raise RuntimeError("Daily outcome is missing or unreadable") from None
    site = args.site.rstrip("/")

    with _request(f"{site}/") as homepage:
        if homepage.status != 200:
            raise RuntimeError(f"Homepage returned HTTP {homepage.status}")

    health_status, health = _json(f"{site}/api/health")
    reports_status, reports = _json(f"{site}/api/reports")
    volume_status, volume = _json(f"{site}/api/volume?range=6m")
    if (health_status, reports_status, volume_status) != (200, 200, 200):
        raise RuntimeError(
            "Core endpoint status mismatch: "
            f"health={health_status} reports={reports_status} volume={volume_status}"
        )

    unauthorized_status, _ = _json(f"{site}/api/ingest/state")
    if unauthorized_status != 401:
        raise RuntimeError("Protected ingest state endpoint accepted an anonymous request")
    try:
        with _request(
            f"{site}/api/ingest/v2", method="POST", body=b"{}"
        ) as response:
            unauthorized_write_status = response.status
    except urllib.error.HTTPError as error:
        unauthorized_write_status = error.code
    if unauthorized_write_status != 401:
        raise RuntimeError("Protected ingest endpoint accepted an anonymous request")

    expected = official_announcement() if args.check_arxiv else None
    errors = verify_payloads(health, reports, volume, expected)
    if args.daily_outcome:
        errors.extend(verify_daily_outcome(receipt, datetime.now(ZoneInfo("Asia/Shanghai")).date().isoformat(), expected.date, health.get("coverage", {}).get("publishedCount")))
    if errors:
        raise RuntimeError("; ".join(errors))

    summary = {
        "status": "ok",
        "dailyRunStatus": receipt["status"] if args.daily_outcome else "not_checked",
        "latestAnnouncementDate": health["latestAnnouncementDate"],
        "publishedCount": health["coverage"]["publishedCount"],
        "latestCompleteWeek": health["latestCompleteWeek"],
    }
    print(json.dumps(summary, ensure_ascii=False))


if __name__ == "__main__":
    main()
