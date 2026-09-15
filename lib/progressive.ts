import { z } from 'zod';
import { TOPICS, type PaperReport } from './types';

export const categoryKeys = ['mathDg', 'mathMg', 'mathGt'] as const;
const id = z.string().regex(/^(?:[a-z-]+\/\d{7}|\d{4}\.\d{4,5})$/);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const timestamp = z.iso.datetime({ offset: true });
const source = z.object({
  url: z.url().refine((v) => {
    const u = new URL(v);
    return (
      u.protocol === 'https:' &&
      ['arxiv.org', 'export.arxiv.org'].includes(u.hostname)
    );
  }),
  observedAt: timestamp,
  contentHash: z.string().regex(/^[a-f0-9]{64}$/),
});
const aiReviewSchema = z
  .object({
    status: z.enum([
      'full_text_searched',
      'metadata_only',
      'unavailable',
      'needs_review',
    ]),
    checkedAt: timestamp,
    version: z.number().int().positive().nullable(),
    sourceUrl: source.shape.url,
    contentHash: z
      .string()
      .regex(/^[a-f0-9]{64}$/)
      .optional(),
    pages: z.number().int().positive().optional(),
    note: z.string().min(1).max(1500),
  })
  .superRefine((review, context) => {
    if (
      review.status === 'full_text_searched' &&
      (!review.contentHash || !review.pages || !review.version)
    )
      context.addIssue({
        code: 'custom',
        message:
          'Full-text search requires a versioned document, hash and page count',
      });
  });
export const analysisSchema = z
  .object({
    topic: z.enum(TOPICS),
    progressType: z.string().min(1).max(80),
    workSummary: z.string().min(1).max(5000),
    techniques: z.array(z.string().min(1).max(300)).max(20),
    breakthrough: z.string().min(1).max(5000),
    limitations: z.string().min(1).max(5000),
    analysisDepth: z.enum(['abstract', 'full_text_sections']),
    aiStatus: z.enum(['explicit', 'no_disclosure_observed']),
    aiEvidence: z.string().max(3000).nullish(),
    aiEvidenceSource: z.string().max(500).nullish(),
    aiReview: aiReviewSchema.optional(),
    priorityScore: z.number().int().min(0).max(100),
    priorityReason: z.string().min(1).max(3000),
    lowPriorityReason: z.string().max(3000).nullish(),
  })
  .superRefine((v, c) => {
    if (v.priorityScore < 50 && !v.lowPriorityReason)
      c.addIssue({ code: 'custom', message: 'Low priority requires a reason' });
    if (v.aiStatus === 'explicit' && (!v.aiEvidence || !v.aiEvidenceSource))
      c.addIssue({
        code: 'custom',
        message: 'AI disclosure requires evidence',
      });
  });
const metadataSchema = z.object({
  title: z.string().min(1).max(1000).optional(),
  authors: z.array(z.string().min(1).max(300)).min(1).max(200).optional(),
  abstract: z.string().min(1).max(30000).optional(),
  categories: z.array(z.string().min(2).max(40)).min(1).max(50).optional(),
  primaryCategory: z.string().min(2).max(40).optional(),
  comment: z.string().max(5000).optional(),
  version: z.number().int().positive().optional(),
  submittedAt: timestamp.optional(),
  updatedAt: timestamp.optional(),
});
const categorySchema = z
  .object({
    category: z.enum(categoryKeys),
    date,
    complete: z.boolean(),
    newIds: z.array(id).max(300),
    crossListIds: z.array(id).max(300),
    replacementIds: z.array(id).max(300),
    source,
  })
  .superRefine((v, c) => {
    const ids = [...v.newIds, ...v.crossListIds];
    if (new Set(ids).size !== ids.length)
      c.addIssue({ code: 'custom', message: 'Duplicate category IDs' });
  });
export const entryPatchSchema = z
  .object({
    arxivId: id,
    metadata: metadataSchema,
    source,
    analysis: analysisSchema.optional(),
    analysisBasis: z
      .object({
        abstract: z.string().min(1).max(30000),
        version: z.number().int().positive().nullable(),
      })
      .optional(),
  })
  .superRefine((v, c) => {
    if (Boolean(v.analysis) !== Boolean(v.analysisBasis))
      c.addIssue({
        code: 'custom',
        message: 'Analysis requires an explicit source basis',
      });
  });
