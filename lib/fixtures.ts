import type { DashboardData, PaperReport, VolumePoint } from './types';

function isoDate(date: Date) { return date.toISOString().slice(0, 10); }

export const previewVolumes: VolumePoint[] = (() => {
  const points: VolumePoint[] = [];
  const cursor = new Date('2024-09-02T00:00:00Z');
  const end = new Date('2026-09-02T00:00:00Z');
  let index = 0;
  while (cursor <= end) {
    const weekday = cursor.getUTCDay();
    if (weekday >= 1 && weekday <= 5) {
      const mathDg = Math.max(0, 8 + ((index * 7) % 11) + Math.round(Math.sin(index / 11) * 3));
      const mathMg = Math.max(0, 3 + ((index * 5) % 7) + Math.round(Math.cos(index / 13) * 2));
      const mathGt = Math.max(0, 6 + ((index * 3) % 10) + Math.round(Math.sin(index / 17) * 2));
      points.push({ announcementDate: isoDate(cursor), mathDg, mathMg, mathGt });
      index += 1;
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return points;
})();

export const previewReports: PaperReport[] = [
  {
    id: '2026-09-02:2609.01565:v1', announcementDate: '2026-09-02', arxivId: '2609.01565', version: 1, entryKind: 'new',
    title: 'Hypersurfaces of constant higher order mean curvature in hyperbolic space with prescribed asymptotic boundary at infinity',
    authors: ['Bin Wang'], abstract: 'In this note, we prove the existence of smooth complete admissible hypersurfaces in hyperbolic space with constant higher order mean curvature and a prescribed asymptotic boundary at infinity. Unexpectedly, our result holds for a large part of indices in the subcritical range where the concavity inequality loses its effectiveness. We supply new arguments to reduce the proof to a semi-convex situation in which case the concavity inequality can play a role.',
    categories: ['math.DG', 'math.AP'], primaryCategory: 'math.DG', arxivUrl: 'https://arxiv.org/abs/2609.01565', pdfUrl: 'https://arxiv.org/pdf/2609.01565', submittedAt: '2026-09-01T17:31:11Z', updatedAt: '2026-09-01T17:31:11Z',
    topic: '曲率与比较几何', progressType: '新定理/构造', workSummary: '证明双曲空间中具有指定无穷远渐近边界的常高阶平均曲率完备超曲面存在性。', techniques: ['半凸约化', '凹性不等式', '双曲空间超曲面方程'], breakthrough: '把存在性推进到传统凹性工具失效的部分次临界指标区间，并以新的半凸化论证恢复估计。', limitations: '摘要未给出指标区间的精确边界及唯一性结论，需核对正文主定理。', analysisDepth: 'full_text_sections', aiStatus: 'no_disclosure_observed', priorityScore: 88, priorityTier: 'high', priorityReason: '与曲率方程和双曲几何直接相关，且处理了标准凹性方法失效的区间。',
  },
  {
    id: '2026-09-02:2609.01142:v1', announcementDate: '2026-09-02', arxivId: '2609.01142', version: 1, entryKind: 'new', title: 'Quantitative stratification for collapsed metric measure spaces', authors: ['A. Rossi', 'J. Park'], abstract: 'We establish quantitative stratification estimates for a class of collapsed metric measure spaces with lower Ricci curvature bounds.', categories: ['math.MG', 'math.DG'], primaryCategory: 'math.MG', arxivUrl: 'https://arxiv.org/abs/2609.01142', pdfUrl: 'https://arxiv.org/pdf/2609.01142', submittedAt: '2026-09-01T14:12:00Z', updatedAt: '2026-09-01T14:12:00Z', topic: '度量测度几何、极限与奇异空间', progressType: '推广/加强', workSummary: '把定量分层估计推广到带 Ricci 下界的塌缩度量测度空间，并控制各奇异层的大小。', techniques: ['定量分层', '锥分裂', '覆盖与测度估计'], breakthrough: '从非塌缩框架推进到塌缩情形，给出了更适合极限空间分析的尺度一致估计。', limitations: '当前摘要没有交代对非分支性或局部倍增条件的具体要求。', analysisDepth: 'abstract', aiStatus: 'no_disclosure_observed', priorityScore: 92, priorityTier: 'high', priorityReason: '与 Ricci 极限空间和奇异集结构高度相关，技术具有较强复用价值。',
  },
  {
    id: '2026-09-02:2609.00918:v1', announcementDate: '2026-09-02', arxivId: '2609.00918', version: 1, entryKind: 'new', title: 'A census of exceptional fillings on small hyperbolic manifolds', authors: ['L. Nguyen', 'S. Ito'], abstract: 'We give a computational census of exceptional Dehn fillings on a family of small-volume hyperbolic manifolds.', categories: ['math.GT'], primaryCategory: 'math.GT', arxivUrl: 'https://arxiv.org/abs/2609.00918', pdfUrl: 'https://arxiv.org/pdf/2609.00918', submittedAt: '2026-09-01T12:22:00Z', updatedAt: '2026-09-01T12:22:00Z', topic: '几何拓扑、低维流形与结', progressType: '计算/资源', workSummary: '系统枚举一族小体积双曲流形上的例外 Dehn 填充，并整理可复核的数据表。', techniques: ['严格数值验证', 'Dehn 填充', '计算机枚举'], breakthrough: '提供了完整度较高的特定样本族分类数据，但概念性机制较少。', limitations: '结论集中于有限样本族，尚不能直接推广到一般三维流形。', analysisDepth: 'abstract', aiStatus: 'no_disclosure_observed', priorityScore: 43, priorityTier: 'low', priorityReason: '对低维拓扑有资料价值，但与曲率和度量极限主线相关性较弱。', lowPriorityReason: '本期低阅读优先级：工作以特定样本的计算枚举为主，对课题组当前曲率与度量方向的技术增量有限。',
  },
];

export const previewDashboard: DashboardData = {
  latestDate: '2026-09-02',
  lastUpdated: '2026-09-02T14:06:00+08:00',
  volumes: previewVolumes,
  reports: previewReports,
  dataMode: 'preview',
  coverage: {
    expectedCount: previewReports.length,
    publishedCount: previewReports.length,
    complete: true,
  },
};
