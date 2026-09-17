import copy
import json
import multiprocessing
import tempfile
import time
import unittest
from pathlib import Path
from unittest.mock import patch
import progressive_daily as daily
from test_progressive import HTML
from metadata_resume import enrich_missing, reuse_entry
from arxiv_client import Deferred


def recover_process(directory, queue):
    case = MetadataCacheTests()
    def fetch(ids, **kwargs):
        queue.put(ids)
        time.sleep(0.1)
        return [case.row(i) for i in ids]
    enrich_missing({'2609.00001': case.entry('2609.00001')}, directory, fetch)


class ResumeCallsiteTests(unittest.TestCase):
    def test_enrich_does_not_request_already_complete_entries(self):
        # Exercise the real --enrich path with a complete official-listing record.
        snapshot, entries = daily.parse_category(HTML, 'mathDg', 'https://arxiv.org/list/math.DG/new', '2026-09-14T00:00:00Z')
        entries[0]['metadata'].update(submittedAt='2026-09-01T00:00:00Z', updatedAt='2026-09-14T00:00:00Z')
        with tempfile.TemporaryDirectory() as directory:
            argv = ['progressive_daily.py', '--run-id', 'resume-test', '--scheduled-for', '2026-09-14T14:30:00+08:00', '--out', directory, '--enrich']
            with patch.object(daily.sys, 'argv', argv), patch.object(daily, 'ROOT', Path(directory)), patch.object(daily, 'request', return_value=b'listing'), patch.object(daily, 'parse_category', side_effect=lambda *a: (copy.deepcopy(snapshot), copy.deepcopy(entries))), patch.object(daily, 'fetch_ids', return_value=[]) as fetch:
                daily.main()
            fetch.assert_not_called()

    def test_resume_candidate_never_reads_lists_or_discards_analysis(self):
        snapshot, entries = daily.parse_category(HTML, 'mathDg', 'https://arxiv.org/list/math.DG/new', '2026-09-14T00:00:00Z')
        entry = entries[0]
        entry.update(analysis={'aiStatus': 'explicit', 'aiReview': {'contentHash': 'checked-pdf'}, 'analysisDepth': 'full_text_sections'}, analysisBasis={'abstract': entry['metadata']['abstract'], 'version': 2})
        row = {**entry['metadata'], 'arxivId': entry['arxivId'], 'submittedAt': '2026-09-01T00:00:00Z', 'updatedAt': '2026-09-14T00:00:00Z', 'abstract': 'Atom formatting differs'}
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            seed = root / 'seed.json'
            seed.write_text(json.dumps({'date': snapshot['date'], 'categories': [snapshot], 'entries': entries}))
            argv = ['progressive_daily.py', '--run-id', 'resume-test', '--scheduled-for', '2026-09-14T14:30:00+08:00', '--out', str(root / 'run'), '--enrich', '--resume-from', str(seed)]
            with patch.object(daily.sys, 'argv', argv), patch.object(daily, 'ROOT', root), patch.object(daily, 'request') as listing, patch.object(daily, 'fetch_ids', return_value=[row]) as fetch:
                daily.main()
                listing.assert_not_called()
                fetch.assert_called_once_with([entry['arxivId']], expected_versions={entry['arxivId']: 2})
            actual = json.loads((root / 'run/candidate-2026-09-14.json').read_text())['entries'][0]
            self.assertEqual(actual['analysis'], entry['analysis'])
            self.assertEqual(actual['analysisBasis'], entry['analysisBasis'])
            self.assertEqual(actual['metadata']['abstract'], entry['metadata']['abstract'])
            self.assertEqual(actual['metadata']['submittedAt'], row['submittedAt'])


