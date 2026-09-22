"""Versioned full-text AI disclosure search. Matches require human review.

No inference from author identity, writing style, topic or the use of Lean.
All network access goes through the shared arXiv transport and waiting budget.
"""
import argparse
import hashlib
import json
import re
import subprocess
import unicodedata
import copy
from datetime import datetime, timezone
from pathlib import Path

from arxiv_client import ArxivClient, Deferred, atomic_json

RULE_VERSION = 'ai-disclosure-search-v4'
KEYWORDS = re.compile(
    r'(?i:chat\s*gpt|\bgpt[\s-]*[3456o]\b|open\s*ai|\bclaude\b|\bgemini\b|'
    r'\banthropic\b|\bgrok\b|\bmistral\b|\bqwen\b|\bllama\b|\bcodex\b|\bperplexity\b|'
    r'\bdeepseek\b|\bcopilot\b|\bLLMs?\b|large\s+language\s+model|'
    r'artificial\s+intelligence|generative\s+(?:AI|model)|\bai[-\s]+(?:assist|tool|usage|use|disclos)|'
    r'language\s+model|\bodin\b|\bastra\b|\bgrammarly\b|\bdeep\s*l\b|'
    r'(?:automated|autonomous)\s+(?:research\s+)?agent|'
    r'机器生成|人工智能|人工智慧|大语言模型|大型語言模型)|\bAI\b')


def search_pages(pages):
    """Search every extracted page; never turn a keyword into a verdict."""
    matches = []
    for number, page in enumerate(pages, 1):
        clean = re.sub(r'(?<=\w)[-\u00ad]\s*\n\s*(?=\w)', '', unicodedata.normalize('NFKC', page))
        clean = ' '.join(clean.split())
        spans = []
        for match in KEYWORDS.finditer(clean):
            start, end = max(0, match.start() - 350), min(len(clean), match.end() + 550)
            if spans and start <= spans[-1][1]:
                spans[-1][1] = max(spans[-1][1], end)
            else:
                spans.append([start, end])
        matches.extend({'page': number, 'text': clean[start:end]} for start, end in spans)
    return matches


def extract_pdf(path):
    info = subprocess.run(['pdfinfo', str(path)], check=True, capture_output=True, text=True, timeout=30).stdout
    count = re.search(r'^Pages:\s+(\d+)', info, re.M)
    if not count:
        raise ValueError('PDF page count unavailable')
    extracted = subprocess.run(['pdftotext', '-layout', str(path), '-'], check=True, capture_output=True, text=True, timeout=120).stdout
    pages = extracted.split('\f')
    if not pages[-1].strip():
        pages.pop()
    complete = len(pages) == int(count[1]) and all(len(p.strip()) >= 20 for p in pages)
    return pages, complete, len(pages) == int(count[1])


