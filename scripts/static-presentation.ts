import { arxivSlug } from '../lib/static-mirror';
import { aiUsageGroups, aiUsageSummary } from '../lib/ai-usage';
// Shared by legacy and progressive snapshots: the data format must not change the reading layout.
import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { renderMathText } from '../lib/math-text';
import type { DailyOverview } from '../lib/dashboard';

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function pathUrl(basePath: string, value = ''): string {
  const suffix = value.replace(/^\/+/, '');
  return `${basePath}/${suffix}`.replace(/\/{2,}/g, '/');
}

export function renderOverview(
  overview: DailyOverview,
  usage = aiUsageSummary([]),
  basePath = '',
): string {
  const breakthroughs = overview.breakthroughPoints.length
    ? overview.breakthroughPoints
        .map(
          (item) =>
            `<li><strong>${renderMathText(item.title)}</strong>：${renderMathText(item.summary)}</li>`,
        )
        .join('')
    : '<li>本期没有足够证据支持单独标注突破点。</li>';
  return `<section class="overview">
    <div><p class="eyebrow">Daily synthesis</p><h2>当日总览</h2></div>
    <div class="overview-row"><h3>主要方向与技术进展</h3><div>${overview.mainProgress.map((item) => `<p>${renderMathText(item)}</p>`).join('')}</div></div>
    <div class="overview-row"><h3>可能的突破点</h3><ul>${breakthroughs}</ul></div>
    <div class="overview-row"><h3>AI 技术声明</h3><div class="ai-usage"><p>按稿件计数，一篇可计入多项。</p>${aiUsageGroups(
      usage,
    )
      .map(
        (group) =>
          `<details data-ai-usage="${group.key}"><summary>${escapeHtml(group.label)}：${group.count} 篇</summary>${group.papers.length ? `<ul>${group.papers.map((paper) => `<li><a href="${pathUrl(basePath, `papers/${arxivSlug(paper.arxivId)}/`)}">${renderMathText(paper.title)}</a></li>`).join('')}</ul>` : '<p>暂无符合此项的论文。</p>'}</details>`,
      )
      .join('')}</div></div>
  </section>`;
}

export function layout(options: {
  title: string;
  description: string;
  body: string;
  basePath: string;
  assets: { css: string; js: string };
}): string {
  const { title, description, body, basePath, assets } = options;
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}">
<link rel="stylesheet" href="${pathUrl(basePath, assets.css)}"><link rel="stylesheet" href="${pathUrl(basePath, 'assets/katex/katex.min.css')}"></head>
<body data-base-path="${escapeHtml(basePath)}"><header class="site-header"><div><a class="brand" href="${pathUrl(basePath)}"><i>G.</i><span>几何前沿日报</span></a><nav><a href="${pathUrl(basePath, 'archive/')}">日期归档</a><a href="https://geometry-arxiv-daily-jch.zychern672259.chatgpt.site/">实时站点</a></nav></div></header>
<main>${body}</main><footer>静态只读镜像 · 自动生成的阅读指南，关键结论请回查原论文。</footer>
<script src="${pathUrl(basePath, assets.js)}" defer></script></body></html>`;
}

export function formatUpdateTime(value: string): string {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return '尚未确认';
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const part = (type: string) =>
    parts.find((entry) => entry.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')} ${part('hour')}:${part('minute')}`;
}

export async function writeStaticAssets(out: string) {
  await mkdir(join(out, 'assets'), { recursive: true });
  const assets = { css: '', js: '' };
  for (const extension of ['css', 'js'] as const) {
    const bytes = await readFile(resolve(`static-mirror/site.${extension}`));
    assets[extension] =
      `assets/site.${createHash('sha256').update(bytes).digest('hex').slice(0, 16)}.${extension}`;
    await writeFile(join(out, assets[extension]), bytes);
  }
  return assets;
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

export async function validateBuiltLinks(
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
