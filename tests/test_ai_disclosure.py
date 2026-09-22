import unittest
import tempfile
from pathlib import Path
from unittest.mock import Mock, patch
from ai_disclosure_audit import search_pages, build_candidate, audit_entry, RULE_VERSION


class DisclosureSearchTests(unittest.TestCase):
    def test_acknowledgement_on_final_page_is_found(self):
        result = search_pages(['A mathematical introduction.', 'Proof of the theorem.',
            'Acknowledgements. We used ChatGPT to simplify the proof of Lemma 2.'])
        self.assertEqual(result[0]['page'], 3)
        self.assertIn('simplify the proof', result[0]['text'])

    def test_negation_and_research_topic_are_candidates_not_verdicts(self):
        for value in ['Proof found without AI.', 'We study artificial intelligence as a mathematical subject.',
                      'We thank Claude for his comments.']:
            self.assertTrue(search_pages([value]))
            self.assertNotIn('aiStatus', search_pages([value])[0])

    def test_line_breaks_and_language_model_disclosures(self):
        self.assertTrue(search_pages(['We used Chat\nGPT for copy editing.']))
        self.assertTrue(search_pages(['A large lan-\nguage model assisted the experiments.']))

    def test_formal_proof_software_alone_is_not_disclosure(self):
        self.assertEqual(search_pages(['The proof was verified in Lean and numerical examples computed in Mathematica.']), [])

    def test_math_lowercase_variable_and_ligatures(self):
        self.assertFalse(search_pages(['The coefficient ai is positive.']))
        self.assertTrue(search_pages(['We used artiﬁcial intelligence for editing.']))
        self.assertTrue(search_pages(['We used Codex for verification scripts.']))

    def test_rule_upgrade_reuses_exact_local_pdf(self):
        with tempfile.TemporaryDirectory() as directory:
            out = Path(directory)
            (out / '2609.12345v1.pdf').write_bytes(b'%PDF-cached')
            client = Mock(run_id="test-ai-cache")
            with patch('ai_disclosure_audit.extract_pdf', return_value=(['We used ChatGPT for proofreading.'], True, True)):
                first = audit_entry({'arxivId': '2609.12345', 'metadata': {'version': 1}}, out, client)
                second = audit_entry({'arxivId': '2609.12345', 'metadata': {'version': 1}}, out, client)
            client.request.assert_not_called()
            self.assertEqual(first, second)
            self.assertEqual(first['ruleVersion'], RULE_VERSION)


class ReviewApplicationTests(unittest.TestCase):
    def setUp(self):
        self.feed = {'date': '2026-09-15', 'entries': [{'arxivId': '2609.12345',
            'metadata': {'version': 1, 'abstract': 'Original'}, 'analysisBasis': {'version': 1, 'abstract': 'Original'},
            'analysis': {'aiStatus': 'no_disclosure_observed', 'analysisDepth': 'abstract', 'limitations': 'Unverified proof', 'priorityScore': 88}}]}
        self.record = {'arxivId': '2609.12345', 'version': 1, 'extractionComplete': True,
            'contentHash': 'a' * 64, 'checkedAt': '2026-09-15T09:00:00Z', 'pages': 12,
            'sourceUrl': 'https://arxiv.org/pdf/2609.12345v1', 'matches': [{'page': 12, 'text': 'AI used'}], 'metadataMatches': []}

    def candidate(self, decision=None):
        return build_candidate(self.feed, [self.record], {'2609.12345': decision} if decision else {}, 'manual-ai-audit', '2026-09-15T09:00:00Z')['entries'][0]

    def test_keywords_without_review_stay_pending(self):
        self.assertEqual(self.candidate()['analysis']['aiReview']['status'], 'needs_review')
        self.assertEqual(self.candidate()['analysis']['aiStatus'], 'no_disclosure_observed')

    def test_review_requires_exact_document(self):
        with self.assertRaises(ValueError):
            self.candidate({'contentHash': 'b'*64, 'version': 1, 'status': 'explicit', 'reason': 'Editing', 'location': 'p12'})

    def test_positive_evidence_does_not_upgrade_mathematical_reading(self):
        entry = self.candidate({'contentHash': 'a'*64, 'version': 1, 'status': 'explicit', 'reason': 'Editing', 'location': 'p12'})
        self.assertEqual(entry['analysis']['aiStatus'], 'explicit')
        self.assertEqual(entry['analysis']['analysisDepth'], 'abstract')
        self.assertEqual(entry['analysis']['priorityScore'], 88)
        self.assertEqual(entry['analysisBasis'], self.feed['entries'][0]['analysisBasis'])

    def test_usage_comes_only_from_reviewed_decision(self):
        decision = {'contentHash': 'a'*64, 'version': 1, 'status': 'explicit', 'reason': 'Search only; not writing or proofs', 'location': 'p12', 'usage': ['literature']}
        self.assertEqual(self.candidate(decision)['analysis']['aiUsage'], ['literature'])
        decision['usage'] = ['guessed']
        with self.assertRaises(ValueError):
            self.candidate(decision)

    def test_incomplete_extraction_cannot_be_cleared_as_full_search(self):
        self.record['extractionComplete'] = False
        entry = self.candidate({'contentHash': 'a'*64, 'version': 1, 'status': 'no_disclosure_observed', 'reason': 'Mathematical variable'})
        self.assertEqual(entry['analysis']['aiReview']['status'], 'needs_review')

    def test_empty_search_is_not_a_human_only_claim(self):
        self.record['matches'] = []
        self.assertEqual(self.candidate()['analysis']['aiReview']['status'], 'full_text_searched')
        self.assertEqual(self.candidate()['analysis']['aiStatus'], 'no_disclosure_observed')

    def test_visual_clearance_requires_every_short_page_and_exact_hash(self):
        self.record.update(extractionComplete=False, pageCountMatches=True, shortTextPages=[2, 4])
        decision = {'contentHash': 'a'*64, 'version': 1, 'status': 'no_disclosure_observed', 'reason': 'Verified blank pages', 'visuallyCheckedPages': [2]}
        self.assertEqual(self.candidate(decision)['analysis']['aiReview']['status'], 'needs_review')
        decision['visuallyCheckedPages'] = [2, 4]
        self.assertEqual(self.candidate(decision)['analysis']['aiReview']['status'], 'full_text_searched')
        self.record['pageCountMatches'] = False
        self.assertEqual(self.candidate(decision)['analysis']['aiReview']['status'], 'needs_review')

