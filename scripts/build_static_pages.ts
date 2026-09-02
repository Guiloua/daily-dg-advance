import {
  access,
  cp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import {
  STATIC_MIRROR_SCHEMA_VERSION,
  arxivSlug,
  type StaticDayV1,
  type StaticMirrorManifestV1,
  type StaticPaperV1,
  type StaticVolumeV1,
} from '../lib/static-mirror';
import { TOPICS, type PaperReport } from '../lib/types';
import { paperReportSchema } from '../lib/validation';

interface Args {
  content: string;
  out: string;
  basePath: string;
}

function parseArgs(argv: string[]): Args {
  const values = new Map<string, string>();
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith('--') || !value)
      throw new Error(`Invalid argument ${key}`);
    values.set(key.slice(2), value);
  }
  const content = values.get('content');
  const out = values.get('out');
  if (!content || !out) {
    throw new Error(
      'Usage: build_static_pages.ts --content <dir> --out <dir> [--base-path /daily-dg-advance]',
    );
  }
  const rawBase = values.get('base-path') ?? '/daily-dg-advance';
  const basePath =
    rawBase === '/' ? '' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;
  return { content: resolve(content), out: resolve(out), basePath };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function scriptJson(value: unknown): string {
  return JSON.stringify(value)
    .replaceAll('<', '\\u003c')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029');
}

