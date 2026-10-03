import { disclosureStatus } from './ai-disclosure';
import type { ProgressiveEntry } from './progressive';

interface PreparedEntry {
  entry: ProgressiveEntry;
  searchText: string;
  topic: string;
  ai: string;
  priority: string;
}

export function prepareEntries(entries: ProgressiveEntry[]): PreparedEntry[] {
  return entries
    .map((entry) => {
      const a = entry.analysis,
        m = entry.metadata;
      return {
        entry,
        searchText:
          `${entry.arxivId} ${m.title ?? ''} ${m.authors?.join(' ') ?? ''} ${m.abstract ?? ''} ${a?.workSummary ?? ''}`.toLowerCase(),
        topic: a?.topic ?? 'pending',
        ai: disclosureStatus(entry),
        priority: a
          ? a.priorityScore >= 75
            ? 'high'
            : a.priorityScore >= 50
              ? 'medium'
              : 'low'
          : 'pending',
      };
    })
    .sort(
      (a, b) =>
        (b.entry.analysis?.priorityScore ?? -1) -
          (a.entry.analysis?.priorityScore ?? -1) ||
        a.entry.arxivId.localeCompare(b.entry.arxivId),
    );
}

export function filterEntries(
  entries: PreparedEntry[],
  filters: { query: string; topic: string; ai: string; priority: string },
): ProgressiveEntry[] {
  const query = filters.query.toLowerCase();
  return entries
    .filter(
      (item) =>
        (!query || item.searchText.includes(query)) &&
        (filters.topic === 'all' || item.topic === filters.topic) &&
        (filters.ai === 'all' || item.ai === filters.ai) &&
        (filters.priority === 'all' || item.priority === filters.priority),
    )
    .map((item) => item.entry);
}
