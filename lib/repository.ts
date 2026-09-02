import { env } from 'cloudflare:workers';
import { previewDashboard, previewReports, previewVolumes } from './fixtures';
import type { DashboardData, PaperReport, VolumePoint } from './types';
import type { ReportBatchV1, VolumeHistoryV1 } from './validation';

function database(): D1Database | null {
  return env.DB ?? null;
}
function parseList(value: string): string[] {
  try {
    return JSON.parse(value) as string[];
  } catch {
    return [];
  }
}

type ReportRow = {
  id: string;
  announcement_date: string;
  arxiv_id: string;
  version: number;
  entry_kind: 'new' | 'revision';
  title: string;
  authors_json: string;
  abstract: string;
  categories_json: string;
  primary_category: string;
  arxiv_url: string;
  pdf_url: string;
  submitted_at: string;
  updated_at: string;
  topic: PaperReport['topic'];
  progress_type: string;
  work_summary: string;
  techniques_json: string;
  breakthrough: string;
  limitations: string;
  analysis_depth: PaperReport['analysisDepth'];
  ai_status: PaperReport['aiStatus'];
  ai_evidence: string | null;
  ai_evidence_source: string | null;
  priority_score: number;
  priority_tier: PaperReport['priorityTier'];
  priority_reason: string;
  low_priority_reason: string | null;
  revision_summary: string | null;
};

function rowToReport(row: ReportRow): PaperReport {
  return {
    id: row.id,
    announcementDate: row.announcement_date,
    arxivId: row.arxiv_id,
    version: row.version,
    entryKind: row.entry_kind,
    title: row.title,
    authors: parseList(row.authors_json),
    abstract: row.abstract,
    categories: parseList(row.categories_json),
    primaryCategory: row.primary_category,
    arxivUrl: row.arxiv_url,
    pdfUrl: row.pdf_url,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
    topic: row.topic,
    progressType: row.progress_type,
    workSummary: row.work_summary,
    techniques: parseList(row.techniques_json),
    breakthrough: row.breakthrough,
    limitations: row.limitations,
    analysisDepth: row.analysis_depth,
    aiStatus: row.ai_status,
    aiEvidence: row.ai_evidence,
    aiEvidenceSource: row.ai_evidence_source,
    priorityScore: row.priority_score,
    priorityTier: row.priority_tier,
    priorityReason: row.priority_reason,
    lowPriorityReason: row.low_priority_reason,
    revisionSummary: row.revision_summary,
  };
}

export async function listVolumes(
  range: '6m' | '2y' = '2y',
): Promise<VolumePoint[]> {
  const db = database();
  if (!db) return range === '6m' ? previewVolumes.slice(-132) : previewVolumes;
  const days = range === '6m' ? '-6 months' : '-24 months';
  try {
    const result = await db
      .prepare(
        `SELECT announcement_date, math_dg, math_mg, math_gt, total_unique, crosslist_overlap FROM daily_volume WHERE announcement_date >= date((SELECT MAX(announcement_date) FROM daily_volume), ?) ORDER BY announcement_date ASC`,
      )
      .bind(days)
      .all<Record<string, string | number>>();
    if (!result.results.length)
      return range === '6m' ? previewVolumes.slice(-132) : previewVolumes;
    return result.results.map((row) => ({
      announcementDate: String(row.announcement_date),
      mathDg: Number(row.math_dg),
      mathMg: Number(row.math_mg),
      mathGt: Number(row.math_gt),
      totalUnique: Number(row.total_unique),
      crosslistOverlap: Number(row.crosslist_overlap),
    }));
  } catch {
    return range === '6m' ? previewVolumes.slice(-132) : previewVolumes;
  }
}

export async function listReports(date?: string): Promise<PaperReport[]> {
  const db = database();
  if (!db) return previewReports;
  try {
    const selectedDate =
      date ??
      (
        await db
          .prepare('SELECT MAX(announcement_date) AS date FROM report_entries')
          .first<{ date: string | null }>()
      )?.date;
    if (!selectedDate) return previewReports;
    const result = await db
      .prepare(
        `SELECT r.*, p.title, p.authors_json, p.abstract, p.categories_json, p.primary_category, p.arxiv_url, p.pdf_url, p.submitted_at, p.updated_at FROM report_entries r JOIN papers p ON p.arxiv_id = r.arxiv_id WHERE r.announcement_date = ? ORDER BY r.priority_score DESC, p.updated_at DESC`,
      )
      .bind(selectedDate)
      .all<ReportRow>();
    return result.results.length ? result.results.map(rowToReport) : [];
  } catch {
    return previewReports;
  }
}

