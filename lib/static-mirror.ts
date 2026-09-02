import { buildDailyOverview } from './dashboard';
import { aggregateWeeklyVolumes } from './volume';
import {
  TOPICS,
  type AiStatus,
  type PaperReport,
  type PriorityTier,
  type VolumePoint,
  type WeeklyVolumePoint,
} from './types';

export const STATIC_MIRROR_SCHEMA_VERSION = 1 as const;

export interface ReportFeed {
  date: string;
  lastUpdated: string;
  coverage: {
    expectedCount: number;
    publishedCount: number;
    complete: boolean;
  };
  reports: PaperReport[];
}

export interface StaticDayV1 {
  schemaVersion: typeof STATIC_MIRROR_SCHEMA_VERSION;
  announcementDate: string;
  lastUpdated: string;
  coverage: ReportFeed['coverage'];
  aiDisclosureCount: number;
  overview: ReturnType<typeof buildDailyOverview>;
  reports: PaperReport[];
}

export interface StaticPaperSnapshotV1 {
  announcementDate: string;
  report: PaperReport;
}

export interface StaticPaperV1 {
  schemaVersion: typeof STATIC_MIRROR_SCHEMA_VERSION;
  arxivId: string;
  slug: string;
  latest: PaperReport;
  history: StaticPaperSnapshotV1[];
}

export interface StaticVolumeV1 {
  schemaVersion: typeof STATIC_MIRROR_SCHEMA_VERSION;
  points: VolumePoint[];
  weeks26: WeeklyVolumePoint[];
  weeks104: WeeklyVolumePoint[];
}

export interface StaticMirrorDayEntryV1 {
  announcementDate: string;
  expectedCount: number;
  publishedCount: number;
  aiDisclosureCount: number;
  complete: boolean;
  lastUpdated: string;
}

export interface StaticMirrorManifestV1 {
  schemaVersion: typeof STATIC_MIRROR_SCHEMA_VERSION;
  latestDate: string;
  generatedAt: string;
  days: StaticMirrorDayEntryV1[];
}

const priorityRank: Record<PriorityTier, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function arxivSlug(arxivId: string): string {
  const normalized = arxivId.trim();
  if (!/^(?:[a-z-]+\/\d{7}|\d{4}\.\d{4,5})$/.test(normalized)) {
    throw new Error(`Unsafe arXiv identifier: ${arxivId}`);
  }
  return normalized.replaceAll('/', '--');
}

export function sortReports(reports: PaperReport[]): PaperReport[] {
  return [...reports].sort(
    (a, b) =>
      priorityRank[a.priorityTier] - priorityRank[b.priorityTier] ||
      b.priorityScore - a.priorityScore ||
      a.arxivId.localeCompare(b.arxivId),
  );
}

export function buildStaticDay(feed: ReportFeed): StaticDayV1 {
  const nonRevisionCount = feed.reports.filter(
    (paper) => paper.entryKind !== 'revision',
  ).length;
  const nonRevisionIds = new Set(
    feed.reports
      .filter((paper) => paper.entryKind !== 'revision')
      .map((paper) => paper.arxivId),
  );
  if (
    !feed.coverage.complete ||
    feed.coverage.expectedCount !== feed.coverage.publishedCount ||
    nonRevisionCount !== feed.coverage.publishedCount ||
    nonRevisionIds.size !== nonRevisionCount
  ) {
    throw new Error(
      `Incomplete report day ${feed.date}: expected=${feed.coverage.expectedCount}, published=${feed.coverage.publishedCount}, reports=${nonRevisionCount}`,
    );
  }
  const reports = sortReports(feed.reports);
  return {
    schemaVersion: STATIC_MIRROR_SCHEMA_VERSION,
    announcementDate: feed.date,
    lastUpdated: feed.lastUpdated,
    coverage: feed.coverage,
    aiDisclosureCount: reports.filter((paper) => paper.aiStatus === 'explicit')
      .length,
    overview: buildDailyOverview(reports),
    reports,
  };
}

export function buildStaticVolume(points: VolumePoint[]): StaticVolumeV1 {
  const allOrdered = [...points].sort((a, b) =>
    a.announcementDate.localeCompare(b.announcementDate),
  );
  const latest = allOrdered.at(-1)?.announcementDate;
  const cutoff = latest ? new Date(`${latest}T00:00:00Z`) : null;
  cutoff?.setUTCMonth(cutoff.getUTCMonth() - 24);
  const cutoffDate = cutoff?.toISOString().slice(0, 10);
  const ordered = cutoffDate
    ? allOrdered.filter((point) => point.announcementDate >= cutoffDate)
    : allOrdered;
  const weeks = aggregateWeeklyVolumes(ordered);
  return {
    schemaVersion: STATIC_MIRROR_SCHEMA_VERSION,
    points: ordered,
    weeks26: weeks.slice(-26),
    weeks104: weeks.slice(-104),
  };
}

export function mergeStaticPaper(
  existing: StaticPaperV1 | undefined,
  report: PaperReport,
): StaticPaperV1 {
  const slug = arxivSlug(report.arxivId);
  const history = [
    ...(existing?.history ?? []).filter(
      (item) =>
        !(
          item.announcementDate === report.announcementDate &&
          item.report.version === report.version
        ),
    ),
    { announcementDate: report.announcementDate, report },
  ].sort(
    (a, b) =>
      a.announcementDate.localeCompare(b.announcementDate) ||
      a.report.version - b.report.version,
  );
  const latest = [...history].sort(
    (a, b) =>
      b.report.version - a.report.version ||
      b.announcementDate.localeCompare(a.announcementDate),
  )[0].report;
  return {
    schemaVersion: STATIC_MIRROR_SCHEMA_VERSION,
    arxivId: report.arxivId,
    slug,
    latest,
    history,
  };
}

