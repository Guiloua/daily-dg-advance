import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { previewReports } from '../lib/fixtures';
import {
  fromLegacy,
  recalculate,
  type ProgressiveFeed,
} from '../lib/progressive';
import {
  buildStaticDay,
  buildStaticVolume,
  mergeStaticPaper,
} from '../lib/static-mirror';
import { buildStaticPages } from '../scripts/build_static_pages';
import { syncProgressive } from '../scripts/progressive_static';

const root = await mkdtemp(join(tmpdir(), 'all-dates-'));
const originalFetch = globalThis.fetch;
const save = async (path: string, value: unknown) =>
  writeFile(path, JSON.stringify(value));
const report = (date: string, id: string) => ({
  ...previewReports[0],
  announcementDate: date,
  arxivId: id,
  title: `Article ${id}`,
});
const cards = (html: string) =>
  (html.match(/class="paper" data-paper/g) ?? []).length;

try {
  const content = join(root, 'content');
  const out = join(root, 'out');
  await mkdir(join(content, 'data/daily'), { recursive: true });
  const feeds: ProgressiveFeed[] = [];
  for (let index = 1; index <= 12; index++) {
    const date = `2026-09-${String(index).padStart(2, '0')}`;
    const reports = [report(date, `2609.${String(index).padStart(5, '0')}`)];
    if (index === 1) {
      reports[0].aiStatus = 'explicit';
      reports[0].aiEvidence =
        'The authors acknowledge AI assistance with writing.';
      reports[0].aiEvidenceSource = 'Acknowledgements';
    }
    feeds.push(fromLegacy(date, date + 'T04:00:00Z', reports, true));
  }
  const latest = feeds.at(-1)!;
  const duplicate = structuredClone(latest.entries[0]);
  duplicate.metadata.title = 'Outdated duplicate';
  feeds[0].entries.push(duplicate);
  feeds[0] = recalculate(feeds[0]);
  const pending = structuredClone(latest.entries[0]);
  pending.arxivId = '2609.00099';
  pending.metadata.title = 'Pending historical analysis';
  pending.analysis = null;
  pending.analysisBasis = null;
  latest.entries.push(pending);
  feeds[feeds.length - 1] = recalculate(latest);
  for (const feed of feeds)
    await save(join(content, `data/daily/${feed.date}.json`), feed);
  // The rolling index omits both older V2 days and a legacy V1 snapshot.
  const legacy = buildStaticDay({
    date: '2026-08-20',
    lastUpdated: '2026-08-20T04:00:00Z',
    coverage: { complete: true, publishedCount: 1, expectedCount: 1 },
    reports: [report('2026-08-20', '2608.00001')],
  });
  await save(join(content, 'data/daily/2026-08-20.json'), legacy);
  await save(join(content, 'data/manifest.json'), {
    schemaVersion: 2,
    latestDate: latest.date,
    generatedAt: latest.lastUpdated,
    days: [{ announcementDate: latest.date }],
  });
  await save(join(content, 'data/volume.json'), buildStaticVolume([]));
  const result = await buildStaticPages({
    content,
    out,
    basePath: '/daily-dg-advance',
  });
  assert.equal(result.days, 13);
  assert.equal(result.papers, 14);
  const all = await readFile(join(out, 'all/index.html'), 'utf8');
  assert.equal(cards(all), 14, 'Every unique historical paper appears once');
  assert.match(all, /2026-08-20 至 2026-09-12 · 13 个公告日 · 14 篇文章/);
  assert.equal((all.match(/data-ai-group=/g) ?? []).length, 2);
  assert.match(all, /<h2>披露 AI<\/h2>/);
  assert.match(all, /<h2>未见 AI 披露<\/h2>/);
  assert.match(all, /data-ai="unknown"/);
  assert.match(all, /data-priority="pending"/);
  assert.match(all, /待完成核查/);
  assert.match(all, /value="all" selected>所有日期/);
  assert.doesNotMatch(all, /Outdated duplicate|undefined|NaN/);
  assert.match(
    all,
    /公告日：<a href="\/daily-dg-advance\/daily\/2026-08-20\/">/,
  );
  for (const path of [
    'index.html',
    'archive/index.html',
    'daily/2026-08-20/index.html',
    'papers/2608.00001/index.html',
  ]) {
    assert.match(
      await readFile(join(out, path), 'utf8'),
      /href="\/daily-dg-advance\/all\/">所有日期/,
    );
  }
  const historical = fromLegacy(
    '2026-08-19',
    '2026-08-19T04:00:00Z',
    [report('2026-08-19', '2608.00002')],
    true,
  );
  const requests: string[] = [];
  globalThis.fetch = async (input) => {
    const url = new URL(input instanceof Request ? input.url : input);
    requests.push(url.pathname + url.search);
    const value =
      url.pathname === '/api/volume'
        ? { points: [] }
        : url.searchParams.has('dates')
          ? { dates: [latest.date, historical.date] }
          : url.searchParams.get('date') === latest.date
            ? feeds.at(-1)
            : url.searchParams.get('date') === historical.date
              ? historical
              : null;
    assert.ok(value, 'Unexpected fetch ' + url);
    return new Response(JSON.stringify(value), {
      headers: { 'content-type': 'application/json' },
    });
  };
  const synced = await syncProgressive({
    site: 'https://example.test',
    output: content,
    days: 1,
  });
  assert.equal(
    synced.days,
    14,
    'Refresh limit must never truncate the archive',
  );
  assert.ok(
    requests.includes('/api/reports/v2?date=2026-08-19'),
    'Fetch a missing historical day even after the refresh limit',
  );
  const manifest = JSON.parse(
    await readFile(join(content, 'data/manifest.json'), 'utf8'),
  );
  assert.equal(manifest.days.length, 14);
  assert.equal(manifest.days.at(-1).announcementDate, historical.date);
  await syncProgressive({
    site: 'https://example.test',
    output: content,
    days: 1,
  });
  assert.equal(
    JSON.parse(await readFile(join(content, 'data/manifest.json'), 'utf8')).days
      .length,
    14,
  );
  await buildStaticPages({ content, out, basePath: '' });
  assert.equal(cards(await readFile(join(out, 'all/index.html'), 'utf8')), 15);

  // V1 exposes the same route, grouping, date links, and latest-paper deduplication.
  const v1 = join(root, 'v1');
  await mkdir(join(v1, 'data/daily'), { recursive: true });
  await mkdir(join(v1, 'data/papers'), { recursive: true });
  const oldReport = report('2026-08-20', '2608.00001');
  const revised = {
    ...oldReport,
    announcementDate: '2026-09-01',
    version: 2,
    title: 'Latest legacy article',
    aiStatus: 'explicit' as const,
    aiEvidence: 'The authors acknowledge AI assistance with writing.',
    aiEvidenceSource: 'Acknowledgements',
  };
  const latestDay = buildStaticDay({
    date: revised.announcementDate,
    lastUpdated: '2026-09-01T04:00:00Z',
    coverage: { complete: true, publishedCount: 2, expectedCount: 2 },
    reports: [revised, report('2026-09-01', '2609.00002')],
  });
  const paper = mergeStaticPaper(
    mergeStaticPaper(undefined, oldReport),
    revised,
  );
  await save(join(v1, 'data/papers/2608.00001.json'), paper);
  const other = latestDay.reports.find((r) => r.arxivId === '2609.00002')!;
  await save(
    join(v1, 'data/papers/2609.00002.json'),
    mergeStaticPaper(undefined, other),
  );
  await save(join(v1, 'data/daily/2026-08-20.json'), legacy);
  await save(join(v1, 'data/daily/2026-09-01.json'), latestDay);
  await save(join(v1, 'data/manifest.json'), {
    schemaVersion: 1,
    latestDate: latestDay.announcementDate,
    days: [{ announcementDate: latestDay.announcementDate }],
  });
  await save(join(v1, 'data/volume.json'), buildStaticVolume([]));
  await buildStaticPages({ content: v1, out, basePath: '/daily-dg-advance' });
  const v1All = await readFile(join(out, 'all/index.html'), 'utf8');
  assert.equal(cards(v1All), 2);
  assert.match(v1All, /Latest legacy article/);
  assert.match(v1All, /<h2>披露 AI<\/h2>/);
  assert.match(v1All, /<h2>未见 AI 披露<\/h2>/);
  assert.match(
    await readFile(join(out, 'archive/index.html'), 'utf8'),
    /daily\/2026-08-20\//,
  );
  console.log(
    'All-date history recovery, retention, deduplication, disclosure grouping, and V1/V2 builds passed.',
  );
} finally {
  globalThis.fetch = originalFetch;
  await rm(root, { recursive: true, force: true });
}