export async function loadDashboard(date?: string): Promise<DashboardData> {
  const db = database();
  if (!db) return previewDashboard;
  try {
    const latest =
      date ??
      (
        await db
          .prepare(
            'SELECT MAX(announcement_date) AS date FROM announcement_days WHERE status = ?',
          )
          .bind('announced')
          .first<{ date: string | null }>()
      )?.date;
    if (!latest) return previewDashboard;
    const [volumes, reports, run] = await Promise.all([
      listVolumes('2y'),
      listReports(latest),
      db
        .prepare(
          'SELECT completed_at FROM automation_runs WHERE status = ? ORDER BY completed_at DESC LIMIT 1',
        )
        .bind('succeeded')
        .first<{ completed_at: string }>(),
    ]);
    return {
      latestDate: latest,
      lastUpdated: run?.completed_at ?? `${latest}T14:00:00+08:00`,
      volumes,
      reports,
      dataMode: reports === previewReports ? 'preview' : 'database',
    };
  } catch {
    return previewDashboard;
  }
}

export async function getPaper(arxivId: string): Promise<PaperReport | null> {
  const db = database();
  if (!db)
    return previewReports.find((paper) => paper.arxivId === arxivId) ?? null;
  try {
    const row = await db
      .prepare(
        `SELECT r.*, p.title, p.authors_json, p.abstract, p.categories_json, p.primary_category, p.arxiv_url, p.pdf_url, p.submitted_at, p.updated_at FROM report_entries r JOIN papers p ON p.arxiv_id = r.arxiv_id WHERE r.arxiv_id = ? ORDER BY r.version DESC LIMIT 1`,
      )
      .bind(arxivId)
      .first<ReportRow>();
    return row ? rowToReport(row) : null;
  } catch {
    return previewReports.find((paper) => paper.arxivId === arxivId) ?? null;
  }
}

export async function getIngestState() {
  const db = database();
  if (!db) return { sourceCursor: null, latestAnnouncementDate: null };
  const run = await db
    .prepare(
      'SELECT source_cursor, scheduled_for FROM automation_runs WHERE status = ? ORDER BY completed_at DESC LIMIT 1',
    )
    .bind('succeeded')
    .first<{ source_cursor: string | null; scheduled_for: string | null }>();
  const day = await db
    .prepare('SELECT MAX(date) AS date FROM announcement_days WHERE status = ?')
    .bind('announced')
    .first<{ date: string | null }>();
  return {
    sourceCursor: run?.source_cursor ?? null,
    latestAnnouncementDate: day?.date ?? null,
  };
}

