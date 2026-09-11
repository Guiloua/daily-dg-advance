import json
import tempfile
import unittest
import urllib.error
import multiprocessing
import time
from email.utils import formatdate
from pathlib import Path
from arxiv_client import ArxivClient, Deferred, retry_after

URL = 'https://export.arxiv.org/api/query?id_list=2609.00001'


class Response:
    def __enter__(self): return self
    def __exit__(self, *args): pass
    def read(self): return b'valid-response'


def process_read(root, run, queue):
    def opener(*a, **k):
        queue.put(time.time())
        time.sleep(0.05)
        return Response()
    ArxivClient(root, run, opener=opener).request(URL)


class ClientTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.now = 1000
        self.waits = []
        self.calls = []

    def sleep(self, seconds):
        self.waits.append(seconds)
        self.now += seconds

    def client(self, opener, run='slot-am'):
        return ArxivClient(self.directory.name, run, clock=lambda: self.now,
                           sleep=self.sleep, opener=opener, jitter=lambda *_: 0)

    def test_retry_after_seconds_and_dates(self):
        self.assertEqual(retry_after('120', 1000), 120)
        self.assertEqual(retry_after(formatdate(1120, usegmt=True), 1000), 120)
        self.assertIsNone(retry_after('invalid', 1000))

    def test_honors_server_cooldown_regression(self):
        def opener(*_args, **_kwargs):
            self.calls.append(self.now)
            if len(self.calls) == 1:
                raise urllib.error.HTTPError(URL, 429, 'rate limit', {'Retry-After': '120'}, None)
            return Response()
        self.assertEqual(self.client(opener).request(URL), b'valid-response')
        self.assertEqual(self.calls, [1000, 1120])
        self.assertTrue(all(wait <= 30 for wait in self.waits))

    def test_cooldown_survives_process_and_budget_defers(self):
        def opener(*a, **k):
            self.calls.append(self.now)
            raise urllib.error.HTTPError(URL, 429, 'rate limit', {'Retry-After': '1800'}, None)
        with self.assertRaises(Deferred): self.client(opener).request(URL)
        with self.assertRaises(Deferred): self.client(opener, 'slot-pm').request(URL)
        self.assertEqual(len(self.calls), 1)
        self.assertEqual(json.loads((Path(self.directory.name) / 'state.json').read_text())['nextAllowedAt'], 2800)

    def test_success_cached_across_restart_not_across_slot(self):
        def opener(*a, **k):
            self.calls.append(self.now)
            return Response()
        self.client(opener).request(URL)
        self.client(opener).request(URL)
        self.assertEqual(len(self.calls), 1)
        self.client(opener, 'slot-pm').request(URL)
        self.assertEqual(self.calls, [1000, 1004])

    def test_three_attempts_and_non_transient_no_retry(self):
        for code, count in [(429, 3), (503, 3), (401, 1), (403, 1)]:
            self.calls.clear()
            def opener(*a, **k):
                self.calls.append(self.now)
                raise urllib.error.HTTPError(URL, code, 'error', {}, None)
            with self.assertRaises(RuntimeError): self.client(opener, str(code)).request(URL)
            self.assertEqual(len(self.calls), count)

    def test_failure_does_not_cache_body_and_resume_keeps_prior_batch(self):
        def good(*a, **k): return Response()
        self.client(good).request(URL)
        def bad(*a, **k): raise urllib.error.URLError('temporary')
        with self.assertRaises(Deferred): self.client(bad).request(URL + '2')
        self.assertEqual(self.client(bad).request(URL), b'valid-response')

    def test_processes_serialize_real_requests(self):
        context = multiprocessing.get_context('spawn')
        queue = context.Queue()
        processes = [context.Process(target=process_read, args=(self.directory.name, str(i), queue)) for i in range(2)]
        for process in processes: process.start()
        moments = sorted(queue.get(timeout=15) for _ in processes)
        for process in processes:
            process.join(15)
            self.assertEqual(process.exitcode, 0)
        self.assertGreaterEqual(moments[1] - moments[0], 4)
