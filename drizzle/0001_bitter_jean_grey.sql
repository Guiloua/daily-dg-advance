ALTER TABLE `automation_runs` ADD `announcement_date` text;--> statement-breakpoint
ALTER TABLE `automation_runs` ADD `expected_count` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE INDEX `idx_automation_runs_announcement_status` ON `automation_runs` (`announcement_date`,`status`,`completed_at`);