"""Durable local checkpoints; never a substitute for remote verification."""
import hashlib
import json
import os
from pathlib import Path
from arxiv_client import atomic_json

ROOT = Path(__file__).resolve().parents[1] / '.automation' / 'progress'
ANALYSIS_POLICY = 'geometry-v2-abstract-fallback-1'


def fingerprint(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False).encode()).hexdigest()


def checkpoint(stage, identity, evidence):
    key = fingerprint([stage, identity])
    atomic_json(ROOT / (key + '.json'), {'stage': stage, 'identity': identity,
                'runId': os.environ.get('ARXIV_RUN_ID'), 'evidence': evidence})


def analysis_path(paper):
    return ROOT / 'analyses' / (fingerprint([ANALYSIS_POLICY, paper]) + '.json')


def cached_analyses(papers):
    result = {}
    for paper in papers:
        path = analysis_path(paper)
        if path.exists():
            result[paper['arxivId']] = json.loads(path.read_text())
    return result


def save_analysis(paper, analysis):
    atomic_json(analysis_path(paper), analysis)