function escapeMarkdown(value: string): string {
  return value
    .replaceAll('\\', '\\\\')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replace(/([`*_{}[\]()#+.!|])/g, '\\$1')
    .replaceAll('{{', '&#123;&#123;')
    .replaceAll('{%', '&#123;%');
}

function safeExternalUrl(value: string): string {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.hostname !== 'arxiv.org') {
    throw new Error(`Unsafe external URL for ${value}`);
  }
  return url.toString();
}

function paperMarkdown(report: PaperReport): string {
  const lines = [
    `#### ${escapeMarkdown(report.title)}`,
    '',
    `- **作者：** ${report.authors.map(escapeMarkdown).join('、')}`,
    `- **arXiv：** [${escapeMarkdown(report.arxivId)}](${safeExternalUrl(report.arxivUrl)}) · [PDF](${safeExternalUrl(report.pdfUrl)})`,
    `- **分类：** ${report.categories.map(escapeMarkdown).join('、')}`,
    `- **进展类型：** ${escapeMarkdown(report.progressType)}`,
    `- **阅读优先级：** ${report.priorityScore}/100 · ${priorityLabel(report.priorityTier)}`,
    `- **分析深度：** ${report.analysisDepth === 'abstract' ? '摘要级分析' : '已补读正文关键部分'}`,
    '',
    '**完成的工作**',
    '',
    escapeMarkdown(report.workSummary),
    '',
    '**使用技术**',
    '',
    ...report.techniques.map((item) => `- ${escapeMarkdown(item)}`),
    '',
    '**可能的突破**',
    '',
    escapeMarkdown(report.breakthrough),
    '',
    '**限制与不确定性**',
    '',
    escapeMarkdown(report.limitations),
    '',
    '**排序理由**',
    '',
    escapeMarkdown(report.priorityReason),
  ];
  if (report.lowPriorityReason) {
    lines.push('', escapeMarkdown(report.lowPriorityReason));
  }
  if (report.aiStatus === 'explicit') {
    lines.push(
      '',
      '**AI 协作披露**',
      '',
      escapeMarkdown(report.aiEvidence ?? ''),
      '',
      `来源：${escapeMarkdown(report.aiEvidenceSource ?? '已检查来源')}`,
    );
  }
  lines.push('', '**原始英文摘要**', '', escapeMarkdown(report.abstract), '');
  return lines.join('\n');
}

function priorityLabel(tier: PriorityTier): string {
  if (tier === 'high') return '高优先级';
  if (tier === 'medium') return '中优先级';
  return '低阅读优先级';
}

function aiLabel(status: AiStatus): string {
  return status === 'explicit' ? '明确披露 AI 协作' : '未见 AI 协作声明';
}

export function renderDailyMarkdown(day: StaticDayV1): string {
  const lines = [
    `# 几何前沿日报 · ${day.announcementDate}`,
    '',
    `完整收录：${day.coverage.publishedCount} / ${day.coverage.expectedCount}。AI 协作明确披露 ${day.aiDisclosureCount} 篇。`,
    '',
    '> 自动生成的阅读指南，关键结论请回查原论文。',
    '',
    '## 当日总览',
    '',
    '### 主要方向与技术进展',
    '',
    ...day.overview.mainProgress.map((item) => `- ${escapeMarkdown(item)}`),
    '',
    '### 可能的突破点',
    '',
    ...day.overview.breakthroughPoints.map(
      (item) =>
        `- **${escapeMarkdown(item.title)}：** ${escapeMarkdown(item.summary)}`,
    ),
    '',
    '### 需谨慎处',
    '',
    ...day.overview.cautions.map((item) => `- ${escapeMarkdown(item)}`),
    '',
    '## 全部论文',
    '',
  ];
  const statuses: AiStatus[] = ['no_disclosure_observed', 'explicit'];
  for (const status of statuses) {
    const statusReports = day.reports.filter(
      (paper) => paper.aiStatus === status,
    );
    if (!statusReports.length) continue;
    lines.push(`## ${aiLabel(status)}`, '');
    for (const topic of TOPICS) {
      const topicReports = statusReports.filter(
        (paper) => paper.topic === topic,
      );
      if (!topicReports.length) continue;
      lines.push(`### ${escapeMarkdown(topic)}`, '');
      for (const report of sortReports(topicReports)) {
        lines.push(paperMarkdown(report), '---', '');
      }
    }
  }
  return `${lines.join('\n').trim()}\n`;
}

export function renderPaperMarkdown(paper: StaticPaperV1): string {
  const history = paper.history
    .map(
      (item) =>
        `- ${item.announcementDate} · v${item.report.version} · ${escapeMarkdown(item.report.entryKind)}`,
    )
    .join('\n');
  return `# ${escapeMarkdown(paper.latest.title)}

${paperMarkdown(paper.latest).replace(/^#### .*\n\n/, '')}

## 镜像中的公告历史

${history}
`;
}

export function renderArchiveMarkdown(
  manifest: StaticMirrorManifestV1,
): string {
  return `# 几何前沿日报归档

${manifest.days
  .map(
    (day) =>
      `- [${day.announcementDate}](daily/${day.announcementDate}.md) · ${day.publishedCount}/${day.expectedCount} 篇`,
  )
  .join('\n')}
`;
}
