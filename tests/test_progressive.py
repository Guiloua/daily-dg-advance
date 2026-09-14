import json
import sqlite3
import tempfile
import unittest
from pathlib import Path
from progressive_daily import parse_category, candidate
from progressive_outcome import notification, verify
from progressive_publish import digest, publish

HTML = '''Showing new listings for Monday, 14 September 2026
<h3>New submissions (showing 1 of 1 entries)</h3><dl>
<dt><a href="/abs/2609.00001">arXiv</a><a href="https://arxiv.org/html/2609.00001v2">HTML</a></dt>
<dd><div class='list-title mathjax'><span>Title:</span> A &amp; B</div><div class='list-authors'><a>One Author</a><a>Two Author</a></div><div class='list-subjects'><span class="primary-subject">Differential Geometry (math.DG)</span>; Metric Geometry (math.MG)</div><p class='mathjax'>A mathematical abstract.</p></dd></dl>'''

class ProgressiveTests(unittest.TestCase):
    def parse(self, document=HTML):
        return parse_category(document, 'mathDg', 'https://arxiv.org/list/math.DG/new', '2026-09-14T03:00:00Z')

    def test_listing_extracts_known_fields_without_fabricating_time(self):
        snapshot, entries = self.parse()
        self.assertTrue(snapshot['complete'])
        self.assertEqual(entries[0]['metadata'], {'title':'A & B','authors':['One Author','Two Author'],'abstract':'A mathematical abstract.','categories':['math.DG','math.MG'],'primaryCategory':'math.DG','version':2})

    def test_partial_listing_is_not_a_full_count(self):
        snapshot, entries = self.parse(HTML.replace('1 of 1', '1 of 20'))
        self.assertFalse(snapshot['complete']);self.assertEqual(len(entries),1)

    def test_unknown_and_zero_are_different(self):
        with self.assertRaises(ValueError):self.parse('Service unavailable')
        with self.assertRaises(ValueError):self.parse('Showing new listings for Monday, 14 September 2026\n<h3>New submissions</h3>')
        snapshot, entries=self.parse('Showing new listings for Monday, 14 September 2026\n<h3>New submissions (showing 0 of 0 entries)</h3>')
        self.assertTrue(snapshot['complete']);self.assertEqual(entries,[])

    def test_separate_dates_and_replacements(self):
        a,e=self.parse();b={**a,'date':'2026-09-11','category':'mathMg'}
        result=candidate({'runId':'run-test','scheduledFor':'now'},[a,b],{v['arxivId']:v for v in e},a['date'])
        self.assertEqual(len(result['categories']),1)

    def test_partial_notification_deduplicated(self):
        missing={'metadata':['2609.00001']}
        notify,key=notification(None,'published_partial',missing);self.assertTrue(notify)
        previous={'status':'published_partial','missingKey':key}
        self.assertFalse(notification(previous,'published_partial',missing)[0])
        self.assertTrue(notification(previous,'success',{})[0])
        self.assertTrue(notification(previous,'failed',{})[0])

    def test_mirror_requires_exact_snapshot(self):
        feed={'schemaVersion':2,'entries':[],'coverage':{},'contentHash':'one'}
        verify(feed,feed,{'status':'verified','contentHash':'one'})
        with self.assertRaises(RuntimeError):verify(feed,feed,{'status':'pending','contentHash':'one'})

    def test_database_guard_rolls_back_all_writes(self):
        connection=sqlite3.connect(':memory:')
        root=Path(__file__).resolve().parents[1]
        for migration in sorted((root/'drizzle').glob('*.sql')):connection.executescript(migration.read_text())
        connection.execute("INSERT INTO publication_days VALUES('2026-09-14',1,'original')");connection.commit()
        def transaction(name,base):
            with connection:
                connection.execute("INSERT INTO publication_receipts VALUES(?,?,?,2,'next',CASE WHEN COALESCE((SELECT revision FROM publication_days WHERE date=?),0)=? THEN 1 ELSE 0 END)",(name,'hash','2026-09-14','2026-09-14',base))
                connection.execute("UPDATE publication_days SET revision=2,snapshot_json='next'")
        with self.assertRaises(sqlite3.IntegrityError):transaction('stale',0)
        self.assertEqual(connection.execute('SELECT snapshot_json FROM publication_days').fetchone()[0],'original')
        self.assertEqual(connection.execute('SELECT count(*) FROM publication_receipts').fetchone()[0],0)
        transaction('good',1)
        with self.assertRaises(sqlite3.IntegrityError):transaction('race',1)
        self.assertEqual(connection.execute('SELECT count(*) FROM publication_receipts').fetchone()[0],1)

if __name__=='__main__':unittest.main()

class PublishRecoveryTests(unittest.TestCase):
    def test_response_loss_uses_receipt_and_no_second_write(self):
        from unittest.mock import patch
        import progressive_publish as module
        saved = {}
        calls = []
        feed = {'schemaVersion': 2, 'date': '2026-09-14', 'revision': 1, 'contentHash': '', 'entries': [], 'coverage': {}}
        feed['contentHash'] = digest(feed)
        def api(path, body=None, private=False):
            if body:
                calls.append(body['publicationId']);saved['value']=feed
                raise TimeoutError('response lost')
            return saved.get('value', {'revision': 0})
        def receipt(_batch):return saved.get('value')
        with tempfile.TemporaryDirectory() as directory, patch.object(module, 'ROOT', Path(directory)):
            candidate = {'date': '2026-09-14', 'runId': 'same-run', 'scheduledFor': '2026-09-14T00:00:00Z', 'categories': [], 'entries': []}
            result = publish(candidate, Path(directory)/'run', api=api, verify=receipt)
            replay = publish(candidate, Path(directory)/'run', api=api, verify=receipt)
            self.assertEqual(result, replay);self.assertEqual(len(calls), 1)
            outbox=json.loads((Path(directory)/'.automation/progress/mirror-outbox.json').read_text())
            self.assertEqual(outbox['days']['2026-09-14']['status'],'pending')