export async function ingestBatch(batch: ReportBatchV1) {
  const db = database();
  if (!db) throw new Error('Database binding unavailable');
  const now = batch.run.completedAt;
  const statements: D1PreparedStatement[] = [];
  for (const report of batch.reports) {
    statements.push(
      db
        .prepare(
          `INSERT INTO papers (arxiv_id, latest_version, title, authors_json, abstract, categories_json, primary_category, arxiv_url, pdf_url, submitted_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(arxiv_id) DO UPDATE SET latest_version=excluded.latest_version, title=excluded.title, authors_json=excluded.authors_json, abstract=excluded.abstract, categories_json=excluded.categories_json, primary_category=excluded.primary_category, arxiv_url=excluded.arxiv_url, pdf_url=excluded.pdf_url, submitted_at=excluded.submitted_at, updated_at=excluded.updated_at WHERE excluded.latest_version >= papers.latest_version`,
        )
        .bind(
          report.arxivId,
          report.version,
          report.title,
          JSON.stringify(report.authors),
          report.abstract,
          JSON.stringify(report.categories),
          report.primaryCategory,
          report.arxivUrl,
          report.pdfUrl,
          report.submittedAt,
          report.updatedAt,
        ),
    );
    const id = `${report.announcementDate}:${report.arxivId}:v${report.version}`;
    statements.push(
      db
        .prepare(
          `INSERT INTO report_entries (id, announcement_date, arxiv_id, version, entry_kind, topic, progress_type, work_summary, techniques_json, breakthrough, limitations, analysis_depth, ai_status, ai_evidence, ai_evidence_source, priority_score, priority_tier, priority_reason, low_priority_reason, revision_summary, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(announcement_date, arxiv_id, version) DO UPDATE SET topic=excluded.topic, progress_type=excluded.progress_type, work_summary=excluded.work_summary, techniques_json=excluded.techniques_json, breakthrough=excluded.breakthrough, limitations=excluded.limitations, analysis_depth=excluded.analysis_depth, ai_status=excluded.ai_status, ai_evidence=excluded.ai_evidence, ai_evidence_source=excluded.ai_evidence_source, priority_score=excluded.priority_score, priority_tier=excluded.priority_tier, priority_reason=excluded.priority_reason, low_priority_reason=excluded.low_priority_reason, revision_summary=excluded.revision_summary`,
        )
        .bind(
          id,
          report.announcementDate,
          report.arxivId,
          report.version,
          report.entryKind,
          report.topic,
          report.progressType,
          report.workSummary,
          JSON.stringify(report.techniques),
          report.breakthrough,
          report.limitations,
          report.analysisDepth,
          report.aiStatus,
          report.aiEvidence ?? null,
          report.aiEvidenceSource ?? null,
          report.priorityScore,
          report.priorityTier,
          report.priorityReason,
          report.lowPriorityReason ?? null,
          report.revisionSummary ?? null,
          now,
        ),
    );
  }
  const volume = batch.dailyVolume;
  statements.push(
    db
      .prepare(
        `INSERT INTO announcement_days (date, status, source, checked_at) VALUES (?, 'announced', ?, ?) ON CONFLICT(date) DO UPDATE SET status='announced', source=excluded.source, checked_at=excluded.checked_at`,
      )
      .bind(batch.announcementDay.date, batch.announcementDay.source, now),
  );
  statements.push(
    db
      .prepare(
        `INSERT INTO daily_volume (announcement_date, math_dg, math_mg, math_gt, total_unique, crosslist_overlap, collected_at) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(announcement_date) DO UPDATE SET math_dg=excluded.math_dg, math_mg=excluded.math_mg, math_gt=excluded.math_gt, total_unique=excluded.total_unique, crosslist_overlap=excluded.crosslist_overlap, collected_at=excluded.collected_at`,
      )
      .bind(
        volume.announcementDate,
        volume.mathDg,
        volume.mathMg,
        volume.mathGt,
        volume.totalUnique,
        volume.crosslistOverlap,
        now,
      ),
  );
  statements.push(
    db
      .prepare(
        `INSERT INTO automation_runs (run_id, scheduled_for, started_at, completed_at, status, source_cursor, fetched_count, published_count) VALUES (?, ?, ?, ?, 'succeeded', ?, ?, ?) ON CONFLICT(run_id) DO UPDATE SET completed_at=excluded.completed_at, status='succeeded', source_cursor=excluded.source_cursor, fetched_count=excluded.fetched_count, published_count=excluded.published_count`,
      )
      .bind(
        batch.run.runId,
        batch.run.scheduledFor,
        batch.run.startedAt,
        batch.run.completedAt,
        batch.run.sourceCursor,
        batch.reports.length,
        batch.reports.length,
      ),
  );
  await db.batch(statements);
  return {
    runId: batch.run.runId,
    published: batch.reports.length,
    announcementDate: batch.announcementDay.date,
  };
}

export async function ingestVolumeHistory(history: VolumeHistoryV1) {
  const db = database();
  if (!db) throw new Error('Database binding unavailable');
  const statements: D1PreparedStatement[] = [];
  for (const point of history.points) {
    statements.push(
      db
        .prepare(
          `INSERT INTO announcement_days (date, status, source, checked_at) VALUES (?, 'announced', ?, ?) ON CONFLICT(date) DO UPDATE SET status='announced', source=excluded.source, checked_at=excluded.checked_at`,
        )
        .bind(point.announcementDate, history.source, history.generatedAt),
    );
    statements.push(
      db
        .prepare(
          `INSERT INTO daily_volume (announcement_date, math_dg, math_mg, math_gt, total_unique, crosslist_overlap, collected_at) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(announcement_date) DO UPDATE SET math_dg=excluded.math_dg, math_mg=excluded.math_mg, math_gt=excluded.math_gt, total_unique=excluded.total_unique, crosslist_overlap=excluded.crosslist_overlap, collected_at=excluded.collected_at`,
        )
        .bind(
          point.announcementDate,
          point.mathDg,
          point.mathMg,
          point.mathGt,
          point.totalUnique,
          point.crosslistOverlap,
          history.generatedAt,
        ),
    );
  }
  await db.batch(statements);
  return {
    imported: history.points.length,
    firstDate: history.points[0]?.announcementDate,
    lastDate: history.points.at(-1)?.announcementDate,
  };
}
