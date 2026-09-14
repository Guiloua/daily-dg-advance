import { previewReports } from '../lib/fixtures';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  legacyEntry,
  fromLegacy,
  digest,
  emptyFeed,
  mergePublication,
  publicationSchema,
  PublicationConflict,
  publicationContent,
  type Publication,
  type EntryPatch,
  type ProgressiveFeed,
} from '../lib/progressive';
import { buildProgressivePages } from '../scripts/progressive_static';
import { buildStaticVolume } from '../lib/static-mirror';

const source = {
  url: 'https://arxiv.org/list/math.DG/new',
  observedAt: '2026-09-14T03:00:00Z',
  contentHash: 'a'.repeat(64),
};
const analysis = {
  topic: '曲率与比较几何' as const,
  progressType: '刚性',
  workSummary: '概要',
  techniques: ['比较'],
  breakthrough: '结果',
  limitations: '摘要级',
  analysisDepth: 'abstract' as const,
  aiStatus: 'no_disclosure_observed' as const,
  priorityScore: 80,
  priorityReason: '几何相关',
};
function batch(changes: Partial<Publication> = {}): Publication {
  return {
    schemaVersion: 3,
    publicationId: 'publication-test',
    contentHash: '0'.repeat(64),
    baseRevision: 0,
    runId: 'run-testing',
    scheduledFor: '2026-09-14T10:30:00+08:00',
    date: '2026-09-14',
    categories: [
      {
        category: 'mathDg',
        date: '2026-09-14',
        complete: true,
        newIds: ['2609.00001'],
        crossListIds: [],
        replacementIds: [],
        source,
      },
    ],
    entries: [],
    ...changes,
  };
}
const entry: EntryPatch = {
  arxivId: '2609.00001',
  metadata: {
    title: 'Title $x^2$',
    authors: ['Author'],
    abstract: 'Original abstract',
  },
  source,
};
let feed = mergePublication(emptyFeed('2026-09-14'), batch());
assert.equal(feed.entries.length, 1);
assert.deepEqual(feed.entries[0].metadata, {});
assert.equal(feed.entries[0].analysis, null);
assert.equal(feed.coverage.expectedCount, null);
assert.throws(() => mergePublication(feed, batch()), PublicationConflict);
feed = mergePublication(
  feed,
  batch({ baseRevision: 1, categories: [], entries: [entry] }),
);
assert.equal(feed.entries[0].metadata.version, undefined);
feed = mergePublication(
  feed,
  batch({
    baseRevision: 2,
    categories: ['mathMg', 'mathGt'].map((category) => ({
      category: category as 'mathMg' | 'mathGt',
      date: '2026-09-14',
      complete: true,
      newIds: [],
      crossListIds: [],
      replacementIds: [],
      source,
    })),
    entries: [
      {
        ...entry,
        analysis,
        analysisBasis: { abstract: 'Original abstract', version: null },
      },
    ],
  }),
);
assert.equal(feed.coverage.expectedCount, 1);
assert.equal(feed.coverage.analyzedCount, 1);
assert.equal(feed.coverage.metadataCount, 0);
assert.equal(feed.coverage.complete, false);
const full = {
  ...analysis,
  analysisDepth: 'full_text_sections' as const,
  aiStatus: 'explicit' as const,
  aiEvidence: 'Author statement',
  aiEvidenceSource: 'Acknowledgements',
};
feed = mergePublication(
  feed,
  batch({
    baseRevision: 3,
    categories: [],
    entries: [
      {
        ...entry,
        analysis: full,
        analysisBasis: { abstract: 'Original abstract', version: null },
      },
    ],
  }),
);
feed = mergePublication(
  feed,
  batch({
    baseRevision: 4,
    categories: [],
    entries: [
      {
        ...entry,
        analysis,
        analysisBasis: { abstract: 'Original abstract', version: null },
      },
    ],
  }),
);
assert.equal(feed.entries[0].analysis?.analysisDepth, 'full_text_sections');
assert.equal(feed.entries[0].analysis?.aiStatus, 'explicit');
feed = mergePublication(
  feed,
  batch({
    baseRevision: 5,
    categories: [],
    entries: [
      {
        ...entry,
        metadata: {
          version: 1,
          submittedAt: '2026-09-13T01:00:00Z',
          updatedAt: '2026-09-13T01:00:00Z',
          categories: ['math.DG'],
          primaryCategory: 'math.DG',
        },
      },
    ],
  }),
);
assert.equal(feed.coverage.complete, true);
assert.equal(feed.entries[0].metadata.title, entry.metadata.title);
feed = mergePublication(
  feed,
  batch({
    baseRevision: 6,
    categories: [],
    entries: [
      {
        ...entry,
        metadata: { version: 2, abstract: 'New abstract' },
        source: { ...source, observedAt: '2026-09-15T00:00:00Z' },
      },
    ],
  }),
);
assert.equal(feed.entries[0].analysis, null);
assert.equal(feed.entries[0].metadata.updatedAt, undefined);
const before = structuredClone(feed.entries[0]);
feed = mergePublication(
  feed,
  batch({
    baseRevision: 7,
    categories: [],
    entries: [{ ...entry, metadata: { version: 1, abstract: 'Old abstract' } }],
  }),
);
assert.deepEqual(feed.entries[0], before);
assert.throws(() =>
  mergePublication(
    feed,
    batch({
      baseRevision: 8,
      categories: [],
      entries: [
        {
          ...entry,
          source: { ...source, observedAt: '2026-09-16T00:00:00Z' },
          metadata: {},
          analysis,
          analysisBasis: { abstract: 'Different', version: 2 },
        },
      ],
    }),
  ),
);
assert.equal(
  publicationSchema.safeParse(
    batch({ categories: [{ ...batch().categories[0], date: '2026-09-13' }] }),
  ).success,
  false,
);
const signed = batch();
signed.contentHash = await digest(publicationContent(signed));
assert.equal(signed.contentHash.length, 64);
assert.equal(
  await digest({ b: 2, a: '中文' }),
  await digest({ a: '中文', b: 2 }),
);
const directory = await mkdtemp(join(tmpdir(), 'progressive-static-'));
try {
  const content = join(directory, 'content'),
    out = join(directory, 'site');
  await mkdir(join(content, 'data/daily'), { recursive: true });
  const partial: ProgressiveFeed = {
    ...mergePublication(emptyFeed('2026-09-14'), batch({ entries: [entry] })),
    lastUpdated: '2026-09-14T03:01:00Z',
  };
  await writeFile(
    join(content, 'data/manifest.json'),
    JSON.stringify({
      schemaVersion: 2,
      latestDate: partial.date,
      generatedAt: partial.lastUpdated,
      days: [{ announcementDate: partial.date }],
    }),
  );
  await writeFile(
    join(content, 'data/daily/2026-09-14.json'),
    JSON.stringify(partial),
  );
  await writeFile(
    join(content, 'data/volume.json'),
    JSON.stringify(buildStaticVolume([])),
  );
  const result = await buildProgressivePages({
    content,
    out,
    basePath: '/daily-dg-advance',
  });
  assert.equal(result.papers, 1);
  const html = await readFile(join(out, 'index.html'), 'utf8');
  assert.match(html, /其他分类待补齐/);
  assert.match(html, /版本待补齐/);
  assert.match(html, /data-chart/);
  assert.match(html, /value="unknown"/);
  assert.match(html, /katex/);
  const paper = await readFile(
    join(out, 'papers/2609.00001/index.html'),
    'utf8',
  );
  assert.match(paper, /作者|Author/);
  assert.doesNotMatch(paper, /undefined|NaN/);
  // Some historical complete reports have no recorded update timestamp.
  await writeFile(
    join(content, 'data/daily/2026-09-14.json'),
    JSON.stringify(fromLegacy(partial.date, '', [previewReports[0]], true)),
  );
  const historical = await buildProgressivePages({
    content,
    out,
    basePath: '/daily-dg-advance',
  });
  assert.equal(historical.papers, 1);
  partial.coverage.expectedCount = 999;
  await writeFile(
    join(content, 'data/daily/2026-09-14.json'),
    JSON.stringify(partial),
  );
  await assert.rejects(
    buildProgressivePages({ content, out, basePath: '/daily-dg-advance' }),
    /coverage/,
  );
} finally {
  await rm(directory, { recursive: true, force: true });
}
console.log(
  'Progressive merge, validation, and static partial publication tests passed.',
);

const revision = {
  ...previewReports[0],
  entryKind: 'revision' as const,
  version: 9,
};
assert.equal(legacyEntry(revision).metadata.version, 9);
assert.equal(legacyEntry(revision).arxivId, revision.arxivId);