export const publicationSchema = z
  .object({
    schemaVersion: z.literal(3),
    publicationId: z.string().min(8).max(160),
    contentHash: z.string().regex(/^[a-f0-9]{64}$/),
    baseRevision: z.number().int().nonnegative(),
    runId: z.string().min(8).max(120),
    scheduledFor: timestamp,
    date,
    categories: z.array(categorySchema).max(3),
    entries: z.array(entryPatchSchema).max(300),
  })
  .superRefine((v, c) => {
    if (v.categories.some((s) => s.date !== v.date))
      c.addIssue({
        code: 'custom',
        message: 'Category dates must match publication date',
      });
    if (
      new Set(v.categories.map((s) => s.category)).size !==
        v.categories.length ||
      new Set(v.entries.map((e) => e.arxivId)).size !== v.entries.length
    )
      c.addIssue({ code: 'custom', message: 'Duplicate patches' });
  });
export type Publication = z.infer<typeof publicationSchema>;
export type EntryPatch = z.infer<typeof entryPatchSchema>;
export type ProgressiveEntry = {
  arxivId: string;
  metadata: EntryPatch['metadata'];
  sources: EntryPatch['source'][];
  analysis: EntryPatch['analysis'] | null;
  analysisBasis: EntryPatch['analysisBasis'] | null;
};
export interface ProgressiveFeed {
  schemaVersion: 2;
  date: string;
  revision: number;
  contentHash: string;
  lastUpdated: string;
  categories: Publication['categories'];
  listingConflicts?: {
    category: string;
    observedAt: string;
    removedIds: string[];
  }[];
  entries: ProgressiveEntry[];
  coverage: {
    expectedCount: number | null;
    confirmedCount: number;
    publishedCount: number;
    analyzedCount: number;
    metadataCount: number;
    listingsComplete: boolean;
    complete: boolean;
  };
}
export function canonical(value: unknown): string {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value !== null && typeof value === 'object')
    return (
      '{' +
      Object.entries(value)
        .filter(([, v]) => v !== undefined)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([k, v]) => JSON.stringify(k) + ':' + canonical(v))
        .join(',') +
      '}'
    );
  return JSON.stringify(value);
}
export async function digest(value: unknown): Promise<string> {
  const bytes = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(canonical(value)),
  );
  return Array.from(new Uint8Array(bytes), (v) =>
    v.toString(16).padStart(2, '0'),
  ).join('');
}
export function publicationContent(batch: Publication) {
  const { contentHash: _, ...content } = batch;
  return content;
}
export function emptyFeed(day: string): ProgressiveFeed {
  return {
    schemaVersion: 2,
    date: day,
    revision: 0,
    contentHash: '',
    lastUpdated: '',
    categories: [],
    entries: [],
    coverage: {
      expectedCount: null,
      confirmedCount: 0,
      publishedCount: 0,
      analyzedCount: 0,
      metadataCount: 0,
      listingsComplete: false,
      complete: false,
    },
  };
}
export class PublicationConflict extends Error {}
export class PublicationValidationError extends Error {}
const cleanAbstract = (v: string | undefined) => v?.replace(/\s+/g, ' ').trim();
export function recalculate(feed: ProgressiveFeed): ProgressiveFeed {
  const confirmed = new Set(
    feed.categories.flatMap((c) => [...c.newIds, ...c.crossListIds]),
  );
  const listingsComplete =
    !feed.listingConflicts?.length &&
    categoryKeys.every((k) =>
      feed.categories.some((c) => c.category === k && c.complete),
    );
  const metadataCount = feed.entries.filter(
    (e) =>
      e.metadata.title &&
      e.metadata.authors?.length &&
      e.metadata.abstract &&
      e.metadata.categories?.length &&
      e.metadata.primaryCategory &&
      e.metadata.version &&
      e.metadata.submittedAt &&
      e.metadata.updatedAt,
  ).length;
  const analyzedCount = feed.entries.filter((e) => e.analysis).length;
  const expectedCount = listingsComplete ? confirmed.size : null;
  return {
    ...feed,
    coverage: {
      expectedCount,
      confirmedCount: confirmed.size,
      publishedCount: feed.entries.length,
      analyzedCount,
      metadataCount,
      listingsComplete,
      complete:
        listingsComplete &&
        feed.entries.length === confirmed.size &&
        metadataCount === confirmed.size &&
        analyzedCount === confirmed.size,
    },
  };
}
export function mergePublication(
  previous: ProgressiveFeed,
  batch: Publication,
): ProgressiveFeed {
  if (previous.date !== batch.date || previous.revision !== batch.baseRevision)
    throw new PublicationConflict('Publication revision changed');
  const categories = new Map(previous.categories.map((c) => [c.category, c]));
  let listingConflicts = [...(previous.listingConflicts ?? [])];
  for (const snapshot of batch.categories) {
    const next = structuredClone(snapshot);
    const old = categories.get(next.category);
    if (old) {
      if (
        Date.parse(next.source.observedAt) < Date.parse(old.source.observedAt)
      )
        continue;
      const oldIds = new Set([...old.newIds, ...old.crossListIds]);
      const nextIds = new Set([...next.newIds, ...next.crossListIds]);
      const removedIds = [...oldIds].filter((v) => !nextIds.has(v));
      if (next.complete && removedIds.length) {
        listingConflicts = [
          ...listingConflicts.filter((c) => c.category !== next.category),
          {
            category: next.category,
            observedAt: next.source.observedAt,
            removedIds,
          },
        ];
        continue;
      }
      if (old.complete && !next.complete) continue;
      if (next.complete)
        listingConflicts = listingConflicts.filter(
          (c) => c.category !== next.category,
        );
      if (!next.complete) {
        next.newIds = [...new Set([...old.newIds, ...next.newIds])];
        next.crossListIds = [
          ...new Set([...old.crossListIds, ...next.crossListIds]),
        ].filter((v) => !next.newIds.includes(v));
      }
    }
    categories.set(next.category, next);
  }
  const known = new Set(
    [...categories.values()].flatMap((c) => [...c.newIds, ...c.crossListIds]),
  );
  const entries = new Map(
    previous.entries.map((e) => [e.arxivId, structuredClone(e)]),
  );
  for (const patch of batch.entries) {
    if (!known.has(patch.arxivId))
      throw new PublicationValidationError(
        'Entry is not in a verified listing',
      );
    const old = entries.get(patch.arxivId) ?? {
      arxivId: patch.arxivId,
      metadata: {},
      sources: [],
      analysis: null,
      analysisBasis: null,
    };
    const incoming = patch.metadata;
    const oldVersion = old.metadata.version;
    const newer = Boolean(
      incoming.version && oldVersion && incoming.version > oldVersion,
    );
    const older = Boolean(
      incoming.version && oldVersion && incoming.version < oldVersion,
    );
    const stale = old.sources.some(
      (s) => Date.parse(s.observedAt) > Date.parse(patch.source.observedAt),
    );
    if (older || (stale && !newer)) continue;
    const abstractChanged =
      incoming.abstract !== undefined &&
      old.metadata.abstract !== undefined &&
      cleanAbstract(incoming.abstract) !== cleanAbstract(old.metadata.abstract);
    if (newer || abstractChanged) {
      old.analysis = null;
      old.analysisBasis = null;
    }
    if (newer) {
      delete old.metadata.updatedAt;
      if (!incoming.abstract) delete old.metadata.abstract;
    }
    if (abstractChanged && !incoming.version) {
      delete old.metadata.version;
      delete old.metadata.updatedAt;
    }
    old.metadata = { ...old.metadata, ...incoming };
    if (!old.sources.some((s) => canonical(s) === canonical(patch.source)))
      old.sources = [...old.sources, patch.source].slice(-20);
    if (patch.analysis && patch.analysisBasis) {
      if (
        cleanAbstract(patch.analysisBasis.abstract) !==
          cleanAbstract(old.metadata.abstract) ||
        (patch.analysisBasis.version !== null &&
          patch.analysisBasis.version !== old.metadata.version)
      )
        throw new PublicationValidationError(
          'Analysis basis does not match metadata',
        );
      const downgrade =
        old.analysis?.analysisDepth === 'full_text_sections' &&
        patch.analysis.analysisDepth === 'abstract';
      {
        // AI evidence is independent from the depth of mathematical analysis.
        const analysis = { ...(downgrade ? old.analysis! : patch.analysis) };
        const priorReview = old.analysis?.aiReview;
        const nextReview = patch.analysis.aiReview;
        analysis.aiReview =
          !nextReview ||
          (priorReview &&
            (Date.parse(priorReview.checkedAt) >
              Date.parse(nextReview.checkedAt) ||
              (priorReview.status === 'full_text_searched' &&
                nextReview.status !== 'full_text_searched')))
            ? priorReview
            : nextReview;
        if (patch.analysis.aiStatus === 'explicit') {
          analysis.aiStatus = 'explicit';
          analysis.aiEvidence = patch.analysis.aiEvidence;
          analysis.aiEvidenceSource = patch.analysis.aiEvidenceSource;
        }
        if (
          old.analysis?.aiStatus === 'explicit' &&
          analysis.aiStatus !== 'explicit'
        ) {
          analysis.aiStatus = 'explicit';
          analysis.aiEvidence = old.analysis.aiEvidence;
          analysis.aiEvidenceSource = old.analysis.aiEvidenceSource;
        }
        old.analysis = analysis;
        old.analysisBasis = patch.analysisBasis;
      }
    }
    entries.set(patch.arxivId, old);
  }
  for (const arxivId of known)
    if (!entries.has(arxivId))
      entries.set(arxivId, {
        arxivId,
        metadata: {},
        sources: [...categories.values()]
          .filter(
            (c) =>
              c.newIds.includes(arxivId) || c.crossListIds.includes(arxivId),
          )
          .map((c) => c.source),
        analysis: null,
        analysisBasis: null,
      });
  return recalculate({
    ...previous,
    revision: previous.revision + 1,
    listingConflicts,
    categories: [...categories.values()],
    entries: [...entries.values()].sort((a, b) =>
      a.arxivId.localeCompare(b.arxivId),
    ),
  });
}
export function legacyEntry(r: PaperReport): ProgressiveEntry {
  return {
    arxivId: r.arxivId,
    metadata: {
      title: r.title,
      authors: r.authors,
      abstract: r.abstract,
      categories: r.categories,
      primaryCategory: r.primaryCategory,
      version: r.version,
      submittedAt: r.submittedAt,
      updatedAt: r.updatedAt,
    },
    sources: [],
    analysis: analysisSchema.parse(r),
    analysisBasis: { abstract: r.abstract, version: r.version },
  };
}