function markdownToHtml(markdown: string): string {
  return renderToStaticMarkup(
    createElement(
      ReactMarkdown,
      {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
      markdown,
    ),
  );
}

function pathUrl(basePath: string, value = ''): string {
  const suffix = value.replace(/^\/+/, '');
  return `${basePath}/${suffix}`.replace(/\/{2,}/g, '/');
}

function paperUrl(basePath: string, arxivId: string): string {
  return pathUrl(basePath, `papers/${arxivSlug(arxivId)}/`);
}

function priorityLabel(report: PaperReport): string {
  if (report.priorityTier === 'high') return '高优先级';
  if (report.priorityTier === 'medium') return '中优先级';
  return '低阅读优先级';
}

function renderPaperCard(report: PaperReport, basePath: string): string {
  const search = [
    report.title,
    ...report.authors,
    report.abstract,
    report.workSummary,
  ]
    .join(' ')
    .toLocaleLowerCase('zh-CN');
  return `<article class="paper" data-paper data-ai="${report.aiStatus}" data-topic="${escapeHtml(report.topic)}" data-priority="${report.priorityTier}" data-search="${escapeHtml(search)}">
  <div class="paper-meta"><span>${escapeHtml(report.categories.join(' · '))}</span><span>${report.priorityScore} · ${priorityLabel(report)}</span></div>
  <p class="progress">${escapeHtml(report.progressType)}</p>
  <h4><a href="${paperUrl(basePath, report.arxivId)}">${escapeHtml(report.title)}</a></h4>
  <p class="authors">${escapeHtml(report.authors.join(' · '))}</p>
  <dl>
    <div><dt>完成的工作</dt><dd>${escapeHtml(report.workSummary)}</dd></div>
    <div><dt>技术</dt><dd>${escapeHtml(report.techniques.join(' · '))}</dd></div>
    <div><dt>可能的突破</dt><dd>${escapeHtml(report.breakthrough)}</dd></div>
    <div><dt>需谨慎处</dt><dd>${escapeHtml(report.limitations)}</dd></div>
    <div><dt>排序理由</dt><dd>${escapeHtml(report.lowPriorityReason ?? report.priorityReason)}</dd></div>
  </dl>
  <a class="detail-link" href="${paperUrl(basePath, report.arxivId)}">完整分析 →</a>
</article>`;
}

function renderInteractiveReports(day: StaticDayV1, basePath: string): string {
  const groups = ['no_disclosure_observed', 'explicit']
    .map((aiStatus) => {
      const reports = day.reports.filter(
        (report) => report.aiStatus === aiStatus,
      );
      if (!reports.length) return '';
      const topics = TOPICS.map((topic) => {
        const topicReports = reports.filter((report) => report.topic === topic);
        if (!topicReports.length) return '';
        return `<section class="topic-group" data-group data-ai="${aiStatus}" data-topic="${escapeHtml(topic)}">
          <div class="topic-heading"><h3>${escapeHtml(topic)}</h3><span data-group-count>${topicReports.length}</span></div>
          ${topicReports.map((report) => renderPaperCard(report, basePath)).join('\n')}
        </section>`;
      }).join('\n');
      return `<section class="ai-group" data-ai-group="${aiStatus}">
        <h2>${aiStatus === 'explicit' ? '明确披露 AI 协作' : '未见 AI 协作声明'}</h2>
        ${topics}
      </section>`;
    })
    .join('\n');
  return `${groups}<p class="empty" data-empty hidden>当前筛选条件下没有论文。</p>`;
}

function renderControls(
  day: StaticDayV1,
  manifest: StaticMirrorManifestV1,
): string {
  return `<form class="filters" data-filters>
    <label><span>公告日</span><select name="date" data-date>${manifest.days
      .map(
        (entry) =>
          `<option value="${entry.announcementDate}"${entry.announcementDate === day.announcementDate ? ' selected' : ''}>${entry.announcementDate}</option>`,
      )
      .join('')}</select></label>
    <label class="search"><span>搜索</span><input name="q" type="search" placeholder="题目、作者或摘要" autocomplete="off"></label>
    <label><span>主题</span><select name="topic"><option value="all">全部主题</option>${TOPICS.map((topic) => `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`).join('')}</select></label>
    <label><span>AI 状态</span><select name="ai"><option value="all">全部</option><option value="no_disclosure_observed">未见声明</option><option value="explicit">明确披露</option></select></label>
    <label><span>优先级</span><select name="priority"><option value="all">全部</option><option value="high">高</option><option value="medium">中</option><option value="low">低</option></select></label>
  </form>`;
}

function renderOverview(day: StaticDayV1): string {
  const breakthroughs = day.overview.breakthroughPoints.length
    ? day.overview.breakthroughPoints
        .map(
          (item) =>
            `<li><strong>${escapeHtml(item.title)}</strong>：${escapeHtml(item.summary)}</li>`,
        )
        .join('')
    : '<li>本期没有足够证据支持单独标注突破点。</li>';
  const cautions = day.overview.cautions.length
    ? day.overview.cautions
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join('')
    : '<li>仍建议回查原论文的精确定理、假设和证明细节。</li>';
  return `<section class="overview">
    <div><p class="eyebrow">Daily synthesis</p><h2>当日总览</h2></div>
    <div class="overview-row"><h3>主要方向与技术进展</h3><div>${day.overview.mainProgress.map((item) => `<p>${escapeHtml(item)}</p>`).join('')}</div></div>
    <div class="overview-row"><h3>可能的突破点</h3><ul>${breakthroughs}</ul></div>
    <div class="overview-row"><h3>需谨慎处</h3><ul>${cautions}</ul></div>
  </section>`;
}

function layout(options: {
  title: string;
  description: string;
  body: string;
  basePath: string;
  data?: unknown;
}): string {
  const { title, description, body, basePath, data } = options;
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}">
<link rel="stylesheet" href="${pathUrl(basePath, 'assets/site.css')}"><link rel="stylesheet" href="${pathUrl(basePath, 'assets/katex/katex.min.css')}"></head>
<body data-base-path="${escapeHtml(basePath)}"><header class="site-header"><div><a class="brand" href="${pathUrl(basePath)}"><i>G.</i><span>几何前沿日报</span></a><nav><a href="${pathUrl(basePath, 'archive/')}">日期归档</a><a href="https://geometry-arxiv-daily-jch.zychern672259.chatgpt.site/">实时站点</a></nav></div></header>
<main>${body}</main><footer>静态只读镜像 · 自动生成的阅读指南，关键结论请回查原论文。</footer>
${data === undefined ? '' : `<script id="mirror-data" type="application/json">${scriptJson(data)}</script>`}<script src="${pathUrl(basePath, 'assets/site.js')}" defer></script></body></html>`;
}

function renderDayPage(
  day: StaticDayV1,
  manifest: StaticMirrorManifestV1,
  volume: StaticVolumeV1,
  markdownHtml: string,
  basePath: string,
): string {
  const body = `<div class="page-head"><p class="eyebrow">${day.announcementDate}</p><h1>今日值得读什么</h1><p>完整收录 ${day.coverage.publishedCount} / ${day.coverage.expectedCount} · 明确披露 AI 协作 ${day.aiDisclosureCount} 篇</p></div>
  ${renderOverview(day)}
  <section class="reports"><div class="section-head"><h2>全部论文</h2><p>按主题与阅读优先级排列</p></div>${renderControls(day, manifest)}<div data-report-list>${renderInteractiveReports(day, basePath)}</div></section>
  <section class="trend"><div class="section-head"><div><p class="eyebrow">Publication pulse</p><h2>每周发文趋势</h2></div><button type="button" data-trend-toggle>展开至 2 年</button></div><p>仅统计 math.DG、math.MG、math.GT 的 New submissions 与 Cross-lists；修订不计入。</p><div class="trend-legend"><span class="dg">math.DG</span><span class="mg">math.MG</span><span class="gt">math.GT</span></div><div class="chart" data-chart></div></section>
  <details class="markdown-copy"><summary>查看 Markdown 版全文</summary><div class="markdown-body">${markdownHtml}</div></details>`;
  return layout({
    title: `${day.announcementDate} · 几何前沿日报`,
    description: `${day.announcementDate} 的 DG、MG、GT 完整日报`,
    body,
    basePath,
    data: { day, manifest, volume },
  });
}

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf8')) as T;
}

async function writePage(path: string, html: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, html, 'utf8');
}

async function htmlFilesBelow(path: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFilesBelow(child)));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(child);
  }
  return files;
}

async function validateBuiltLinks(
  out: string,
  basePath: string,
): Promise<void> {
  const localPrefix = `${basePath}/`.replace(/\/{2,}/g, '/');
  for (const file of await htmlFilesBelow(out)) {
    const html = await readFile(file, 'utf8');
    for (const match of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
      const href = match[1];
      if (!href || href.startsWith('#') || /^(?:https?:|mailto:)/.test(href))
        continue;
      if (!href.startsWith(localPrefix)) {
        throw new Error(`Link escapes Pages base path in ${file}: ${href}`);
      }
      let relative = decodeURIComponent(href.slice(localPrefix.length)).split(
        /[?#]/,
        1,
      )[0];
      if (!relative || relative.endsWith('/'))
        relative = `${relative}index.html`;
      await access(join(out, relative));
    }
  }
}

function validateContent(
  manifest: StaticMirrorManifestV1,
  days: StaticDayV1[],
  volume: StaticVolumeV1,
  papers: StaticPaperV1[],
): void {
  if (
    manifest.schemaVersion !== STATIC_MIRROR_SCHEMA_VERSION ||
    volume.schemaVersion !== STATIC_MIRROR_SCHEMA_VERSION
  ) {
    throw new Error('Unsupported static mirror schema version');
  }
  if (
    !manifest.days.length ||
    manifest.latestDate !== manifest.days[0].announcementDate
  ) {
    throw new Error(
      'Manifest latest date does not match the first archived day',
    );
  }
  const ids = new Set<string>();
  const paperById = new Map(papers.map((paper) => [paper.arxivId, paper]));
  for (const day of days) {
    if (
      day.schemaVersion !== STATIC_MIRROR_SCHEMA_VERSION ||
      !day.coverage.complete
    )
      throw new Error(`Incomplete static day ${day.announcementDate}`);
    const nonRevisions = day.reports.filter(
      (report) => report.entryKind !== 'revision',
    );
    if (
      nonRevisions.length !== day.coverage.expectedCount ||
      day.coverage.publishedCount !== day.coverage.expectedCount
    )
      throw new Error(`Coverage mismatch on ${day.announcementDate}`);
    day.reports.forEach((report) => {
      if (!paperReportSchema.safeParse(report).success)
        throw new Error(
          `Invalid report ${report.arxivId} on ${day.announcementDate}`,
        );
      ids.add(report.arxivId);
      const paper = paperById.get(report.arxivId);
      if (
        !paper?.history.some(
          (item) =>
            item.announcementDate === day.announcementDate &&
            item.report.version === report.version,
        )
      ) {
        throw new Error(
          `Paper history does not cover ${report.arxivId} on ${day.announcementDate}`,
        );
      }
    });
  }
  const paperIds = new Set(papers.map((paper) => paper.arxivId));
  for (const id of ids)
    if (!paperIds.has(id)) throw new Error(`Missing paper record for ${id}`);
  for (const point of volume.points) {
    if (
      [point.mathDg, point.mathMg, point.mathGt].some(
        (value) => !Number.isInteger(value) || value < 0,
      )
    )
      throw new Error(`Invalid volume point ${point.announcementDate}`);
  }
}

export async function buildStaticPages(args: Args): Promise<{
  latestDate: string;
  days: number;
  papers: number;
}> {
  const manifest = await readJson<StaticMirrorManifestV1>(
    join(args.content, 'data/manifest.json'),
  );
  const volume = await readJson<StaticVolumeV1>(
    join(args.content, 'data/volume.json'),
  );
  const days = await Promise.all(
    manifest.days.map((entry) =>
      readJson<StaticDayV1>(
        join(args.content, `data/daily/${entry.announcementDate}.json`),
      ),
    ),
  );
  const paperFiles = (await readdir(join(args.content, 'data/papers'))).filter(
    (name) => name.endsWith('.json'),
  );
  const papers = await Promise.all(
    paperFiles.map((name) =>
      readJson<StaticPaperV1>(join(args.content, 'data/papers', name)),
    ),
  );
  validateContent(manifest, days, volume, papers);

  await rm(args.out, { recursive: true, force: true });
  await mkdir(join(args.out, 'assets/katex'), { recursive: true });
  await cp(
    resolve('static-mirror/site.css'),
    join(args.out, 'assets/site.css'),
  );
  await cp(resolve('static-mirror/site.js'), join(args.out, 'assets/site.js'));
  await cp(
    resolve('node_modules/katex/dist/katex.min.css'),
    join(args.out, 'assets/katex/katex.min.css'),
  );
  await cp(
    resolve('node_modules/katex/dist/fonts'),
    join(args.out, 'assets/katex/fonts'),
    { recursive: true },
  );
  await cp(join(args.content, 'data'), join(args.out, 'data'), {
    recursive: true,
  });
  await writeFile(join(args.out, '.nojekyll'), '', 'utf8');

  for (const day of days) {
    const markdown = await readFile(
      join(args.content, `daily/${day.announcementDate}.md`),
      'utf8',
    );
    const html = renderDayPage(
      day,
      manifest,
      volume,
      markdownToHtml(markdown),
      args.basePath,
    );
    await writePage(
      join(args.out, `daily/${day.announcementDate}/index.html`),
      html,
    );
    if (day.announcementDate === manifest.latestDate)
      await writePage(join(args.out, 'index.html'), html);
  }
  for (const paper of papers) {
    if (paper.slug !== arxivSlug(paper.arxivId))
      throw new Error(`Invalid paper slug for ${paper.arxivId}`);
    const markdown = await readFile(
      join(args.content, `papers/${paper.slug}.md`),
      'utf8',
    );
    const body = `<article class="markdown-body paper-page">${markdownToHtml(markdown)}</article>`;
    await writePage(
      join(args.out, `papers/${paper.slug}/index.html`),
      layout({
        title: `${paper.latest.title} · 几何前沿日报`,
        description: paper.latest.workSummary,
        body,
        basePath: args.basePath,
      }),
    );
  }
  const archiveMarkdown = await readFile(
    join(args.content, 'archive.md'),
    'utf8',
  );
  const archiveHtml = markdownToHtml(archiveMarkdown).replace(
    /href="daily\/(\d{4}-\d{2}-\d{2})\.md"/g,
    (_match, date: string) =>
      `href="${pathUrl(args.basePath, `daily/${date}/`)}"`,
  );
  await writePage(
    join(args.out, 'archive/index.html'),
    layout({
      title: '日期归档 · 几何前沿日报',
      description: '几何前沿日报静态归档',
      body: `<article class="markdown-body archive-page">${archiveHtml}</article>`,
      basePath: args.basePath,
    }),
  );
  await validateBuiltLinks(args.out, args.basePath);
  return {
    latestDate: manifest.latestDate,
    days: days.length,
    papers: papers.length,
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const result = await buildStaticPages(parseArgs(process.argv.slice(2)));
  process.stdout.write(`${JSON.stringify(result)}\n`);
}
