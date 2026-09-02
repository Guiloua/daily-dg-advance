#!/usr/bin/env python3
"""Make the release decision from immutable source and CI state."""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import asdict, dataclass


SHA_RE = re.compile(r"^[0-9a-f]{40}$")


@dataclass(frozen=True)
class ReleaseDecision:
    action: str
    reason: str
    commit_sha: str


def evaluate_release(
    github_sha: str, deployed_sha: str | None, ci_status: str
) -> ReleaseDecision:
    if not SHA_RE.fullmatch(github_sha):
        return ReleaseDecision("blocked", "invalid GitHub commit SHA", github_sha)
    if deployed_sha == github_sha:
        return ReleaseDecision("skip", "commit is already deployed", github_sha)
    if ci_status != "success":
        return ReleaseDecision(
            "blocked", f"CI / gate is {ci_status}", github_sha
        )
    return ReleaseDecision("deploy", "new green main commit", github_sha)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--github-sha", required=True)
    parser.add_argument("--deployed-sha")
    parser.add_argument(
        "--ci-status", required=True, choices=("success", "pending", "failure")
    )
    args = parser.parse_args()
    decision = evaluate_release(args.github_sha, args.deployed_sha, args.ci_status)
    print(json.dumps(asdict(decision)))
    if decision.action == "blocked":
        raise SystemExit(1)


if __name__ == "__main__":
    main()
