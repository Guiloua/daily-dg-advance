import type { ProgressiveEntry, ProgressiveFeed } from './progressive';

export function fullTextSearched(entry: ProgressiveEntry): boolean {
  const review = entry.analysis?.aiReview;
  return (
    review?.status === 'full_text_searched' &&
    !!review.version &&
    review.version === entry.metadata.version &&
    !!review.contentHash &&
    !!review.pages
  );
}

export function disclosureStatus(entry: ProgressiveEntry) {
  if (entry.analysis?.aiStatus === 'explicit') return 'explicit';
  return fullTextSearched(entry) ? 'no_disclosure_observed' : 'unknown';
}

export function disclosureLabel(entry: ProgressiveEntry) {
  const status = disclosureStatus(entry);
  if (status === 'explicit') return '明确披露 AI 协作';
  if (status === 'no_disclosure_observed')
    return '全文检索未见 AI 协作披露（不代表未使用 AI）';
  return 'AI 披露待完成核查（不能仅凭摘要判断）';
}

export function disclosureSummary(feed: ProgressiveFeed) {
  const explicit = feed.entries.filter(
    (e) => disclosureStatus(e) === 'explicit',
  ).length;
  const searched = feed.entries.filter(fullTextSearched).length;
  const pending = feed.entries.filter(
    (e) => disclosureStatus(e) === 'unknown',
  ).length;
  return `明确披露 AI 协作 ${explicit} 篇 · 全文已检索 ${searched}/${feed.entries.length} · 待完成核查 ${pending} 篇`;
}
