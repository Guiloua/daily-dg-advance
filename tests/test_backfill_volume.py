import unittest

from backfill_volume import announcement_date, next_announcement_day


class AnnouncementScheduleTests(unittest.TestCase):
    def test_before_monday_cutoff_announces_tuesday_in_shanghai(self):
        self.assertEqual(str(announcement_date('2026-08-31T16:00:00Z')), '2026-09-01')

    def test_after_thursday_cutoff_announces_monday_in_shanghai(self):
        self.assertEqual(str(announcement_date('2026-08-27T19:00:00Z')), '2026-08-31')

    def test_official_monday_holiday_is_skipped(self):
        self.assertEqual(str(next_announcement_day(__import__('datetime').date(2026, 9, 7))), '2026-09-08')


if __name__ == '__main__':
    unittest.main()
