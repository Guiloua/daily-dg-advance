import unittest

from release_gate import evaluate_release


GREEN_SHA = "a" * 40


class ReleaseGateTests(unittest.TestCase):
    def test_new_green_commit_deploys(self):
        self.assertEqual(
            evaluate_release(GREEN_SHA, "b" * 40, "success").action, "deploy"
        )

    def test_current_commit_is_skipped(self):
        self.assertEqual(
            evaluate_release(GREEN_SHA, GREEN_SHA, "success").action, "skip"
        )

    def test_pending_or_failed_ci_blocks(self):
        for status in ("pending", "failure"):
            with self.subTest(status=status):
                self.assertEqual(
                    evaluate_release(GREEN_SHA, "b" * 40, status).action,
                    "blocked",
                )

    def test_invalid_sha_blocks(self):
        self.assertEqual(
            evaluate_release("main", None, "success").action, "blocked"
        )


if __name__ == "__main__":
    unittest.main()
