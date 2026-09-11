import unittest

from arxiv_listing import parse_listing
from arxiv_listing import fetch_listing
from unittest.mock import patch
from datetime import datetime
from zoneinfo import ZoneInfo


LISTING_HTML = """
<h3>New submissions (showing 2 of 2 entries)</h3>
<dl>
  <dt><a href = "/abs/2609.00001" title="Abstract">arXiv:2609.00001</a></dt>
  <dt><a href="/abs/2609.00002v1" title="Abstract">arXiv:2609.00002</a></dt>
</dl>
<h3>Cross submissions (showing 1 of 1 entries)</h3>
<dl><dt><a href="/abs/2401.12345v3" title="Abstract">arXiv:2401.12345</a></dt></dl>
<h3>Replacement submissions (showing 1 of 1 entries)</h3>
<dl><dt><a href="/abs/2608.99999v2" title="Abstract">arXiv:2608.99999</a></dt></dl>
"""


class ListingParserTests(unittest.TestCase):
    def test_new_is_authoritative_today_and_never_compares_catchup(self):
        today = datetime.now(ZoneInfo('Asia/Shanghai')).date()
        document = 'Showing new listings for ' + today.strftime('%A, %d %B %Y') + '\n' + LISTING_HTML
        with patch('arxiv_listing._download', return_value=document) as read:
            events, source = fetch_listing('math.MG', today.isoformat())
        self.assertEqual(events.publication_count, 3)
        self.assertTrue(source.endswith('/new'))
        self.assertEqual(read.call_count, 1)

    def test_zero_is_not_parser_failure(self):
        with patch('arxiv_listing._download', return_value='<h3>New submissions (showing 0 of 0 entries)</h3>'):
            self.assertEqual(fetch_listing('math.DG', '2020-01-01')[0].publication_count, 0)
        for document in ('<h1>Service unavailable</h1>', '<h3>New submissions</h3>'):
            with patch('arxiv_listing._download', return_value=document):
                with self.assertRaises(RuntimeError): fetch_listing('math.DG', '2020-01-01')

    def test_truncated_page_rejected(self):
        with self.assertRaises(RuntimeError):
            parse_listing('<h3>New submissions (showing 1 of 20 entries)</h3><a href="/abs/2609.00001">paper</a>')

    def test_new_and_cross_list_events_are_separate_from_replacements(self):
        result = parse_listing(LISTING_HTML)
        self.assertEqual(result.new_ids, ("2609.00001", "2609.00002"))
        self.assertEqual(result.cross_list_ids, ("2401.12345",))
        self.assertEqual(result.replacement_ids, ("2608.99999",))
        self.assertEqual(result.publication_count, 3)

    def test_dg_reference_day_counts_new_plus_cross_lists(self):
        new_items = "".join(
            f'<dt><a href="/abs/2609.{index:05d}">arXiv</a></dt>'
            for index in range(1, 27)
        )
        cross_items = "".join(
            f'<dt><a href="/abs/2508.{index:05d}">arXiv</a></dt>'
            for index in range(1, 12)
        )
        result = parse_listing(
            f"<h3>New submissions</h3><dl>{new_items}</dl>"
            f"<h3>Cross submissions</h3><dl>{cross_items}</dl>"
            '<h3>Replacement submissions</h3><dl>'
            '<dt><a href="/abs/2608.99999v2">arXiv</a></dt></dl>'
        )
        self.assertEqual(len(result.new_ids), 26)
        self.assertEqual(len(result.cross_list_ids), 11)
        self.assertEqual(result.publication_count, 37)


if __name__ == "__main__":
    unittest.main()
