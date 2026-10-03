import assert from 'node:assert/strict';
import { previewReports } from '../lib/fixtures';
import { fromLegacy, type ProgressiveEntry } from '../lib/progressive';
import { filterEntries, prepareEntries } from '../lib/progressive-reading';

const entries = fromLegacy(
  '2026-09-14',
  '2026-09-14T05:08:03Z',
  previewReports,
  true,
).entries;
entries[0].analysis!.priorityScore = 75;
entries[1].analysis!.priorityScore = 50;
entries[2].analysis!.priorityScore = 49;
const tie = structuredClone(entries[0]);
tie.arxivId = '2609.00001';
tie.analysis!.aiStatus = 'explicit';
tie.analysis!.aiEvidence = 'Acknowledged AI editing';
tie.analysis!.aiEvidenceSource = 'Acknowledgements';
const pending: ProgressiveEntry = {
  arxivId: '2609.09999',
  metadata: {},
  sources: [],
  analysis: null,
  analysisBasis: null,
};
const input = [...entries, pending, tie];
const before = structuredClone(input);
const prepared = prepareEntries(input);
const filters = { query: '', topic: 'all', ai: 'all', priority: 'all' };
const ids = (change: Partial<typeof filters> = {}) =>
  filterEntries(prepared, { ...filters, ...change }).map((e) => e.arxivId);
assert.deepEqual(ids(), [
  '2609.00001',
  '2609.01565',
  '2609.01142',
  '2609.00918',
  '2609.09999',
]);
assert.deepEqual(ids({ query: 'RICCI' }), ['2609.01142']);
assert.deepEqual(ids({ query: 'Bin Wang' }), ['2609.00001', '2609.01565']);
assert.deepEqual(ids({ query: '完备超曲面' }), ['2609.00001', '2609.01565']);
assert.deepEqual(ids({ query: '2609.09999' }), ['2609.09999']);
assert.deepEqual(ids({ query: 'not present' }), []);
assert.deepEqual(ids({ priority: 'high' }), ['2609.00001', '2609.01565']);
assert.deepEqual(ids({ priority: 'medium' }), ['2609.01142']);
assert.deepEqual(ids({ priority: 'low' }), ['2609.00918']);
assert.deepEqual(ids({ priority: 'pending' }), ['2609.09999']);
assert.deepEqual(ids({ topic: 'pending' }), ['2609.09999']);
assert.deepEqual(ids({ ai: 'explicit' }), ['2609.00001']);
assert.deepEqual(ids({ ai: 'explicit', priority: 'medium' }), []);
assert.deepEqual(ids({ topic: '几何拓扑、低维流形与结', query: 'CENSUS' }), [
  '2609.00918',
]);
assert.deepEqual(
  input,
  before,
  'Preparing and repeatedly filtering must not mutate the feed',
);
assert.deepEqual(filterEntries(prepareEntries([]), filters), []);
console.log(
  'Progressive filtering, partial metadata, score boundaries and stable ordering passed',
);