def metadata_hash(entry):
    context = {key: entry['metadata'].get(key, '') for key in ('title', 'abstract', 'comment')}
    return hashlib.sha256(json.dumps(context, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()


class LocalSourceUnavailable(RuntimeError):
    pass


def audit_entry(entry, out, client, *, allow_network=True):
    identifier = entry['arxivId']
    version = entry['metadata'].get('version')
    suffix = f'v{version}' if version else ''
    slug = identifier.replace('/', '--') + suffix
    path = out / (slug + '.json')
    existing = json.loads(path.read_text()) if path.exists() else {}
    url = f'https://arxiv.org/pdf/{identifier}{suffix}'
    pdf = out / (slug + '.pdf')
    # Only explicitly versioned URLs are immutable across scheduled runs.
    local = pdf.exists() and (version is not None or existing.get('runId') == client.run_id)
    if not local and not allow_network:
        raise LocalSourceUnavailable('Document is not cached for this version')
    body = pdf.read_bytes() if local else client.request(url)
    body_hash = hashlib.sha256(body).hexdigest()
    context_hash = metadata_hash(entry)
    if (existing.get('ruleVersion') == RULE_VERSION
            and existing.get('metadataHash') == context_hash
            and existing.get('contentHash') == body_hash
            and existing.get('arxivId') == identifier
            and existing.get('sourceUrl') == url
            and existing.get('version') == version and version is not None
            and existing.get('status') in ('full_text_searched', 'needs_review')):
        return existing
    if not body.startswith(b'%PDF-'):
        raise ValueError('Official response is not a PDF')
    pdf.write_bytes(body)
    pages, complete, page_count_matches = extract_pdf(pdf)
    (out / (slug + '.txt')).write_text('\f'.join(pages))
    matches = search_pages(pages)
    metadata_matches = search_pages(['\n'.join(entry['metadata'].get(k, '') for k in ('title', 'abstract', 'comment'))])
    stamp = re.search(r'arXiv:\s*([^\s]+?)v(\d+)\b', '\n'.join(pages[:2]))
    if stamp and (stamp[1] != identifier or (version and int(stamp[2]) != version)):
        raise ValueError('PDF stamp differs from requested paper/version')
    actual_version = version
    if actual_version is None:
        stamp = re.search(r'arXiv:\s*' + re.escape(identifier) + r'v(\d+)\b', '\n'.join(pages[:2]))
        if stamp:
            actual_version = int(stamp[1])
    record = {'ruleVersion': RULE_VERSION, 'metadataHash': context_hash, 'runId': client.run_id,
              'arxivId': identifier, 'version': actual_version,
              'sourceUrl': url, 'contentHash': hashlib.sha256(body).hexdigest(),
              'checkedAt': datetime.now(timezone.utc).isoformat(), 'pages': len(pages),
              'extractionComplete': complete, 'matches': matches, 'metadataMatches': metadata_matches,
              'pageCountMatches': page_count_matches,
              'shortTextPages': [i for i, page in enumerate(pages, 1) if len(page.strip()) < 20],
              'status': 'needs_review' if matches or metadata_matches or not complete or actual_version is None else 'full_text_searched'}
    atomic_json(path, record)
    return record


def build_candidate(feed, records, decisions, run_id, scheduled_for):
    """Apply manually reviewed evidence bound to the exact PDF, never keywords."""
    indexed = {r['arxivId']: r for r in records}
    patches = []
    for entry in feed['entries']:
        if not entry.get('analysis'):
            continue
        record = indexed.get(entry['arxivId'])
        if not record or not record.get('contentHash'):
            continue  # Existing UI shows legacy/unchecked records as pending.
        expected_url = 'https://arxiv.org/pdf/' + entry['arxivId']
        if record.get('sourceUrl') not in (expected_url, expected_url + 'v' + str(record.get('version'))):
            raise ValueError('AI review source belongs to another paper/version')
        if record.get('metadataHash') and record['metadataHash'] != metadata_hash(entry):
            raise ValueError('Metadata changed after disclosure search; recheck local sources')
        analysis = copy.deepcopy(entry['analysis'])
        decision = decisions.get(entry['arxivId'])
        complete = record.get('extractionComplete') and record.get('version') is not None
        if decision:
            if decision.get('contentHash') != record['contentHash'] or decision.get('version') != record['version']:
                raise ValueError('Review does not match the exact PDF version/hash')
            if record.get('metadataHash') and (decision.get('metadataHash') != record['metadataHash']
                    or decision.get('ruleVersion') != record.get('ruleVersion')):
                raise ValueError('Review must cover the current search rules and metadata')
            if not decision.get('reason') or decision.get('status') not in ('explicit', 'no_disclosure_observed'):
                raise ValueError('Every manual decision requires a reason and valid status')
            if decision['status'] == 'explicit' and not decision.get('location'):
                raise ValueError('Explicit evidence requires its source location')
            # A scanned/image page cannot silently pass extraction. A reviewer may
            # clear only the exact rendered short pages of this hash-bound PDF.
            if (record.get('pageCountMatches') and record.get('shortTextPages')
                    and sorted(decision.get('visuallyCheckedPages', [])) == record['shortTextPages']):
                complete = record.get('version') is not None
        reviewed = complete and (decision is not None or not (record['matches'] or record['metadataMatches']))
        note = ('对该版本全部可提取页面做 AI 披露关键词检索，并核对命中段落；这不是对整篇数学证明的审读。'
                if reviewed else '全文关键词检索尚有待核对段落或文本提取缺口，不能据此认定未使用 AI。')
        if decision:
            note += decision['reason']
            if decision.get('visuallyCheckedPages'):
                note += '另逐页查看文本过短页面的渲染图，确认仅为空白页或章节扉页。'
            if decision['status'] == 'explicit':
                usage = decision.get('usage')
                if usage is not None:
                    allowed = {'writing', 'literature', 'ideas', 'proofs', 'verification', 'computation', 'exploration'}
                    if not isinstance(usage, list) or any(u not in allowed for u in usage):
                        raise ValueError('Unknown AI usage category')
                    analysis['aiUsage'] = sorted(set(usage))
                elif analysis.get('aiEvidence') != decision['reason']:
                    analysis.pop('aiUsage', None)
                analysis.update(aiStatus='explicit', aiEvidence=decision['reason'],
                                aiEvidenceSource=record['sourceUrl'] + ' · ' + decision['location'])
            elif analysis['aiStatus'] != 'explicit':
                analysis.update(aiStatus='no_disclosure_observed', aiEvidence=None, aiEvidenceSource=None)
        analysis['aiReview'] = dict(status='full_text_searched' if reviewed else 'needs_review',
            checkedAt=record['checkedAt'], version=record['version'], sourceUrl=record['sourceUrl'],
            contentHash=record['contentHash'], pages=record['pages'], note=note,
            **{k: record[k] for k in ('ruleVersion', 'metadataHash') if k in record})
        # Mathematical reading depth stays unchanged; distinguish its scope from AI review.
        analysis['limitations'] = analysis['limitations'].replace(
            '未见 AI 协作声明仅指这些已检查来源，不代表已核验整篇论文完全由人类完成。',
            'AI 披露另见独立核查记录；未检索到声明不代表没有使用 AI。')
        metadata = copy.deepcopy(entry['metadata'])
        if metadata.get('version') and metadata['version'] != record['version']:
            raise ValueError('PDF version differs from analyzed metadata')
        # PDF arXiv version stamp is evidence for previously unknown versions, not dates.
        if record['version']:
            metadata['version'] = record['version']
        basis = copy.deepcopy(entry['analysisBasis'])
        basis['version'] = metadata.get('version')
        patches.append(dict(arxivId=entry['arxivId'], metadata=metadata,
            source=dict(url=record['sourceUrl'], observedAt=record['checkedAt'], contentHash=record['contentHash']),
            analysis=analysis, analysisBasis=basis))
    return dict(runId=run_id, scheduledFor=scheduled_for, date=feed['date'], categories=[], entries=patches)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--feed', required=True)
    parser.add_argument('--out', required=True)
    parser.add_argument('--run-id', required=True)
    parser.add_argument('--decisions', help='Hash-bound human review decisions; apply without network access')
    parser.add_argument('--scheduled-for')
    parser.add_argument('--candidate')
    parser.add_argument('--local-only', action='store_true', help='Recheck cached PDFs without making external requests')
    args = parser.parse_args()
    feed = json.loads(Path(args.feed).read_text())
    out = Path(args.out);out.mkdir(parents=True, exist_ok=True)
    if args.decisions:
        if not args.scheduled_for or not args.candidate:
            parser.error('--decisions requires --scheduled-for and --candidate')
        records = json.loads((out / 'progress.json').read_text())['results']
        candidate = build_candidate(feed, records, json.loads(Path(args.decisions).read_text()), args.run_id, args.scheduled_for)
        atomic_json(Path(args.candidate), candidate)
        print(json.dumps({'entries': len(candidate['entries']), 'explicit': sum(e['analysis']['aiStatus'] == 'explicit' for e in candidate['entries'])}))
        return
    client = ArxivClient(run_id=args.run_id)
    results = []
    # Most important papers first, but every paper must eventually be checked.
    entries = sorted(feed['entries'], key=lambda e: -(e.get('analysis') or {}).get('priorityScore', 0))
    deferred = None
    for entry in entries:
        try:
            record = audit_entry(entry, out, client, allow_network=not args.local_only and deferred is None)
        except Deferred as error:
            deferred = str(error)
            record = {'arxivId': entry['arxivId'], 'status': 'unavailable', 'reason': 'Deferred'}
            # Subsequent entries use local files only; no more remote requests.
        except (ValueError, RuntimeError, OSError, subprocess.SubprocessError) as error:
            # No response bodies or full documents in logs.
            record = {'arxivId': entry['arxivId'], 'status': 'unavailable', 'reason': type(error).__name__}
        results.append(record)
        atomic_json(out / 'progress.json', {'runId': args.run_id, 'date': feed['date'], 'results': results})
        print(json.dumps({'id': entry['arxivId'], 'status': record['status'], 'pages': record.get('pages'), 'candidatePassages': len(record.get('matches', []))}), flush=True)
    missing = sorted(set(e['arxivId'] for e in entries) - set(r['arxivId'] for r in results if r['status'] != 'unavailable'))
    atomic_json(out / 'progress.json', {'runId': args.run_id, 'date': feed['date'], 'results': results, 'remaining': missing, 'deferred': deferred})
    if deferred:
        print(json.dumps({'status': 'deferred', 'reason': deferred, 'remaining': len(missing)}))
        raise SystemExit(2)


if __name__ == '__main__':
    main()
