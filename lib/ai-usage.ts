// Categories are assigned from reviewed disclosure evidence, never keyword inference.
export const AI_USAGE = [
  'writing',
  'literature',
  'ideas',
  'proofs',
  'verification',
  'computation',
  'exploration',
] as const;
export type AiUsage = (typeof AI_USAGE)[number];
export const AI_USAGE_LABELS: Record<AiUsage, string> = {
  writing: '辅助写作与排版',
  literature: '资料收集与文献检索',
  ideas: '核心想法与研究路线',
  proofs: '证明推导与完善',
  verification: '论证检查与纠错',
  computation: '编程、计算与制图',
  exploration: '探索讨论',
};
export function aiUsageSummary(
  entries: readonly {
    arxivId: string;
    metadata?: { title?: string };
    title?: string;
    analysis?: { aiStatus: string; aiUsage?: AiUsage[] } | null;
  }[],
) {
  const disclosed = [
    ...new Map(
      entries
        .filter((e) => e.analysis?.aiStatus === 'explicit')
        .map((e) => [e.arxivId, e]),
    ).values(),
  ];
  const paper = (e: (typeof disclosed)[number]) => ({
    arxivId: e.arxivId,
    title: e.metadata?.title ?? e.title ?? e.arxivId,
  });
  const categories = AI_USAGE.map((key) => ({
    key,
    label: AI_USAGE_LABELS[key],
    count: disclosed.filter((e) => e.analysis?.aiUsage?.includes(key)).length,
    papers: disclosed
      .filter((e) => e.analysis?.aiUsage?.includes(key))
      .map(paper),
  }));
  const unspecified = disclosed.filter(
    (e) => !e.analysis?.aiUsage?.length,
  ).length;
  return {
    total: disclosed.length,
    categories,
    unspecified,
    papers: disclosed.map(paper),
    unspecifiedPapers: disclosed
      .filter((e) => !e.analysis?.aiUsage?.length)
      .map(paper),
  };
}
export function aiUsageGroups(summary: ReturnType<typeof aiUsageSummary>) {
  return [
    {
      key: 'all',
      label: '明确披露 AI 使用',
      count: summary.total,
      papers: summary.papers,
    },
    ...summary.categories,
    {
      key: 'unspecified',
      label: '用途未细分或待归类',
      count: summary.unspecified,
      papers: summary.unspecifiedPapers,
    },
  ];
}
