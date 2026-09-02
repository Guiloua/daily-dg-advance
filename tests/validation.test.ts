import assert from 'node:assert/strict';
import {
  paperReportSchema,
  reportBatchV1Schema,
  reportBatchV2Schema,
  volumeHistoryV1Schema,
} from '../lib/validation';

const report = {
  announcementDate: '2026-09-02', arxivId: '2609.01565', version: 1, entryKind: 'new' as const,
  title: 'A geometry paper', authors: ['A. Author'], abstract: 'An abstract.', categories: ['math.DG', 'math.MG'], primaryCategory: 'math.DG',
  arxivUrl: 'https://arxiv.org/abs/2609.01565', pdfUrl: 'https://arxiv.org/pdf/2609.01565', submittedAt: '2026-09-01T17:15:51Z', updatedAt: '2026-09-01T17:15:51Z',
  topic: '曲率与比较几何' as const, progressType: '新定理/分类', workSummary: '证明了一个比较结论。', techniques: ['比较方法'], breakthrough: '放宽了曲率假设。', limitations: '仅处理紧致情形。', analysisDepth: 'abstract' as const,
  aiStatus: 'no_disclosure_observed' as const, priorityScore: 75, priorityTier: 'high' as const, priorityReason: '与课题组方向直接相关。',
};

assert.equal(paperReportSchema.safeParse(report).success, true, '75 points must be high priority');
assert.equal(paperReportSchema.safeParse({ ...report, priorityScore: 50, priorityTier: 'medium' }).success, true, '50 points must be medium priority');
assert.equal(paperReportSchema.safeParse({ ...report, priorityScore: 49, priorityTier: 'low' }).success, false, 'low priority requires a reason');
assert.equal(paperReportSchema.safeParse({ ...report, aiStatus: 'explicit' }).success, false, 'AI collaboration requires explicit evidence');

const batch = {
  schemaVersion: 1 as const,
  run: { runId: 'run-20260902', scheduledFor: '2026-09-02T14:00:00+08:00', startedAt: '2026-09-02T14:00:01+08:00', completedAt: '2026-09-02T14:10:00+08:00', sourceCursor: '2026-09-02T06:00:00Z' },
  announcementDay: { date: '2026-09-02', status: 'announced' as const, source: 'arXiv official announcement' },
  dailyVolume: { announcementDate: '2026-09-02', mathDg: 1, mathMg: 1, mathGt: 0, totalUnique: 1, crosslistOverlap: 1 }, reports: [report],
};
assert.equal(reportBatchV1Schema.safeParse(batch).success, true, 'cross-listed paper counts in both sections but once in total');
assert.equal(reportBatchV1Schema.safeParse({ ...batch, dailyVolume: { ...batch.dailyVolume, totalUnique: 2 } }).success, false, 'inconsistent deduped total must fail');
assert.equal(volumeHistoryV1Schema.safeParse({ schemaVersion: 1, generatedAt: '2026-09-02T06:00:00Z', source: 'official', points: [batch.dailyVolume] }).success, true);

const crossListReport = {
  ...report,
  arxivId: '2608.99999',
  entryKind: 'cross_list' as const,
  arxivUrl: 'https://arxiv.org/abs/2608.99999',
  pdfUrl: 'https://arxiv.org/pdf/2608.99999',
};
const batchV2 = {
  schemaVersion: 2 as const,
  run: {
    ...batch.run,
    runId: 'run-v2-20260902',
    expectedCount: 2,
  },
  announcementDay: batch.announcementDay,
  sourceManifest: {
    mathDg: {
      newIds: ['2609.01565'],
      crossListIds: ['2608.99999'],
    },
    mathMg: { newIds: [], crossListIds: ['2609.01565'] },
    mathGt: { newIds: [], crossListIds: [] },
  },
  dailyVolume: {
    announcementDate: '2026-09-02',
    mathDg: 2,
    mathMg: 1,
    mathGt: 0,
  },
  reports: [report, crossListReport],
};

assert.equal(
  reportBatchV2Schema.safeParse(batchV2).success,
  true,
  'a complete new plus cross-list manifest must be accepted',
);
assert.equal(
  reportBatchV2Schema.safeParse({ ...batchV2, reports: [report] }).success,
  false,
  'a curated subset must not pass as a complete report batch',
);
assert.equal(
  reportBatchV2Schema.safeParse({
    ...batchV2,
    dailyVolume: { ...batchV2.dailyVolume, mathDg: 1 },
  }).success,
  false,
  'category volume must equal new plus cross-list events',
);
assert.equal(
  reportBatchV2Schema.safeParse({
    ...batchV2,
    run: { ...batchV2.run, expectedCount: 1 },
  }).success,
  false,
  'expectedCount must equal the unique manifest size',
);
console.log('TypeScript validation tests passed');
