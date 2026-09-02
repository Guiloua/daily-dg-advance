import assert from 'node:assert/strict';
import { buildDailyOverview, groupVisibleReports } from '../lib/dashboard';
import type { PaperReport } from '../lib/types';

function report(
  id: string,
  topic: PaperReport['topic'],
  priorityScore: number,
  overrides: Partial<PaperReport> = {},
): PaperReport {
  return {
    id,
    announcementDate: '2026-09-02',
    arxivId: `2609.${id}`,
    version: 1,
    entryKind: 'new',
    title: `Geometry paper ${id}`,
    authors: ['A. Author'],
    abstract: 'Abstract.',
    categories: ['math.DG'],
    primaryCategory: 'math.DG',
    arxivUrl: `https://arxiv.org/abs/2609.${id}`,
    pdfUrl: `https://arxiv.org/pdf/2609.${id}`,
    submittedAt: '2026-09-01T17:00:00Z',
    updatedAt: '2026-09-01T17:00:00Z',
    topic,
    progressType: '新定理/分类',
    workSummary: '证明了一个比较几何结论。',
    techniques: ['比较方法'],
    breakthrough: '放宽了曲率假设。',
    limitations: '仅处理紧致情形。',
    analysisDepth: 'abstract',
    aiStatus: 'no_disclosure_observed',
    priorityScore,
    priorityTier: priorityScore >= 75 ? 'high' : priorityScore >= 50 ? 'medium' : 'low',
    priorityReason: '与课题组方向相关。',
    lowPriorityReason: priorityScore < 50 ? '相关性较弱。' : null,
    ...overrides,
  };
}

const reports = [
  report('00001', '度量测度几何、极限与奇异空间', 63),
  report('00002', '曲率与比较几何', 79),
  report('00003', '曲率与比较几何', 91, { title: 'Ricci limit spaces' }),
  report('00004', '几何拓扑、低维流形与结', 88, {
    aiStatus: 'explicit',
    aiEvidence: '正文明确披露使用 AI。',
    aiEvidenceSource: 'Acknowledgements',
    breakthrough: '建立了新的低维拓扑构造。',
  }),
];

const baseFilters = {
  aiStatus: 'no_disclosure_observed' as const,
  topic: 'all' as const,
  priority: 'all' as const,
  query: '',
};

const groups = groupVisibleReports(reports, baseFilters);
assert.deepEqual(
  groups.map((group) => group.topic),
  ['曲率与比较几何', '度量测度几何、极限与奇异空间'],
  'empty topics must be omitted while the canonical topic order is preserved',
);
assert.deepEqual(
  groups[0].papers.map((paper) => paper.id),
  ['00003', '00002'],
  'papers inside a topic must be ordered by descending priority',
);

assert.deepEqual(
  groupVisibleReports(reports, { ...baseFilters, priority: 'medium' }).map(
    (group) => group.topic,
  ),
  ['度量测度几何、极限与奇异空间'],
  'topics made empty by an active filter must also be omitted',
);

assert.deepEqual(
  groupVisibleReports(reports, { ...baseFilters, query: 'ricci' }).map(
    (group) => group.papers[0].id,
  ),
  ['00003'],
  'search must be applied before empty topics are removed',
);

assert.deepEqual(
  groupVisibleReports(reports, {
    ...baseFilters,
    aiStatus: 'explicit',
  }).map((group) => group.topic),
  ['几何拓扑、低维流形与结'],
  'AI status must participate in topic visibility',
);

const overview = buildDailyOverview(reports);
assert.equal(overview.paperCount, 4, 'overview must cover the complete day');
assert.match(
  overview.mainProgress[0],
  /曲率与比较几何（2 篇）/,
  'the leading research direction and count must be surfaced',
);
assert.match(
  overview.mainProgress[1],
  /比较方法（4 篇）/,
  'frequently reused techniques must be summarized',
);
assert.deepEqual(
  overview.breakthroughPoints.map((item) => item.arxivId),
  ['2609.00003', '2609.00004'],
  'possible breakthroughs must favor high-priority papers in score order',
);
assert.match(
  overview.cautions[0],
  /4 篇仅完成摘要级分析/,
  'summary-level evidence must be called out as a caution',
);
assert.equal(
  buildDailyOverview([]).paperCount,
  0,
  'an empty report day must produce an empty overview',
);

console.log('Dashboard grouping tests passed');
