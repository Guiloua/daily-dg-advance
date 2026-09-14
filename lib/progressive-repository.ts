import { env } from 'cloudflare:workers';
import { loadReportFeed, getPaper } from './repository';
import {
  PublicationConflict,
  PublicationValidationError,
  digest,
  canonical,
  emptyFeed,
  fromLegacy,
  mergePublication,
  publicationContent,
  type ProgressiveFeed,
  type Publication,
} from './progressive';

function database() {
  if (!env.DB) throw new Error('Database unavailable');
  return env.DB;
}
export async function readProgressive(date?: string): Promise<ProgressiveFeed> {
  const db = database();
  const selected =
    date ??
    (
      await db
        .prepare(
          'SELECT MAX(date) AS date FROM (SELECT date FROM publication_days UNION ALL SELECT announcement_date AS date FROM report_entries)',
        )
        .first<{ date: string }>()
    )?.date;
  if (!selected) return emptyFeed(new Date().toISOString().slice(0, 10));
  const row = await db
    .prepare('SELECT snapshot_json FROM publication_days WHERE date=?')
    .bind(selected)
    .first<{ snapshot_json: string }>();
  if (row) return JSON.parse(row.snapshot_json);
  const legacy = await loadReportFeed(selected);
  return fromLegacy(
    selected,
    legacy.lastUpdated,
    legacy.reports,
    legacy.coverage.complete,
  );
}
export async function progressiveDates(): Promise<string[]> {
  const rows = await database()
    .prepare(
      'SELECT date FROM (SELECT date FROM publication_days UNION SELECT announcement_date AS date FROM report_entries) ORDER BY date DESC',
    )
    .all<{ date: string }>();
  return rows.results.map((r) => r.date);
}
export async function readProgressivePaper(arxivId: string) {
  const row = await database()
    .prepare(
      'SELECT date, entry_json FROM publication_history WHERE arxiv_id=? ORDER BY date DESC,revision DESC LIMIT 1',
    )
    .bind(arxivId)
    .first<{ date: string; entry_json: string }>();
  if (row)
    return {
      entry: JSON.parse(
        row.entry_json,
      ) as import('./progressive').ProgressiveEntry,
      date: row.date,
    };
  const old = await getPaper(arxivId);
  if (!old) return null;
  return {
    entry: fromLegacy(old.announcementDate, old.updatedAt, [old], false)
      .entries[0],
    date: old.announcementDate,
  };
}
export async function receipt(publicationId: string) {
  return database()
    .prepare(
      'SELECT content_hash,snapshot_json FROM publication_receipts WHERE publication_id=?',
    )
    .bind(publicationId)
    .first<{ content_hash: string; snapshot_json: string }>();
}
export async function publishProgressive(batch: Publication) {
  const hash = await digest(publicationContent(batch));
  if (hash !== batch.contentHash)
    throw new PublicationValidationError('Content hash mismatch');
  const existing = await receipt(batch.publicationId);
  if (existing) {
    if (existing.content_hash !== hash)
      throw new PublicationConflict(
        'Publication ID already used with different content',
      );
    return JSON.parse(existing.snapshot_json) as ProgressiveFeed;
  }
  const previous = await readProgressive(batch.date);
  let next = mergePublication(previous, batch);
  const comparable = (feed: ProgressiveFeed) => ({
    ...feed,
    revision: 0,
    lastUpdated: '',
    contentHash: '',
    listingConflicts: feed.listingConflicts ?? [],
  });
  const changed =
    canonical(comparable(previous)) !== canonical(comparable(next));
  if (changed) {
    next.lastUpdated = new Date().toISOString();
    next.contentHash = await digest({ ...next, contentHash: '' });
  } else next = previous;
  const serialized = JSON.stringify(next);
  const db = database();
  // The CHECK constraint makes a stale revision abort the entire D1 batch.
  const statements = [
    db
      .prepare(
        `INSERT INTO publication_receipts (publication_id,content_hash,date,revision,snapshot_json,accepted) VALUES (?,?,?,?,?,CASE WHEN COALESCE((SELECT revision FROM publication_days WHERE date=?),0)=? THEN 1 ELSE 0 END)`,
      )
      .bind(
        batch.publicationId,
        hash,
        batch.date,
        next.revision,
        serialized,
        batch.date,
        batch.baseRevision,
      ),
    db
      .prepare(
        'INSERT INTO publication_days(date,revision,snapshot_json) VALUES(?,?,?) ON CONFLICT(date) DO UPDATE SET revision=excluded.revision,snapshot_json=excluded.snapshot_json',
      )
      .bind(batch.date, next.revision, serialized),
  ];
  for (const entry of changed ? next.entries : [])
    statements.push(
      db
        .prepare(
          'INSERT INTO publication_history(id,date,arxiv_id,revision,entry_json) VALUES(?,?,?,?,?)',
        )
        .bind(
          `${batch.date}:${entry.arxivId}:${next.revision}`,
          batch.date,
          entry.arxivId,
          next.revision,
          JSON.stringify(entry),
        ),
    );
  if (changed && next.coverage.listingsComplete) {
    const counts = ['mathDg', 'mathMg', 'mathGt'].map((key) => {
      const c = next.categories.find((c) => c.category === key)!;
      return c.newIds.length + c.crossListIds.length;
    });
    statements.push(
      db
        .prepare(
          'INSERT INTO daily_volume(announcement_date,math_dg,math_mg,math_gt,total_unique,crosslist_overlap,collected_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(announcement_date) DO UPDATE SET math_dg=excluded.math_dg,math_mg=excluded.math_mg,math_gt=excluded.math_gt,total_unique=excluded.total_unique,crosslist_overlap=excluded.crosslist_overlap,collected_at=excluded.collected_at',
        )
        .bind(
          batch.date,
          ...counts,
          next.coverage.confirmedCount,
          counts.reduce((a, b) => a + b, 0) - next.coverage.confirmedCount,
          next.lastUpdated,
        ),
    );
  }
  try {
    await db.batch(statements);
  } catch (error) {
    const concurrent = await receipt(batch.publicationId);
    if (concurrent?.content_hash === hash)
      return JSON.parse(concurrent.snapshot_json) as ProgressiveFeed;
    const current = await readProgressive(batch.date);
    if (current.revision !== batch.baseRevision || concurrent)
      throw new PublicationConflict('Publication revision changed');
    throw error;
  }
  return next;
}
