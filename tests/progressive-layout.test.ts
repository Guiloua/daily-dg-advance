import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { previewReports } from '../lib/fixtures';
import { fromLegacy, recalculate } from '../lib/progressive';
import { buildStaticVolume } from '../lib/static-mirror';
import { buildStaticPages } from '../scripts/build_static_pages';

const root = await mkdtemp(join(tmpdir(), 'progressive-layout-'));
try {
  const content = join(root, 'content');
  const out = join(root, 'site');
  await mkdir(join(content, 'data/daily'), { recursive: true });
  const feed = fromLegacy(
    '2026-09-14',
    '2026-09-14T05:08:03.422Z',
    [
      ...previewReports,
      {
        ...previewReports[0],
        arxivId: 'math/0301001',
        title: '<script>bad</script> $R_{ij}$',
        priorityScore: 40,
        priorityTier: 'low',
        lowPriorityReason: '特定算例，适用范围有限。',
      },
      {
        ...previewReports[0],
        arxivId: '2609.00002',
        aiStatus: 'explicit',
        aiEvidence: 'AI statement',
        aiEvidenceSource: 'Acknowledgements',
      },
      {
        ...previewReports[0],
        arxivId: '2609.00003',
        title: 'Pending analysis',
      },
    ],
    true,
  );
  // Today's real bug path: all listing content is present but metadata is partial.
  for (const e of feed.entries) {
    delete e.metadata.submittedAt;
    delete e.metadata.updatedAt;
  }
  feed.entries[0].analysis!.limitations =
    '已读 PDF 第 1–4 页，尚未核验正文证明；仅适用于严格正曲率。 AI 披露以独立核查记录为准。';
  const pending = feed.entries.at(-1)!;
  delete pending.metadata.version;
  pending.analysis = null;
  pending.analysisBasis = null;
  const disclosed = feed.entries.find((e) => e.arxivId === '2609.00002')!;
  disclosed.analysis!.aiUsage = ['writing', 'literature'];
  disclosed.analysis!.aiReview = {
    status: 'full_text_searched',
    checkedAt: currentTime(),
    version: disclosed.metadata.version!,
    sourceUrl: 'https://arxiv.org/pdf/2609.00002v1',
    contentHash: 'a'.repeat(64),
    pages: 10,
    note: '全部页面检索，核对第 10 页致谢；不代表数学证明已审读。',
  };
  const current = recalculate(feed);
  await writeFile(
    join(content, 'data/manifest.json'),
    JSON.stringify({
      schemaVersion: 2,
      latestDate: current.date,
      generatedAt: current.lastUpdated,
      days: [{ announcementDate: current.date }],
    }),
  );
  await writeFile(
    join(content, `data/daily/${current.date}.json`),
    JSON.stringify(current),
  );
  await writeFile(
    join(content, 'data/volume.json'),
    JSON.stringify(buildStaticVolume([])),
  );
  await buildStaticPages({ content, out, basePath: '/daily-dg-advance' });
  const html = await readFile(join(out, 'index.html'), 'utf8');
  assert.match(
    html,
    /<header class="site-header">/,
    'V2 must use the reading layout',
  );
  assert.match(html, /class="page-head"/);
  assert.match(html, /更新时间：2026-09-14 13:08/);
  assert.doesNotMatch(html, /05:08:03|镜像快照时间/);
  assert.match(html, /已收录 6\/6/);
  assert.match(html, /解读 5\/6/);
  assert.doesNotMatch(html, /完整收录/);
  assert.match(html, /提交时间（6 篇）/);
  assert.match(html, /版本（1 篇）/);
  for (const heading of ['主要方向与技术进展', '可能的突破点', 'AI 技术声明'])
    assert.ok(html.includes(heading));
  assert.match(html, /5 篇已解读论文/);
  assert.match(html, /摘要级分析/);
  assert.match(html, /data-ai-group="unknown"/);
  assert.match(html, /data-ai-group="explicit"/);
  assert.match(html, /全文已检索 1\/6/);
  assert.match(html, /待完成核查 5 篇/);
  assert.match(html, /辅助写作与排版：1 篇/);
  const writingList =
    html.match(/<details data-ai-usage="writing">([\s\S]*?)<\/details>/)?.[1] ??
    '';
  assert.match(writingList, /<summary>辅助写作与排版：1 篇<\/summary>/);
  assert.match(writingList, /href="\/daily-dg-advance\/papers\/2609.00002\/"/);
  assert.equal((writingList.match(/<li>/g) ?? []).length, 1);
  assert.doesNotMatch(writingList, /papers\/2609.01565/);
  assert.doesNotMatch(html, /<details data-ai-usage="[^"]+" open/);

  assert.match(html, /资料收集与文献检索：1 篇/);
  assert.match(html, /核心想法与研究路线：0 篇/);
  assert.match(html, /仅适用于严格正曲率/);
  assert.doesNotMatch(
    html,
    /已读 PDF 第 1–4 页|AI 披露以独立核查记录为准|<h3>需谨慎处/,
  );
  assert.match(html, /全部页面检索，核对第 10 页致谢/);
  assert.equal((html.match(/class="topic-group"/g) ?? []).length, 5);
  assert.equal((html.match(/class="paper" data-paper/g) ?? []).length, 6);
  assert.ok(
    html.indexOf('papers/2609.01565/') < html.indexOf('papers/math--0301001/'),
    'Low priority sorts last within its topic',
  );
  assert.ok(
    html.lastIndexOf('data-paper ') < html.indexOf('class="trend"'),
    'Trend must follow every paper',
  );
  assert.equal((html.match(/data-empty/g) ?? []).length, 1);
  assert.match(html, /class="chart" data-chart/);
  assert.match(html, /assets\/site\.[a-f0-9]{16}\.css/);
  assert.match(html, /assets\/site\.[a-f0-9]{16}\.js/);
  assert.match(html, /daily\/2026-09-14.md" download/);
  assert.doesNotMatch(html, /<script>bad|href="javascript:|undefined|NaN/);
  assert.match(html, /class="katex/);
  const detail = await readFile(
    join(out, 'papers/math--0301001/index.html'),
    'utf8',
  );
  assert.match(detail, /site-header/);
  assert.match(detail, /提交时间：待补齐/);
  assert.match(detail, /特定算例，适用范围有限/);
  const archive = await readFile(join(out, 'archive/index.html'), 'utf8');
  assert.match(archive, /site-header/);
  assert.match(archive, /archive-page/);
  console.log(
    'Progressive reading layout, partial status, grouping, assets, and detail regressions passed.',
  );
} finally {
  await rm(root, { recursive: true, force: true });
}

function currentTime() {
  return '2026-09-14T05:08:03.422Z';
}
