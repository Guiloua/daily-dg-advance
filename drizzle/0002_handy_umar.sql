CREATE TABLE `publication_days` (
	`date` text PRIMARY KEY NOT NULL,
	`revision` integer NOT NULL,
	`snapshot_json` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `publication_history` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`arxiv_id` text NOT NULL,
	`revision` integer NOT NULL,
	`entry_json` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `publication_receipts` (
	`publication_id` text PRIMARY KEY NOT NULL,
	`content_hash` text NOT NULL,
	`date` text NOT NULL,
	`revision` integer NOT NULL,
	`snapshot_json` text NOT NULL,
	`accepted` integer NOT NULL,
	CONSTRAINT "publication_revision_guard" CHECK("publication_receipts"."accepted" = 1)
);