export function fromLegacy(
  date: string,
  lastUpdated: string,
  reports: PaperReport[],
  complete: boolean,
): ProgressiveFeed {
  const feed = emptyFeed(date);
  feed.lastUpdated = lastUpdated;
  feed.entries = reports
    .filter((r) => r.entryKind !== 'revision')
    .map(legacyEntry);
  const keys = { mathDg: 'math.DG', mathMg: 'math.MG', mathGt: 'math.GT' };
  feed.categories = categoryKeys.map((category) => ({
    category,
    date,
    complete,
    newIds: reports
      .filter(
        (r) => r.entryKind === 'new' && r.categories.includes(keys[category]),
      )
      .map((r) => r.arxivId),
    crossListIds: reports
      .filter(
        (r) =>
          r.entryKind === 'cross_list' && r.categories.includes(keys[category]),
      )
      .map((r) => r.arxivId),
    replacementIds: [],
    source: {
      url: 'https://arxiv.org/list/' + keys[category] + '/new',
      observedAt: lastUpdated || date + 'T00:00:00Z',
      contentHash: '0'.repeat(64),
    },
  }));
  return recalculate(feed);
}
export function coverageLabel(feed: ProgressiveFeed): string {
  const c = feed.coverage;
  return c.expectedCount === null
    ? `已确认 ${c.confirmedCount} 篇，其他分类待补齐 · 解读 ${c.analyzedCount} 篇`
    : `已收录 ${c.publishedCount}/${c.expectedCount} · 解读 ${c.analyzedCount}/${c.expectedCount}${c.metadataCount < c.publishedCount ? ' · 资料待补齐' : ''}`;
}

export function formatPublicationTime(value: string): string {
  return value
    ? new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date(value))
    : '待发布';
}

export function progressiveOverview(feed: ProgressiveFeed) {
  const analyzed = feed.entries.filter((entry) => entry.analysis);
  const topics = TOPICS.map((topic) => ({
    topic,
    count: analyzed.filter((entry) => entry.analysis?.topic === topic).length,
  }))
    .filter((item) => item.count)
    .sort((a, b) => b.count - a.count);
  const highlights = analyzed
    .slice()
    .sort((a, b) => b.analysis!.priorityScore - a.analysis!.priorityScore)
    .slice(0, 3)
    .map((entry) => ({
      arxivId: entry.arxivId,
      title: entry.metadata.title ?? entry.arxivId,
      summary: entry.analysis!.breakthrough,
    }));
  return { count: analyzed.length, topics, highlights };
}
