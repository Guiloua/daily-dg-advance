import unittest

from verify_production import verify_daily_outcome


class DailyOutcomeTests(unittest.TestCase):
    def receipt(self, **changes):
        value = dict(schemaVersion=1, runId="daily-test", scheduledDate="2026-09-08",
                     status="no_new", announcementDate="2026-09-07",
                     expectedCount=30, publishedCount=30,
                     officialVerified=True, sitesVerified=True, pagesVerified=True)
        return value | changes

    def test_holiday_no_new_is_distinct_from_success(self):
        self.assertEqual(verify_daily_outcome(self.receipt(), "2026-09-08", "2026-09-07", 30), [])

    def test_blocked_completed_task_cannot_pass(self):
        for status in ("blocked", "failed", "running", "completed", None):
            self.assertTrue(verify_daily_outcome(self.receipt(status=status), "2026-09-08", "2026-09-07", 30))

    def test_missing_stale_or_incomplete_evidence_fails_closed(self):
        for value in ({}, self.receipt(scheduledDate="2026-09-07"),
                      self.receipt(pagesVerified=False), self.receipt(expectedCount=29),
                      self.receipt(announcementDate="2026-09-04"), self.receipt(runId="")):
            self.assertTrue(verify_daily_outcome(value, "2026-09-08", "2026-09-07", 30))

    def test_publication_requires_ingest_confirmation(self):
        value = self.receipt(status="success")
        self.assertTrue(verify_daily_outcome(value, "2026-09-08", "2026-09-07", 30))
        value["ingestVerified"] = True
        self.assertEqual(verify_daily_outcome(value, "2026-09-08", "2026-09-07", 30), [])
