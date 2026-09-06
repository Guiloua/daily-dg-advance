import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  STATIC_MIRROR_SCHEMA_VERSION,
  arxivSlug,
  buildStaticDay,
  buildStaticVolume,
  mergeStaticPaper,
  renderArchiveMarkdown,
  renderDailyMarkdown,
  renderPaperMarkdown,
  type StaticMirrorManifestV1,
} from '../lib/static-mirror';
import { previewReports } from '../lib/fixtures';
import type { PaperReport } from '../lib/types';
import { buildStaticPages } from '../scripts/build_static_pages';

const malicious: PaperReport = {
  ...previewReports[0],
  arxivId: 'math/0301001',
  id: '2026-09-02:math/0301001:v1',
  title: '<script>alert(1)</script> {{ site.secret }} Geometry',
  abstract: '[bad](javascript:alert(1)) and $R_{ij}$',
  arxivUrl: 'https://arxiv.org/abs/math/0301001',
  pdfUrl: 'https://arxiv.org/pdf/math/0301001',
};
const feed = {
  date: '2026-09-02',
  lastUpdated: '2026-09-02T14:05:00+08:00',
  coverage: { expectedCount: 2, publishedCount: 2, complete: true },
  reports: [previewReports[1], malicious],
};

assert.equal(arxivSlug('2609.01565'), '2609.01565');
assert.equal(arxivSlug('math/0301001'), 'math--0301001');
assert.throws(() => arxivSlug('../secret'));

const day = buildStaticDay(feed);
assert.equal(day.overview.paperCount, 2);
assert.equal(day.aiDisclosureCount, 0);
assert.throws(() =>
  buildStaticDay({
    ...feed,
    coverage: { expectedCount: 3, publishedCount: 2, complete: false },
  }),
);
const markdown = renderDailyMarkdown(day);
assert.doesNotMatch(markdown, /<script>/);
assert.doesNotMatch(markdown, /\{\{ site\.secret \}\}/);
assert.match(markdown, /未见 AI 协作声明/);
assert.match(markdown, /原始英文摘要/);

const paper = mergeStaticPaper(undefined, malicious);
const updatedPaper = mergeStaticPaper(paper, {
  ...malicious,
  announcementDate: '2026-09-03',
  version: 2,
  entryKind: 'revision',
  revisionSummary: 'Strengthened theorem.',
});
assert.equal(updatedPaper.history.length, 2);
assert.equal(updatedPaper.latest.version, 2);

const volume = buildStaticVolume([
  { announcementDate: '2026-08-31', mathDg: 3, mathMg: 1, mathGt: 2 },
  { announcementDate: '2026-09-01', mathDg: 2, mathMg: 2, mathGt: 1 },
  { announcementDate: '2026-09-04', mathDg: 4, mathMg: 1, mathGt: 3 },
]);
assert.equal(volume.weeks26.length, 1);
assert.deepEqual(volume.weeks26[0], {
  weekStart: '2026-08-31',
  weekEnding: '2026-09-04',
  mathDg: 9,
  mathMg: 4,
  mathGt: 6,
});

const root = await mkdtemp(join(tmpdir(), 'geometry-static-test-'));
const content = join(root, 'content');
const out = join(root, 'out');
await mkdir(join(content, 'data/daily'), { recursive: true });
await mkdir(join(content, 'data/papers'), { recursive: true });
await mkdir(join(content, 'daily'), { recursive: true });
await mkdir(join(content, 'papers'), { recursive: true });
const manifest: StaticMirrorManifestV1 = {
  schemaVersion: STATIC_MIRROR_SCHEMA_VERSION,
  latestDate: day.announcementDate,
  generatedAt: day.lastUpdated,
  days: [
    {
      announcementDate: day.announcementDate,
      expectedCount: 2,
      publishedCount: 2,
      aiDisclosureCount: 0,
      complete: true,
      lastUpdated: day.lastUpdated,
    },
  ],
};
const papers = day.reports.map((report) => mergeStaticPaper(undefined, report));
const saveJson = (path: string, value: unknown) =>
  writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
await saveJson(join(content, 'data/manifest.json'), manifest);
await saveJson(join(content, 'data/volume.json'), volume);
await saveJson(join(content, `data/daily/${day.announcementDate}.json`), day);
await writeFile(join(content, `daily/${day.announcementDate}.md`), markdown);
await writeFile(join(content, 'index.md'), markdown);
await writeFile(join(content, 'archive.md'), renderArchiveMarkdown(manifest));
for (const item of papers) {
  await saveJson(join(content, `data/papers/${item.slug}.json`), item);
  await writeFile(
    join(content, `papers/${item.slug}.md`),
    renderPaperMarkdown(item),
  );
}

await buildStaticPages({
  content,
  out,
  basePath: '/daily-dg-advance',
});
const html = await readFile(join(out, 'index.html'), 'utf8');
assert.match(html, /\/daily-dg-advance\/papers\/math--0301001\//);
assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
assert.doesNotMatch(html, /href=["']javascript:/);
assert.match(html, /data-filters/);
assert.match(html, /data-chart/);
assert.match(html, /实时站点/);
execFileSync(process.execPath, ['scripts/check_static_runtime.mjs', out]);
const scriptPath = html.match(/src="\/daily-dg-advance\/(assets\/site\.[a-f0-9]{16}\.js)"/)?.[1];
assert.ok(scriptPath);
assert.match(await readFile(join(out, scriptPath), 'utf8'), /weeks104/);
assert.doesNotMatch(html, /mirror-data|markdown-copy/);
assert.match(html, /download>下载 Markdown/);
assert.match(html, /assets\/site\.[a-f0-9]{16}\.css/);
assert.match(await readFile(join(out, `daily/${day.announcementDate}.md`), 'utf8'), /./);
assert.match(
  await readFile(join(out, 'archive/index.html'), 'utf8'),
  /\/daily-dg-advance\/daily\/2026-09-02\//,
);

console.log('Static mirror tests passed');
