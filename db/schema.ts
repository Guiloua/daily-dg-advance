import { integer, sqliteTable, text, uniqueIndex, index } from 'drizzle-orm/sqlite-core';

export const papers = sqliteTable('papers', {
  arxivId: text('arxiv_id').primaryKey(),
  latestVersion: integer('latest_version').notNull(),
  title: text('title').notNull(),
  authorsJson: text('authors_json').notNull(),
  abstract: text('abstract').notNull(),
  categoriesJson: text('categories_json').notNull(),
  primaryCategory: text('primary_category').notNull(),
  arxivUrl: text('arxiv_url').notNull(),
  pdfUrl: text('pdf_url').notNull(),
  submittedAt: text('submitted_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const reportEntries = sqliteTable('report_entries', {
  id: text('id').primaryKey(),
  announcementDate: text('announcement_date').notNull(),
  arxivId: text('arxiv_id').notNull(),
  version: integer('version').notNull(),
  entryKind: text('entry_kind', { enum: ['new', 'cross_list', 'revision'] }).notNull(),
  topic: text('topic').notNull(),
  progressType: text('progress_type').notNull(),
  workSummary: text('work_summary').notNull(),
  techniquesJson: text('techniques_json').notNull(),
  breakthrough: text('breakthrough').notNull(),
  limitations: text('limitations').notNull(),
  analysisDepth: text('analysis_depth', { enum: ['abstract', 'full_text_sections'] }).notNull(),
  aiStatus: text('ai_status', { enum: ['explicit', 'no_disclosure_observed'] }).notNull(),
  aiEvidence: text('ai_evidence'),
  aiEvidenceSource: text('ai_evidence_source'),
  priorityScore: integer('priority_score').notNull(),
  priorityTier: text('priority_tier', { enum: ['high', 'medium', 'low'] }).notNull(),
  priorityReason: text('priority_reason').notNull(),
  lowPriorityReason: text('low_priority_reason'),
  revisionSummary: text('revision_summary'),
  createdAt: text('created_at').notNull(),
}, (table) => [
  uniqueIndex('uq_report_date_paper_version').on(table.announcementDate, table.arxivId, table.version),
  index('idx_report_date_topic_priority').on(table.announcementDate, table.topic, table.priorityScore),
  index('idx_report_arxiv_version').on(table.arxivId, table.version),
]);

export const dailyVolume = sqliteTable('daily_volume', {
  announcementDate: text('announcement_date').primaryKey(),
  mathDg: integer('math_dg').notNull(),
  mathMg: integer('math_mg').notNull(),
  mathGt: integer('math_gt').notNull(),
  totalUnique: integer('total_unique').notNull(),
  crosslistOverlap: integer('crosslist_overlap').notNull(),
  collectedAt: text('collected_at').notNull(),
});

export const announcementDays = sqliteTable('announcement_days', {
  date: text('date').primaryKey(),
  status: text('status', { enum: ['announced', 'deferred', 'holiday'] }).notNull(),
  source: text('source').notNull(),
  checkedAt: text('checked_at').notNull(),
});

export const automationRuns = sqliteTable('automation_runs', {
  runId: text('run_id').primaryKey(),
  scheduledFor: text('scheduled_for').notNull(),
  startedAt: text('started_at').notNull(),
  completedAt: text('completed_at'),
  status: text('status', { enum: ['running', 'succeeded', 'failed'] }).notNull(),
  announcementDate: text('announcement_date'),
  sourceCursor: text('source_cursor'),
  expectedCount: integer('expected_count').notNull().default(0),
  fetchedCount: integer('fetched_count').notNull().default(0),
  publishedCount: integer('published_count').notNull().default(0),
  errorSummary: text('error_summary'),
}, (table) => [
  index('idx_automation_runs_announcement_status').on(
    table.announcementDate,
    table.status,
    table.completedAt,
  ),
]);
