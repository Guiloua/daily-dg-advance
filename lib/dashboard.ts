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
