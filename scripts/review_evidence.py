"""Identity checks shared by source reclamation and disclosure-review reuse."""
import hashlib
import json
import re
from datetime import datetime
from urllib.parse import urlsplit

RULE_VERSION = 'ai-disclosure-search-v4'
HASH = re.compile(r'[a-f0-9]{64}')
IDENTIFIER = re.compile(r'(?:[a-z-]+/\d{7}|\d{4}\.\d{4,5})')


def metadata_hash(entry):
    context = {key: entry['metadata'].get(key, '') for key in ('title', 'abstract', 'comment')}
    return hashlib.sha256(json.dumps(context, sort_keys=True, ensure_ascii=False,
                                    separators=(',', ':')).encode()).hexdigest()


def pdf_identity(url):
    if not isinstance(url, str):
        return None
    parsed = urlsplit(url)
    if parsed.scheme != 'https' or parsed.hostname not in ('arxiv.org', 'export.arxiv.org') or parsed.query or parsed.fragment:
        return None
    match = re.fullmatch(r'/pdf/((?:[a-z-]+/\d{7}|\d{4}\.\d{4,5}))(?:v([1-9]\d*))?', parsed.path)
    return (match[1], int(match[2]) if match[2] else None) if match else None


def valid_review(entry, review):
    if not isinstance(review, dict):
        return False
    version = entry.get('metadata', {}).get('version')
    try:
        checked_at = datetime.fromisoformat(review.get('checkedAt', '').replace('Z', '+00:00'))
    except (ValueError, TypeError, AttributeError):
        return False
    return (IDENTIFIER.fullmatch(entry.get('arxivId', '')) is not None
            and type(version) is int and version > 0
            and review.get('status') == 'full_text_searched'
            and type(review.get('version')) is int
            and review.get('version') == version
            and isinstance(review.get('contentHash'), str)
            and HASH.fullmatch(review.get('contentHash', '')) is not None
            and type(review.get('pages')) is int and review['pages'] > 0
            and checked_at.tzinfo is not None
            and review.get('ruleVersion') == RULE_VERSION
            and review.get('metadataHash') == metadata_hash(entry)
            and pdf_identity(review.get('sourceUrl', '')) in (
                (entry['arxivId'], version), (entry['arxivId'], None)))


def review_key(entry):
    return hashlib.sha256(json.dumps([entry['arxivId'], entry['metadata']['version'],
                                     metadata_hash(entry), RULE_VERSION]).encode()).hexdigest()


def retained_analysis(entry, record):
    if not isinstance(record, dict):
        return None
    analysis = record.get('retainedAnalysis') or {}
    if not isinstance(analysis, dict):
        return None
    review = analysis.get('aiReview') or {}
    if not valid_review(entry, review) or record.get('arxivId') != entry['arxivId']:
        return None
    if any(record.get(key) != review.get(key) for key in
           ('version', 'contentHash', 'metadataHash', 'ruleVersion', 'sourceUrl')):
        return None
    existing = (entry.get('analysis') or {}).get('aiReview') or {}
    if (existing.get('version') == review['version'] and existing.get('metadataHash') == review['metadataHash']
            and existing.get('contentHash') and existing['contentHash'] != review['contentHash']):
        return None
    return analysis