class DisclosureResumeRegressionTests(unittest.TestCase):
    def test_named_research_and_editing_tools_are_review_candidates(self):
        for sentence in ['We used Odin to discover the metric and its proof.',
                         'We used Grammarly to improve the manuscript language.',
                         'DeepL was used to translate the introduction.',
                         'An automated research agent suggested the construction.',
                         '本文使用生成式人工智慧协助翻译。']:
            with self.subTest(sentence=sentence):
                self.assertTrue(search_pages([sentence]))

    def test_cached_search_rechecks_changed_metadata_without_download(self):
        with tempfile.TemporaryDirectory() as directory:
            out = Path(directory)
            (out / '2609.12345v1.pdf').write_bytes(b'%PDF-cached')
            client = Mock(run_id="test-ai-cache")
            entry = {'arxivId': '2609.12345', 'metadata': {'version': 1, 'abstract': 'A theorem'}}
            with patch('ai_disclosure_audit.extract_pdf', return_value=(['A mathematical theorem with its proof.'], True, True)):
                audit_entry(entry, out, client)
                entry['metadata']['comment'] = 'We used ChatGPT for proofreading.'
                updated = audit_entry(entry, out, client)
            client.request.assert_not_called()
            self.assertTrue(updated['metadataMatches'])
            self.assertEqual(updated['status'], 'needs_review')

    def test_decision_cannot_review_another_paper_with_same_hash(self):
        feed = {'date': '2026-09-15', 'entries': [{'arxivId': '2609.12345',
            'metadata': {'version': 1, 'abstract': 'Original'}, 'analysisBasis': {'version': 1, 'abstract': 'Original'},
            'analysis': {'aiStatus': 'no_disclosure_observed', 'limitations': 'Not read'}}]}
        record = {'arxivId': '2609.12345', 'version': 1, 'extractionComplete': True,
            'contentHash': 'a'*64, 'checkedAt': '2026-09-15T09:00:00Z', 'pages': 1,
            'sourceUrl': 'https://arxiv.org/pdf/2609.99999v1', 'matches': [], 'metadataMatches': []}
        with self.assertRaises(ValueError):
            build_candidate(feed, [record], {}, 'run-test', '2026-09-15T09:00:00Z')

class AuditCooldownRegressionTests(unittest.TestCase):
    def test_cooldown_still_processes_later_cached_papers(self):
        import ai_disclosure_audit as audit
        with tempfile.TemporaryDirectory() as directory:
            out = Path(directory)
            (out / '2609.22222v1.pdf').write_bytes(b'%PDF-cached')
            client = Mock(run_id='same-scheduled-slot')
            client.request.side_effect = audit.Deferred('Retry-After exceeds budget')
            feed = {'date': '2026-09-15', 'entries': [
                {'arxivId': '2609.11111', 'metadata': {'version': 1}},
                {'arxivId': '2609.22222', 'metadata': {'version': 1}}]}
            with patch.object(audit, 'extract_pdf', return_value=(['We used ChatGPT for proofreading.'], True, True)):
                with patch('sys.argv', ['audit', '--feed', str(out/'feed.json'), '--out', str(out), '--run-id', client.run_id]):
                    (out/'feed.json').write_text(__import__('json').dumps(feed))
                    with patch.object(audit, 'ArxivClient', return_value=client):
                        with self.assertRaises(SystemExit):
                            audit.main()
            result = __import__('json').loads((out/'progress.json').read_text())
            self.assertEqual(result['remaining'], ['2609.11111'])
            self.assertEqual(next(r for r in result['results'] if r['arxivId']=='2609.22222')['status'], 'needs_review')
            self.assertEqual(client.request.call_count, 1)
