CREATE TABLE `announcement_days` (
	`date` text PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`source` text NOT NULL,
	`checked_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `automation_runs` (
	`run_id` text PRIMARY KEY NOT NULL,
	`scheduled_for` text NOT NULL,
	`started_at` text NOT NULL,
	`completed_at` text,
	`status` text NOT NULL,
	`source_cursor` text,
	`fetched_count` integer DEFAULT 0 NOT NULL,
	`published_count` integer DEFAULT 0 NOT NULL,
	`error_summary` text
);
--> statement-breakpoint
CREATE TABLE `daily_volume` (
	`announcement_date` text PRIMARY KEY NOT NULL,
	`math_dg` integer NOT NULL,
	`math_mg` integer NOT NULL,
	`math_gt` integer NOT NULL,
	`total_unique` integer NOT NULL,
	`crosslist_overlap` integer NOT NULL,
	`collected_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `papers` (
	`arxiv_id` text PRIMARY KEY NOT NULL,
	`latest_version` integer NOT NULL,
	`title` text NOT NULL,
	`authors_json` text NOT NULL,
	`abstract` text NOT NULL,
	`categories_json` text NOT NULL,
	`primary_category` text NOT NULL,
	`arxiv_url` text NOT NULL,
	`pdf_url` text NOT NULL,
	`submitted_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `report_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`announcement_date` text NOT NULL,
	`arxiv_id` text NOT NULL,
	`version` integer NOT NULL,
	`entry_kind` text NOT NULL,
	`topic` text NOT NULL,
	`progress_type` text NOT NULL,
	`work_summary` text NOT NULL,
	`techniques_json` text NOT NULL,
	`breakthrough` text NOT NULL,
	`limitations` text NOT NULL,
	`analysis_depth` text NOT NULL,
	`ai_status` text NOT NULL,
	`ai_evidence` text,
	`ai_evidence_source` text,
	`priority_score` integer NOT NULL,
	`priority_tier` text NOT NULL,
	`priority_reason` text NOT NULL,
	`low_priority_reason` text,
	`revision_summary` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uq_report_date_paper_version` ON `report_entries` (`announcement_date`,`arxiv_id`,`version`);--> statement-breakpoint
CREATE INDEX `idx_report_date_topic_priority` ON `report_entries` (`announcement_date`,`topic`,`priority_score`);--> statement-breakpoint
CREATE INDEX `idx_report_arxiv_version` ON `report_entries` (`arxiv_id`,`version`);