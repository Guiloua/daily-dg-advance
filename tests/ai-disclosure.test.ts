import assert from 'node:assert/strict';
import { previewReports } from '../lib/fixtures';
import {
  fromLegacy,
  mergePublication,
  publicationSchema,
  analysisSchema,
} from '../lib/progressive';
import { disclosureStatus, fullTextSearched } from '../lib/ai-disclosure';

const original = fromLegacy(
  '2026-09-15',
  '2026-09-15T08:00:00Z',
  [previewReports[0]],
  true,
);
const entry = original.entries[0];
assert.equal(
  disclosureStatus(entry),
  'unknown',
  'An abstract-level negative is not a completed full-text check',
);
entry.analysis!.analysisDepth = 'full_text_sections';
const review = {
  status: 'full_text_searched' as const,
  checkedAt: '2026-09-15T09:00:00Z',
  version: entry.metadata.version!,
  sourceUrl: `https://arxiv.org/pdf/${entry.arxivId}v${entry.metadata.version}`,
  contentHash: 'a'.repeat(64),
  pages: 10,
  note: '全文检索并核对致谢中的披露。',
};
const batch = publicationSchema.parse({
  schemaVersion: 3,
  publicationId: 'ai-audit-test',
  contentHash: 'b'.repeat(64),
  baseRevision: original.revision,
  runId: 'ai-audit-test',
  scheduledFor: '2026-09-15T09:00:00Z',
  date: original.date,
  categories: [],
  entries: [
    {
      arxivId: entry.arxivId,
      metadata: {},
      source: {
        url: review.sourceUrl,
        observedAt: review.checkedAt,
        contentHash: review.contentHash,
      },
      analysis: {
        ...entry.analysis,
        analysisDepth: 'abstract',
        aiStatus: 'explicit',
        aiEvidence: '作者在致谢中披露使用语言模型校对。',
        aiEvidenceSource: 'PDF p.10',
        aiReview: review,
      },
      analysisBasis: entry.analysisBasis,
    },
  ],
});
const next = mergePublication(original, batch);
assert.equal(next.entries[0].analysis?.analysisDepth, 'full_text_sections');
assert.equal(
  next.entries[0].analysis?.aiStatus,
  'explicit',
  'Full-text AI disclosure must not be discarded when mathematical analysis depth is unchanged',
);
assert.deepEqual(next.entries[0].analysis?.aiReview, review);
assert.equal(fullTextSearched(next.entries[0]), true);
const negative = structuredClone(next.entries[0]);
negative.analysis!.aiStatus = 'no_disclosure_observed';
assert.equal(disclosureStatus(negative), 'no_disclosure_observed');
negative.metadata.version = review.version + 1;
assert.equal(
  disclosureStatus(negative),
  'unknown',
  'A different version needs a new full-text check',
);
assert.equal(
  analysisSchema.safeParse({
    ...entry.analysis,
    aiReview: { ...review, contentHash: undefined },
  }).success,
  false,
);
const replay = mergePublication(next, {
  ...batch,
  baseRevision: next.revision,
  entries: [
    {
      ...batch.entries[0],
      analysis: { ...entry.analysis!, aiStatus: 'no_disclosure_observed' },
    },
  ],
});
assert.equal(replay.entries[0].analysis?.aiStatus, 'explicit');
assert.deepEqual(
  replay.entries[0].analysis?.aiReview,
  review,
  'Routine analysis updates must retain completed AI review',
);
console.log('AI disclosure evidence merge regression passed.');