class MetadataCacheTests(unittest.TestCase):
    def entry(self, identifier, complete=False, version=1):
        metadata = {'title': 'Title', 'abstract': 'Checked abstract', 'comment': 'Checked comment', 'authors': ['Author'], 'version': version, 'categories': ['math.DG'], 'primaryCategory': 'math.DG'}
        if complete:
            metadata.update(submittedAt='2026-09-01T00:00:00Z', updatedAt='2026-09-02T00:00:00Z')
        return {'arxivId': identifier, 'metadata': metadata, 'analysis': {'aiStatus': 'explicit', 'aiEvidence': 'Reviewed disclosure', 'aiReview': {'contentHash': 'pdf-sha'}}, 'analysisBasis': {'abstract': metadata['abstract'], 'version': version}, 'source': {'contentHash': 'fresh-listing'}}

    def row(self, identifier, version=1):
        return {'arxivId': identifier, **self.entry(identifier, True, version)['metadata']}

    def test_only_missing_ids_and_fill_only_missing_fields(self):
        entries = {i: self.entry(i, i == '2609.00001') for i in ('2609.00001', '2609.00002')}
        original = copy.deepcopy(entries)
        def fetch(ids, **kwargs):
            self.assertEqual(ids, ['2609.00002'])
            return [{**self.row(ids[0]), 'abstract': 'Other whitespace/LaTeX', 'comment': 'Different comment'}]
        with tempfile.TemporaryDirectory() as cache:
            enrich_missing(entries, cache, fetch)
        self.assertEqual(entries['2609.00001'], original['2609.00001'])
        for key in ('analysis', 'analysisBasis'):
            self.assertEqual(entries['2609.00002'][key], original['2609.00002'][key])
        self.assertEqual(entries['2609.00002']['metadata']['abstract'], 'Checked abstract')

    def test_successful_batch_survives_failure_and_new_run(self):
        original = {i: self.entry(i) for i in ('2609.00001', '2609.00002', '2609.00003')}
        calls = []
        def interrupted(ids, **kwargs):
            calls.append(ids)
            if len(calls) == 2:
                raise Deferred('429')
            return [self.row(i) for i in ids]
        with tempfile.TemporaryDirectory() as cache:
            with self.assertRaises(Deferred):
                enrich_missing(copy.deepcopy(original), cache, interrupted, batch_size=2)
            # Re-start even from the old input: successful rows are persistent.
            calls.clear()
            def recovered(ids, **kwargs):
                calls.append(ids)
                return [self.row(i) for i in ids]
            entries = copy.deepcopy(original)
            enrich_missing(entries, cache, recovered, batch_size=2)
            self.assertEqual(calls, [['2609.00003']])
            calls.clear()
            enrich_missing(entries, cache, recovered)
            self.assertEqual(calls, [])

    def test_changed_version_does_not_reuse_cached_metadata(self):
        with tempfile.TemporaryDirectory() as cache:
            enrich_missing({'2609.00001': self.entry('2609.00001')}, cache, lambda ids, **kw: [self.row(ids[0])])
            changed = self.entry('2609.00001', version=2)
            with self.assertRaises(ValueError):
                enrich_missing({'2609.00001': changed}, cache, lambda ids, **kw: [self.row(ids[0])])
            self.assertNotIn('submittedAt', changed['metadata'])

    def test_reuse_preserves_ai_and_full_text_only_for_same_basis(self):
        prior = self.entry('2609.00001', True)
        fresh = self.entry('2609.00001')
        fresh.pop('analysis');fresh.pop('analysisBasis')
        self.assertEqual(reuse_entry(fresh, prior), prior)
        fresh['metadata']['version'] = 2
        self.assertNotIn('analysis', reuse_entry(fresh, prior))
        fresh['metadata']['version'] = 1
        fresh['metadata']['abstract'] = 'Changed abstract'
        self.assertNotIn('analysis', reuse_entry(fresh, prior))

    def test_processes_recheck_cache_after_acquiring_shared_lock(self):
        context = multiprocessing.get_context('spawn')
        queue = context.Queue()
        with tempfile.TemporaryDirectory() as cache:
            processes = [context.Process(target=recover_process, args=(cache, queue)) for _ in range(2)]
            for process in processes:
                process.start()
            for process in processes:
                process.join(10)
                self.assertEqual(process.exitcode, 0)
            self.assertEqual(queue.get(timeout=2), ['2609.00001'])
            self.assertTrue(queue.empty(), 'only one process may request missing metadata')

    def test_requested_version_is_used_in_atom_query(self):
        import arxiv_fetch
        from urllib.parse import parse_qs, urlsplit
        xml = b'''<feed xmlns="http://www.w3.org/2005/Atom" xmlns:x="http://arxiv.org/schemas/atom"><entry><id>http://arxiv.org/abs/2609.00001v2</id><title>Title</title><summary>Abstract</summary><published>2026-09-01T00:00:00Z</published><updated>2026-09-02T00:00:00Z</updated><author><name>Author</name></author><category term="math.DG"/><x:primary_category term="math.DG"/></entry></feed>'''
        with patch.object(arxiv_fetch, 'request', return_value=xml) as request:
            rows = arxiv_fetch.fetch_ids(['2609.00001'], expected_versions={'2609.00001': 2})
        self.assertEqual(parse_qs(urlsplit(request.call_args.args[0]).query)['id_list'], ['2609.00001v2'])
        self.assertEqual(rows[0]['version'], 2)


if __name__ == '__main__':
    unittest.main()
