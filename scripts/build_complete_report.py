#!/usr/bin/env python3
"""Assemble a complete ReportBatchV2 from official metadata and analyses."""

from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from run_progress import checkpoint, fingerprint, save_analysis


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", help="Metadata produced by arxiv_fetch.py --manifest")
    parser.add_argument("analyses", help="JSON object keyed by arXiv ID")
    parser.add_argument("--source-cursor", required=True)
    parser.add_argument("--out", required=True)
    args = parser.parse_args()

    source = json.loads(Path(args.source).read_text(encoding="utf-8"))
    analyses = json.loads(Path(args.analyses).read_text(encoding="utf-8"))
    papers = {paper["arxivId"]: paper for paper in source["papers"]}
    expected_ids = set(papers)
    manifest_ids = {identifier for category in source['sourceManifest'].values()
                    for field in ('newIds', 'crossListIds') for identifier in category[field]}
    if expected_ids != manifest_ids or len(expected_ids) != source['expectedCount']:
        raise ValueError('Metadata does not completely cover the official manifest')
    if any(not p.get('title') or not p.get('authors') or not p.get('abstract') for p in papers.values()):
        raise ValueError('Required paper metadata is incomplete')
    missing = sorted(expected_ids - analyses.keys())
    extra = sorted(analyses.keys() - expected_ids)
    if missing or extra:
        raise ValueError(
            f"Analysis coverage mismatch: missing={missing or 'none'}, extra={extra or 'none'}"
        )

    all_new_ids = {
        arxiv_id
        for category in source["sourceManifest"].values()
        for arxiv_id in category["newIds"]
    }
    reports = []
    for arxiv_id, paper in papers.items():
        analysis = analyses[arxiv_id]
        score = int(analysis["priorityScore"])
        tier = "high" if score >= 75 else "medium" if score >= 50 else "low"
        report = {
            "announcementDate": source["announcementDate"],
            "arxivId": arxiv_id,
            "version": paper["version"],
            "entryKind": "new" if arxiv_id in all_new_ids else "cross_list",
            "title": paper["title"],
            "authors": paper["authors"],
            "abstract": paper["abstract"],
            "categories": paper["categories"],
            "primaryCategory": paper["primaryCategory"],
            "arxivUrl": paper["arxivUrl"],
            "pdfUrl": paper["pdfUrl"],
            "submittedAt": paper["submittedAt"],
            "updatedAt": paper["updatedAt"],
            "topic": analysis["topic"],
            "progressType": analysis["progressType"],
            "workSummary": analysis["workSummary"],
            "techniques": analysis["techniques"],
            "breakthrough": analysis["breakthrough"],
            "limitations": analysis["limitations"],
            "analysisDepth": analysis.get("analysisDepth", "abstract"),
            "aiStatus": analysis.get("aiStatus", "no_disclosure_observed"),
            "aiEvidence": analysis.get("aiEvidence"),
            "aiEvidenceSource": analysis.get("aiEvidenceSource"),
            "priorityScore": score,
            "priorityTier": tier,
            "priorityReason": analysis.get(
                "priorityReason",
                f"按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 {score}/100。",
            ),
            "lowPriorityReason": analysis.get("lowPriorityReason"),
            "revisionSummary": analysis.get("revisionSummary"),
        }
        if tier == "low" and not report["lowPriorityReason"]:
            raise ValueError(f"Low-priority report {arxiv_id} needs lowPriorityReason")
        reports.append(report)
        save_analysis(paper, analysis)

    reports.sort(key=lambda item: item["priorityScore"], reverse=True)
    now = datetime.now(timezone.utc).isoformat()
    payload = {
        "schemaVersion": 2,
        "run": {
            "runId": os.environ.get('ARXIV_RUN_ID', f"complete-{source['announcementDate']}-{now.replace(':', '')}"),
            "scheduledFor": os.environ.get('ARXIV_SCHEDULED_FOR', now),
            "startedAt": now,
            "completedAt": now,
            "sourceCursor": args.source_cursor,
            "expectedCount": source["expectedCount"],
        },
        "announcementDay": {
            "date": source["announcementDate"],
            "status": "announced",
            "source": source["source"],
        },
        "sourceManifest": source["sourceManifest"],
        "dailyVolume": source["dailyVolume"],
        "reports": reports,
    }
    output = Path(args.out)
    if output.exists():
        previous = json.loads(output.read_text(encoding='utf-8'))
        if all(previous.get(key) == value for key, value in payload.items() if key != 'run') and previous.get('run', {}).get('sourceCursor') == args.source_cursor:
            print(f"Reusing immutable complete batch with {len(reports)} reports")
            return
    Path(args.out).write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    checkpoint('analysis_complete', fingerprint(source), {'batchPath': str(Path(args.out).resolve()), 'count': len(reports)})
    print(f"Built complete V2 batch with {len(reports)} reports")


if __name__ == "__main__":
    main()
