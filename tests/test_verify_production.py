import unittest

from verify_production import ExpectedAnnouncement, verify_payloads


class VerifyProductionTests(unittest.TestCase):
    def setUp(self):
        self.week = {
            "weekStart": "2026-08-24",
            "weekEnding": "2026-08-28",
            "mathDg": 6,
            "mathMg": 2,
            "mathGt": 3,
        }
        self.health = {
            "status": "ok",
            "latestAnnouncementDate": "2026-09-02",
            "coverage": {
                "expectedCount": 2,
                "publishedCount": 2,
                "databasePublicationCount": 2,
                "complete": True,
            },
            "latestCompleteWeek": self.week,
        }
        self.reports = {
            "date": "2026-09-02",
            "reports": [
                {"arxivId": "2609.00001", "entryKind": "new"},
                {"arxivId": "2608.99999", "entryKind": "cross_list"},
                {"arxivId": "2609.00001", "entryKind": "revision"},
            ],
        }
        self.volume = {
            "weeks": [self.week],
            "points": [
                {
                    "announcementDate": "2026-08-24",
                    "mathDg": 2,
                    "mathMg": 1,
                    "mathGt": 0,
                },
                {
                    "announcementDate": "2026-08-28",
                    "mathDg": 4,
                    "mathMg": 1,
                    "mathGt": 3,
                },
                {
                    "announcementDate": "2026-09-02",
                    "mathDg": 37,
                    "mathMg": 12,
                    "mathGt": 9,
                },
            ],
        }

    def test_healthy_payloads(self):
        expected = ExpectedAnnouncement("2026-09-02", 37, 12, 9)
        self.assertEqual(
            verify_payloads(self.health, self.reports, self.volume, expected), []
        )

    def test_count_mismatch_fails(self):
        self.health["coverage"]["publishedCount"] = 1
        self.assertIn(
            "report coverage counts do not agree",
            verify_payloads(self.health, self.reports, self.volume),
        )

    def test_weekly_sum_mismatch_fails(self):
        self.volume["points"][1]["mathDg"] = 3
        self.assertIn(
            "weekly mathDg total does not equal its daily sum",
            verify_payloads(self.health, self.reports, self.volume),
        )

    def test_official_date_mismatch_fails(self):
        expected = ExpectedAnnouncement("2026-09-01", 1, 2, 3)
        self.assertIn(
            "site latest date does not match the official arXiv announcement",
            verify_payloads(self.health, self.reports, self.volume, expected),
        )


if __name__ == "__main__":
    unittest.main()
