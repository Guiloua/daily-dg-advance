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
  const categories = AI_USAGE.map((key) => ({
    key,
    label: AI_USAGE_LABELS[key],
    count: disclosed.filter((e) => e.analysis?.aiUsage?.includes(key)).length,
  }));
  const unspecified = disclosed.filter(
    (e) => !e.analysis?.aiUsage?.length,
  ).length;
  return { total: disclosed.length, categories, unspecified };
}
export function aiUsageLines(summary: ReturnType<typeof aiUsageSummary>) {
  return [
    `明确披露 AI 使用 ${summary.total} 篇；按稿件计数，一篇可计入多项。`,
    ...summary.categories.map((c) => `${c.label}：${c.count} 篇`),
    `用途未细分或待归类：${summary.unspecified} 篇`,
  ];
}
