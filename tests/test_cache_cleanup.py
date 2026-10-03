import copy
import hashlib
import json
import multiprocessing
import tempfile
import threading
import time
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

from arxiv_client import Deferred, atomic_json
from cache_lifecycle import source_lock
from cleanup_automation_cache import cleanup, after_verification
from progressive_publish import digest
from review_evidence import RULE_VERSION, metadata_hash
from ai_disclosure_audit import audit_entry, build_candidate


def hold_cache_lock(root, kind, ready, release):
    if kind == 'source':
        with source_lock(root):
            ready.set()
            release.wait(10)
    else:
        import fcntl
        with (Path(root) / 'transport.lock').open('a') as handle:
            fcntl.flock(handle, fcntl.LOCK_EX)
            ready.set()
            release.wait(10)


class CleanupTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()
        self.automation = self.root / '.automation'
        self.cache = self.automation / 'arxiv-cache'
        self.audit = self.automation / 'ai-audit/2026-09-28'
        self.cache.mkdir(parents=True)
        self.audit.mkdir(parents=True)
        self.body = b'%PDF-synthetic-reviewed-source'
        self.pdf_hash = hashlib.sha256(self.body).hexdigest()
        self.entry = {
            'arxivId': '2609.00001',
            'metadata': {'title': 'A theorem', 'abstract': 'An abstract', 'comment': '',
                         'authors': ['Author'], 'categories': ['math.DG'], 'primaryCategory': 'math.DG',
                         'version': 1, 'submittedAt': '2026-09-27T00:00:00Z', 'updatedAt': '2026-09-27T00:00:00Z'},
            'analysisBasis': {'version': 1, 'abstract': 'An abstract'},
            'analysis': {'aiStatus': 'explicit', 'aiEvidence': 'Reviewed editing disclosure',
                         'aiEvidenceSource': 'p1', 'aiUsage': ['writing'], 'limitations': 'Summary-level analysis',
                         'workSummary': 'Original mathematical summary'},
        }
        review = {'status': 'full_text_searched', 'version': 1, 'contentHash': self.pdf_hash,
                  'metadataHash': metadata_hash(self.entry), 'ruleVersion': RULE_VERSION,
                  'pages': 1, 'checkedAt': '2026-09-28T10:30:00+08:00',
                  'sourceUrl': 'https://arxiv.org/pdf/2609.00001v1', 'note': 'Reviewed'}
        self.entry['analysis']['aiReview'] = review
        self.feed = {'schemaVersion': 2, 'date': '2026-09-28', 'revision': 1, 'contentHash': '',
                     'entries': [self.entry],
                     'categories': [{'category': key, 'complete': True, 'newIds': ['2609.00001'] if index == 0 else [],
                                     'crossListIds': []} for index, key in enumerate(('mathDg', 'mathMg', 'mathGt'))],
                     'coverage': {'complete': True, 'listingsComplete': True, 'expectedCount': 1,
                                  'confirmedCount': 1, 'publishedCount': 1, 'metadataCount': 1, 'analyzedCount': 1}}
        self.snapshot = self.automation / 'run/publications-2026-09-28/published.json'
        self.outbox = self.automation / 'progress/mirror-outbox.json'
        self.save_feed()
        self.pdf = self.audit / '2609.00001v1.pdf'
        self.txt = self.pdf.with_suffix('.txt')
        self.record = self.pdf.with_suffix('.json')
        self.pdf.write_bytes(self.body)
        self.txt.write_text('Full paper text')
        atomic_json(self.record, {**review, 'arxivId': self.entry['arxivId'], 'status': 'needs_review',
                                  'extractionComplete': True, 'matches': [{'page': 1, 'text': 'AI editing'}],
                                  'metadataMatches': [], 'runId': 'original-run'})
        url = review['sourceUrl']
        self.response = self.cache / (hashlib.sha256(('versioned\n' + url).encode()).hexdigest() + '.json')
        atomic_json(self.response, {'url': url, 'sha256': self.pdf_hash, 'body': self.body.hex()})

    def save_feed(self, *, mirror='verified'):
        self.feed['contentHash'] = digest({**self.feed, 'contentHash': ''})
        atomic_json(self.snapshot, self.feed)
        atomic_json(self.outbox, {'days': {self.feed['date']: {'status': mirror,
                   'contentHash': self.feed['contentHash'], 'revision': self.feed['revision'],
                   'snapshotPath': str(self.snapshot)}}})

    def test_legacy_project_alias_preserves_evidence_and_shared_cache(self):
        with tempfile.TemporaryDirectory() as directory:
            alias = Path(directory) / 'old-project'
            alias.symlink_to(self.root, target_is_directory=True)
            snapshot = self.snapshot.read_bytes()
            outbox = json.loads(self.outbox.read_text())
            outbox['days'][self.feed['date']]['snapshotPath'] = str(alias / self.snapshot.relative_to(self.root))
            atomic_json(self.outbox, outbox)
            from cleanup_automation_cache import read_json, safe_path
            self.assertEqual(read_json(outbox['days'][self.feed['date']]['snapshotPath'], self.root), self.feed)
            self.assertEqual(safe_path(alias / '.automation/arxiv-cache/transport.lock', self.root, file=None),
                             self.cache / 'transport.lock')
            with patch.dict('os.environ', {'ARXIV_CACHE_DIR': str(alias / '.automation/arxiv-cache')}):
                report = cleanup(alias)
            self.assertEqual(report['status'], 'ok')
            self.assertEqual(report['deletedFiles'], 3)
            self.assertEqual(self.snapshot.read_bytes(), snapshot)
            self.assertTrue((alias / '.automation/progress/retained-ai-reviews.json').exists())

    def test_success_deletes_sources_preserves_evidence_controls_and_is_idempotent(self):
        controls = {'state.json': {'nextAllowedAt': 9999999999}, 'slot.budget.json': {'waited': 1200},
                    'listing.json': {'body': 'listing'}, 'metadata.json': {'abstract': 'metadata'}}
        for name, value in controls.items():
            atomic_json(self.cache / name, value)
        token = self.automation / 'ingest-token'
        token.write_text('synthetic-test-credential')
        report = cleanup(self.root)
        self.assertEqual(report['status'], 'ok')
        self.assertEqual(report['deletedFiles'], 3)
        self.assertGreater(report['freedBytes'], 0)
        for path in (self.pdf, self.txt, self.response):
            self.assertFalse(path.exists())
        for name, value in controls.items():
            self.assertEqual(json.loads((self.cache / name).read_text()), value)
        self.assertTrue(self.record.exists())
        self.assertTrue(self.snapshot.exists())
        self.assertEqual(token.read_text(), 'synthetic-test-credential')
        self.assertTrue((self.automation / 'progress/retained-ai-reviews.json').exists())
        self.assertEqual(cleanup(self.root)['deletedFiles'], 0)

    def test_preview_has_no_source_or_review_changes(self):
        report = cleanup(self.root, dry_run=True)
        self.assertEqual(report['candidateFiles'], 3)
        self.assertEqual(report['deletedFiles'], 0)
        self.assertTrue(self.pdf.exists())
        self.assertFalse((self.automation / 'progress/retained-ai-reviews.json').exists())
        self.assertFalse((self.automation / 'cache-cleanup/latest.json').exists())

    def test_final_outcome_automatically_cleans_after_persisting_success(self):
        import progressive_outcome as outcome
        run = self.snapshot.parent.parent
        atomic_json(run / 'progress.json', {'runId': 'final-run', 'scheduledFor': '2026-09-28T10:30:00+08:00',
                    'publishedDays': [self.feed['date']]})
        atomic_json(self.automation / 'daily-outcomes/2026-09-28.json',
                    {'status': 'running', 'scheduledDate': self.feed['date'], 'runDirectory': str(run)})
        with patch.object(outcome, 'ROOT', self.root), patch.object(outcome, 'request_json', return_value=self.feed), \
                patch('sys.argv', ['outcome', '--run', str(run)]), patch('builtins.print'):
            outcome.main()
        self.assertFalse(self.pdf.exists())
        receipt = json.loads((self.automation / 'daily-outcomes/2026-09-28.json').read_text())
        self.assertEqual(receipt['status'], 'success')
        self.assertEqual(receipt['runDirectory'], str(run.resolve()))

    def test_mirror_retry_automatically_cleans_after_releasing_publication_lock(self):
        import progressive_mirror as mirror
        with patch.object(mirror, 'ROOT', self.root), patch('builtins.print'):
            mirror.main()
        self.assertFalse(self.pdf.exists())

    def test_production_verification_triggers_cleanup_only_after_success(self):
        import verify_production as verifier
        receipt = self.automation / 'daily-outcomes/2026-09-28.json'
        atomic_json(receipt, {'schemaVersion': 2})
        argv = ['verify', '--site', 'https://example.test', '--daily-outcome', str(receipt),
                '--scheduled-for', '2026-09-28T10:30:00+08:00']
        with patch('sys.argv', argv), patch.object(verifier, 'verify_progressive_run') as verify, \
                patch('cleanup_automation_cache.after_verification') as reclaim:
            verifier.main()
            verify.assert_called_once()
            reclaim.assert_called_once_with()
        with patch('sys.argv', argv), patch.object(verifier, 'verify_progressive_run', side_effect=RuntimeError), \
                patch('cleanup_automation_cache.after_verification') as reclaim:
            with self.assertRaises(RuntimeError):
                verifier.main()
            reclaim.assert_not_called()

    def test_each_incomplete_or_invalid_gate_preserves_all_sources(self):
        original = copy.deepcopy(self.feed)
        for change in ('partial', 'missing_analysis', 'pending_review', 'wrong_version',
                       'wrong_metadata', 'old_rules', 'unknown_count', 'wrong_counts', 'empty_categories'):
            with self.subTest(change=change):
                self.feed = copy.deepcopy(original)
                review = self.feed['entries'][0]['analysis']['aiReview']
                if change == 'partial': self.feed['coverage']['complete'] = False
                elif change == 'missing_analysis': self.feed['entries'][0]['analysis'] = None
                elif change == 'pending_review': review['status'] = 'needs_review'
                elif change == 'wrong_version': review['version'] = 2
                elif change == 'wrong_metadata': review['metadataHash'] = '0' * 64
                elif change == 'old_rules': review['ruleVersion'] = 'old-rules'
                elif change == 'unknown_count': self.feed['coverage']['expectedCount'] = None
                elif change == 'wrong_counts': self.feed['coverage']['metadataCount'] = 0
                elif change == 'empty_categories': self.feed['categories'] = []
                self.save_feed()
                self.assertEqual(cleanup(self.root)['deletedFiles'], 0)
                self.assertTrue(self.pdf.exists())

    def test_failed_mirror_stale_snapshot_and_changed_source_are_preserved(self):
        self.save_feed(mirror='failed')
        self.assertEqual(cleanup(self.root)['deletedFiles'], 0)
        self.save_feed()
        stale = json.loads(self.outbox.read_text())
        stale['days'][self.feed['date']]['revision'] = 0
        atomic_json(self.outbox, stale)
        self.assertEqual(cleanup(self.root)['deletedFiles'], 0)
        self.save_feed()
        self.pdf.write_bytes(b'%PDF-different-version-content')
        self.assertEqual(cleanup(self.root)['deletedFiles'], 1)  # Only exact transport copy.
        self.assertTrue(self.pdf.exists())
        self.assertTrue(self.txt.exists())

    def test_unverified_and_pending_runs_protect_shared_paper_versions(self):
        pending = self.automation / 'progress/metadata-pending-2026-10-02.json'
        atomic_json(pending, {'status': 'pending', 'remaining': ['2609.00001']})
        self.assertEqual(cleanup(self.root)['deletedFiles'], 0)
        atomic_json(pending, {'status': 'resolved', 'remaining': []})
        receipt = self.automation / 'daily-outcomes/2026-09-28.json'
        atomic_json(receipt, {'status': 'running', 'announcementDate': self.feed['date']})
        self.assertEqual(cleanup(self.root)['deletedFiles'], 0)
        atomic_json(receipt, {'status': 'success'})
        self.assertEqual(cleanup(self.root)['deletedFiles'], 3)

    def test_historical_partial_october_second_does_not_block_completed_day(self):
        historical = self.root / '.automation/ai-audit/2026-10-02/published.json'
        partial = copy.deepcopy(self.feed)
        partial['date'] = '2026-10-02'
        partial['entries'][0]['arxivId'] = '2610.00002'
        partial['coverage']['complete'] = False
        partial['contentHash'] = digest({**partial, 'contentHash': ''})
        atomic_json(historical, partial)
        state = json.loads(self.outbox.read_text())
        state['days']['2026-10-02'] = {'snapshotPath': str(historical), 'status': 'verified',
                                      'revision': 1, 'contentHash': partial['contentHash']}
        atomic_json(self.outbox, state)
        pdf = historical.parent / '2610.00002v1.pdf'
        pdf.write_bytes(self.body)
        report = cleanup(self.root)
        self.assertEqual(report['deletedFiles'], 3)
        self.assertIn('2026-10-02', report['skippedDays'])
        self.assertTrue(pdf.exists())

    def test_symlink_source_and_transport_copy_are_never_deleted(self):
        outside = self.root / 'outside.pdf'
        outside.write_bytes(self.body)
        self.pdf.unlink()
        self.pdf.symlink_to(outside)
        self.response.unlink()
        self.response.symlink_to(outside)
        report = cleanup(self.root)
        self.assertEqual(report['deletedFiles'], 0)
        self.assertTrue(outside.exists())
        self.assertTrue(self.txt.exists())

    def test_missing_or_outside_evidence_fails_closed(self):
        state = json.loads(self.outbox.read_text())
        state['days'][self.feed['date']]['snapshotPath'] = str(self.root / 'outside.json')
        atomic_json(self.root / 'outside.json', self.feed)
        atomic_json(self.outbox, state)
        report = cleanup(self.root)
        self.assertEqual(report['status'], 'failed')
        self.assertEqual(report['deletedFiles'], 0)

    def test_symlink_registry_and_dangling_pdf_preserve_sources(self):
        self.pdf.unlink()
        self.pdf.symlink_to(self.root / 'missing.pdf')
        self.assertEqual(cleanup(self.root)['deletedFiles'], 1)
        self.assertTrue(self.txt.exists())
        self.pdf.unlink()
        self.pdf.write_bytes(self.body)
        registry = self.automation / 'progress/retained-ai-reviews.json'
        registry.unlink()
        outside = self.root / 'outside-registry.json'
        outside.write_text('{}')
        registry.symlink_to(outside)
        report = cleanup(self.root)
        self.assertEqual(report['status'], 'failed')
        self.assertEqual(report['deletedFiles'], 0)
        self.assertTrue(self.pdf.exists())
        self.assertEqual(outside.read_text(), '{}')

    def test_unlink_failure_is_logged_and_retried_without_affecting_publication(self):
        unlink = Path.unlink
        def fail_pdf(path, *args, **kwargs):
            if path == self.pdf:
                raise PermissionError('synthetic failure')
            return unlink(path, *args, **kwargs)
        with patch.object(Path, 'unlink', fail_pdf):
            report = cleanup(self.root)
        self.assertEqual(report['status'], 'failed')
        self.assertTrue(self.pdf.exists())
        self.assertEqual(json.loads(self.outbox.read_text())['days'][self.feed['date']]['status'], 'verified')
        self.assertEqual(cleanup(self.root)['deletedFiles'], 1)
        with patch('cleanup_automation_cache.cleanup', side_effect=PermissionError), patch('builtins.print'):
            after_verification(self.root)  # Cleanup never aborts publication finalization.

    def test_reader_and_transport_locks_block_cleanup(self):
        context = multiprocessing.get_context('spawn')
        for kind in ('source', 'transport'):
            with self.subTest(kind=kind):
                self.pdf.write_bytes(self.body)
                self.txt.write_text('Text')
                ready, release = context.Event(), context.Event()
                process = context.Process(target=hold_cache_lock, args=(str(self.cache), kind, ready, release))
                process.start()
                results = []
                thread = threading.Thread(target=lambda: results.append(cleanup(self.root)))
                try:
                    self.assertTrue(ready.wait(10))
                    thread.start()
                    time.sleep(0.1)
                    self.assertTrue(self.pdf.exists())
                    self.assertFalse(results)
                finally:
                    release.set()
                    thread.join(10)
                    process.join(10)
                self.assertEqual(process.exitcode, 0)
                self.assertFalse(thread.is_alive())
                self.assertFalse(self.pdf.exists())

    def test_cleanup_reuse_preserves_disclosure_and_current_mathematical_analysis(self):
        cleanup(self.root)
        client = Mock(root=self.cache, run_id='new-run')
        out = self.automation / 'ai-audit/new-run'
        out.mkdir()
        current = copy.deepcopy(self.entry)
        current['analysis']['workSummary'] = 'New mathematical summary'
        record = audit_entry(current, out, client, allow_network=False)
        client.request.assert_not_called()
        self.assertEqual(record['status'], 'full_text_searched')
        candidate = build_candidate({'date': self.feed['date'], 'entries': [current]}, [record], {}, 'new-run', 'now')
        analysis = candidate['entries'][0]['analysis']
        self.assertEqual(analysis['workSummary'], 'New mathematical summary')
        self.assertEqual(analysis['aiStatus'], 'explicit')
        self.assertEqual(analysis['aiUsage'], ['writing'])
        self.assertEqual(analysis['aiReview'], self.entry['analysis']['aiReview'])
        self.assertFalse((out / '2609.00001v1.pdf').exists())

    def test_changed_version_metadata_rules_or_hash_cannot_reuse_purged_review(self):
        cleanup(self.root)
        for change in ('version', 'metadata', 'rules', 'hash'):
            with self.subTest(change=change):
                entry = copy.deepcopy(self.entry)
                if change == 'version': entry['metadata']['version'] = 2
                elif change == 'metadata': entry['metadata']['comment'] = 'Changed'
                elif change == 'hash': entry['analysis']['aiReview']['contentHash'] = 'b' * 64
                out = self.automation / 'ai-audit' / change
                out.mkdir()
                client = Mock(root=self.cache, run_id=change)
                client.request.side_effect = Deferred('synthetic cooldown')
                with patch('review_evidence.RULE_VERSION', 'new-rules' if change == 'rules' else RULE_VERSION):
                    with self.assertRaises(Deferred):
                        audit_entry(entry, out, client)
                client.request.assert_called_once()


if __name__ == '__main__':
    unittest.main()
