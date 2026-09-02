import unittest

from backfill_volume import point_from_manifest


class BackfillVolumeTests(unittest.TestCase):
    def test_category_counts_do_not_deduplicate_across_lines(self):
        point = point_from_manifest(
            {
                "announcementDate": "2026-09-02",
                "sourceManifest": {
                    "mathDg": {
                        "newIds": ["2609.00001"],
                        "crossListIds": ["2401.00001"],
                    },
                    "mathMg": {
                        "newIds": [],
                        "crossListIds": ["2609.00001"],
                    },
                    "mathGt": {"newIds": [], "crossListIds": []},
                },
            }
        )
        self.assertEqual(point["mathDg"], 2)
        self.assertEqual(point["mathMg"], 1)
        self.assertEqual(point["mathGt"], 0)
        self.assertEqual(point["totalUnique"], 2)


if __name__ == "__main__":
    unittest.main()
