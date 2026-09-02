import { TOPICS, type AiStatus, type PaperReport, type Topic } from './types';

export interface ReportFilters {
  aiStatus: AiStatus;
  topic: Topic | 'all';
  priority: PaperReport['priorityTier'] | 'all';
  query: string;
}

export interface TopicReportGroup {
  topic: Topic;
  papers: PaperReport[];
}

export interface DailyOverviewHighlight {
  arxivId: string;
  title: string;
  summary: string;
}

export interface DailyOverview {
  paperCount: number;
  mainProgress: string[];
  breakthroughPoints: DailyOverviewHighlight[];
  cautions: string[];
}

function countLabels(labels: string[]): Array<[string, number]> {
  const counts = new Map<string, number>();
  labels.forEach((label) => {
    const normalized = label.trim();
    if (normalized) counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
  });
  return [...counts.entries()].sort(
    ([labelA, countA], [labelB, countB]) =>
      countB - countA || labelA.localeCompare(labelB, 'zh-CN'),
  );
}

export function buildDailyOverview(reports: PaperReport[]): DailyOverview {
  if (!reports.length) {
    return {
      paperCount: 0,
      mainProgress: [],
      breakthroughPoints: [],
      cautions: [],
    };
  }

  const sortedReports = [...reports].sort(
    (a, b) => b.priorityScore - a.priorityScore,
  );
  const topicCounts = TOPICS.map((topic, index) => ({
    topic,
    index,
    count: reports.filter((paper) => paper.topic === topic).length,
  }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count || a.index - b.index)
    .slice(0, 3);
  const techniqueCounts = countLabels(
    sortedReports.flatMap((paper) => paper.techniques),
  ).slice(0, 4);
  const progressCounts = countLabels(
    sortedReports.map((paper) => paper.progressType),
  ).slice(0, 2);

  const mainProgress = [
    `本期共收录 ${reports.length} 篇，研究重心集中在${topicCounts
      .map((item) => `${item.topic}（${item.count} 篇）`)
      .join('、')}。`,
    techniqueCounts.length
      ? `技术路径以${techniqueCounts
          .map(([label, count]) => `${label}${count > 1 ? `（${count} 篇）` : ''}`)
          .join('、')}为主${
          progressCounts.length
            ? `；进展形态主要是${progressCounts
                .map(([label, count]) => `${label}（${count} 篇）`)
                .join('、')}`
            : ''
        }。`
      : `进展形态主要是${progressCounts
          .map(([label, count]) => `${label}（${count} 篇）`)
          .join('、')}。`,
  ];

  const highPriorityBreakthroughs = sortedReports.filter(
    (paper) => paper.priorityTier === 'high' && paper.breakthrough.trim(),
  );
  const breakthroughPool = highPriorityBreakthroughs.length
    ? highPriorityBreakthroughs
    : sortedReports.filter((paper) => paper.breakthrough.trim());
  const seenBreakthroughs = new Set<string>();
  const breakthroughPoints = breakthroughPool
    .filter((paper) => {
      const normalized = paper.breakthrough.trim().toLocaleLowerCase('zh-CN');
      if (seenBreakthroughs.has(normalized)) return false;
      seenBreakthroughs.add(normalized);
      return true;
    })
    .slice(0, 3)
    .map((paper) => ({
      arxivId: paper.arxivId,
      title: paper.title,
      summary: paper.breakthrough,
    }));

  const cautions: string[] = [];
  const abstractOnlyCount = reports.filter(
    (paper) => paper.analysisDepth === 'abstract',
  ).length;
  if (abstractOnlyCount) {
    cautions.push(
      `其中 ${abstractOnlyCount} 篇仅完成摘要级分析；技术细节、定理假设和适用范围需回查正文。`,
    );
  }
  const seenLimitations = new Set<string>();
  sortedReports.forEach((paper) => {
    if (cautions.length >= 3 || !paper.limitations.trim()) return;
    const normalized = paper.limitations.trim().toLocaleLowerCase('zh-CN');
    if (seenLimitations.has(normalized)) return;
    seenLimitations.add(normalized);
    cautions.push(`《${paper.title}》：${paper.limitations}`);
  });

  return {
    paperCount: reports.length,
    mainProgress,
    breakthroughPoints,
    cautions,
  };
}

export function groupVisibleReports(
  reports: PaperReport[],
  filters: ReportFilters,
): TopicReportGroup[] {
  const normalizedQuery = filters.query.trim().toLocaleLowerCase('zh-CN');
  const visibleReports = reports.filter((paper) => {
    const searchableText = `${paper.title} ${paper.authors.join(' ')} ${paper.workSummary}`.toLocaleLowerCase(
      'zh-CN',
    );

    return (
      paper.aiStatus === filters.aiStatus &&
      (filters.topic === 'all' || paper.topic === filters.topic) &&
      (filters.priority === 'all' ||
        paper.priorityTier === filters.priority) &&
      (!normalizedQuery || searchableText.includes(normalizedQuery))
    );
  });

  return TOPICS.map((topic) => ({
    topic,
    papers: visibleReports
      .filter((paper) => paper.topic === topic)
      .sort((a, b) => b.priorityScore - a.priorityScore),
  })).filter((group) => group.papers.length > 0);
}
