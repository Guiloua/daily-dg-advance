import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from ensure_pages import ensure
from publish_payload import batch_is_visible
from verify_production import expected_from_manifest


class ResumeTests(unittest.TestCase):
    def test_same_sha_retries_failed_dispatch_without_content_commit(self):
        sha = 'a' * 40
        calls = []
        def api(*args):
            calls.append(args)
            if '--method' in args: return {}
            dispatched = any('--method' in item for item in calls)
            return {'workflow_runs': [{'display_title': f'Geometry Pages {sha}', 'id': 2 if dispatched else 1,
                     'status': 'completed', 'conclusion': 'success' if dispatched else 'failure'}]}
        with tempfile.TemporaryDirectory() as directory, patch('ensure_pages.ROOT', Path(directory)), patch('ensure_pages.checkpoint'):
            ensure(sha, api=api, sleep=lambda _: None)
        self.assertEqual(sum('--method' in item for item in calls), 1)

    def test_missing_paper_or_different_analysis_not_confirmed_by_count(self):
        report = {'arxivId': '2609.00001', 'version': 1, 'entryKind': 'new', 'workSummary': 'actual'}
        batch = {'run': {'completedAt': '2026-09-11T02:00:00Z', 'expectedCount': 1, 'sourceCursor': 'cursor'},
                 'announcementDay': {'date': '2026-09-11'}, 'reports': [report]}
        feed = {'date': '2026-09-11', 'lastUpdated': batch['run']['completedAt'],
                'coverage': {'complete': True, 'publishedCount': 1, 'expectedCount': 1}, 'reports': [report.copy()]}
        self.assertTrue(batch_is_visible(batch, feed, {'sourceCursor': 'cursor'}))
        feed['reports'][0]['workSummary'] = 'other'
        self.assertFalse(batch_is_visible(batch, feed, {'sourceCursor': 'cursor'}))

    def test_afternoon_cannot_reuse_morning_manifest(self):
        manifest = {'runId': 'am', 'scheduledFor': '2026-09-11T10:30:00+08:00', 'verifiedAt': '2026-09-11T10:31:00+08:00'}
        with self.assertRaises(RuntimeError):
            expected_from_manifest(manifest, '2026-09-11T14:30:00+08:00')
