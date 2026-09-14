import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import {
  coverageLabel,
  progressiveOverview,
  formatPublicationTime,
  fromLegacy,
  recalculate,
  canonical,
  entryPatchSchema,
  type ProgressiveFeed,
  type ProgressiveEntry,
} from '../lib/progressive';
import {
  arxivSlug,
  buildStaticVolume,
  type ReportFeed,
} from '../lib/static-mirror';
import { renderMathText } from '../lib/math-text';
import type { VolumePoint } from '../lib/types';
import { readJson } from '../lib/read-request';

interface Manifest {
  schemaVersion: 2;
  latestDate: string;
  generatedAt: string;
  days: {
    announcementDate: string;
    complete: boolean;
    expectedCount: number | null;
    publishedCount: number;
    lastUpdated: string;
  }[];
}
async function read<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf8'));
}
async function write(path: string, value: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(
    path,
    typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n',
  );
}
function normalize(
  value: ProgressiveFeed | (ReportFeed & { announcementDate?: string }),
): ProgressiveFeed {
  return 'entries' in value
    ? value
    : fromLegacy(
        value.date ?? value.announcementDate!,
        value.lastUpdated,
        value.reports,
        value.coverage.complete,
      );
}
const esc = (s: string) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
function validate(feed: ProgressiveFeed) {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(feed.date) ||
    new Set(feed.entries.map((e) => e.arxivId)).size !== feed.entries.length
  )
    throw new Error('Invalid progressive day');
  for (const entry of feed.entries) {
    arxivSlug(entry.arxivId); // Validate using the same bounded fields as ingestion.
    const source = entry.sources[0] ?? {
      url: 'https://arxiv.org/abs/' + entry.arxivId,
      observedAt: feed.lastUpdated,
      contentHash: '0'.repeat(64),
    };
    entryPatchSchema.parse({
      arxivId: entry.arxivId,
      metadata: entry.metadata,
      source,
      ...(entry.analysis
        ? { analysis: entry.analysis, analysisBasis: entry.analysisBasis }
        : {}),
    });
  }
  if (canonical(recalculate(feed).coverage) !== canonical(feed.coverage))
    throw new Error('Progressive coverage mismatch');
}
function markdown(feed: ProgressiveFeed) {
  return (
    `# 几何前沿日报 · ${feed.date}\n\n${coverageLabel(feed)}。\n\n` +
    feed.entries
      .map(
        (e) =>
          `## ${e.metadata.title ?? e.arxivId}\n\n${e.metadata.authors?.join('、') ?? '作者待补齐'}\n\n${e.analysis?.workSummary ?? '中文解读待补齐'}\n\n${e.metadata.abstract ?? '摘要待补齐'}\n\n[arXiv](https://arxiv.org/abs/${e.arxivId})\n`,
      )
      .join('\n')
  );
}
export async function syncProgressive(args: {
  site: string;
  output: string;
  batch?: string;
  requiredDate?: string;
  days: number;
}) {
  const fetchJson = <T>(url: string) =>
    readJson<T>(
      url,
      undefined,
      30_000,
      process.env.OAI_SITES_AUTHORIZATION
        ? {
            'OAI-Sites-Authorization':
              'Bearer ' + process.env.OAI_SITES_AUTHORIZATION,
          }
        : {},
    );
  const selected = new Map<string, ProgressiveFeed>();
  let existing: { days: { announcementDate: string }[] } | undefined;
  try {
    existing = await read(join(args.output, 'data/manifest.json'));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
  for (const day of existing?.days ?? []) {
    const normalized = normalize(
      await read(join(args.output, `data/daily/${day.announcementDate}.json`)),
    );
    selected.set(normalized.date, normalized);
  }
  if (args.batch) {
    const snapshot = normalize(await read(args.batch));
    validate(snapshot);
    const old = selected.get(snapshot.date);
    if (!old || snapshot.revision >= old.revision)
      selected.set(snapshot.date, snapshot);
  }
  let dates: string[] = [];
  let points: VolumePoint[];
  try {
    const result = await fetchJson<{ dates: string[] }>(
      args.site + '/api/reports/v2?dates=true',
    );
    dates = result.dates;
  } catch (error) {
    if (!selected.size) throw error;
  }
  let complete = 0;
  for (const date of [...new Set([...dates, ...selected.keys()])]
    .sort()
    .reverse()) {
    if (complete >= args.days && selected.get(date)?.coverage.complete)
      continue;
    try {
      const feed = await fetchJson<ProgressiveFeed>(
        args.site + '/api/reports/v2?date=' + date,
      );
      validate(feed);
      selected.set(date, feed);
    } catch (error) {
      if (!selected.has(date)) throw error;
    }
    if (selected.get(date)?.coverage.complete) complete++;
  }
  try {
    points = (
      await fetchJson<{ points: VolumePoint[] }>(
        args.site + '/api/volume?range=2y',
      )
    ).points;
  } catch (error) {
    try {
      points = (
        await read<{ points: VolumePoint[] }>(
          join(args.output, 'data/volume.json'),
        )
      ).points;
    } catch {
      throw error;
    }
  }
  for (const feed of selected.values())
    if (feed.coverage.listingsComplete) {
      const counts = Object.fromEntries(
        feed.categories.map((c) => [
          c.category,
          c.newIds.length + c.crossListIds.length,
        ]),
      );
      points = points.filter((p) => p.announcementDate !== feed.date);
      points.push({
        announcementDate: feed.date,
        mathDg: counts.mathDg,
        mathMg: counts.mathMg,
        mathGt: counts.mathGt,
      });
    }
  const week = (date: string) => {
    const d = new Date(date + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() || 7) - 1));
    return d.toISOString().slice(0, 10);
  };
  const missingWeeks = new Set(
    [...selected.values()]
      .filter((d) => !d.coverage.listingsComplete)
      .map((d) => week(d.date)),
  );
  points = points
    .filter((p) => !missingWeeks.has(week(p.announcementDate)))
    .sort((a, b) => a.announcementDate.localeCompare(b.announcementDate));
  let retainedComplete = 0;
  const days = [...selected.values()]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((d) => !d.coverage.complete || retainedComplete++ < args.days);
  if (
    !days.length ||
    (args.requiredDate && !days.some((d) => d.date === args.requiredDate))
  )
    throw new Error('Required progressive day missing');
  const papers = new Map<
    string,
    {
      schemaVersion: 2;
      arxivId: string;
      slug: string;
      latest: ProgressiveEntry;
      history: { date: string; entry: ProgressiveEntry }[];
    }
  >();
  for (const feed of days) {
    validate(feed);
    await write(join(args.output, `data/daily/${feed.date}.json`), feed);
    await write(join(args.output, `daily/${feed.date}.md`), markdown(feed));
    for (const entry of feed.entries) {
      const old = papers.get(entry.arxivId);
      if (old) old.history.push({ date: feed.date, entry });
      else
        papers.set(entry.arxivId, {
          schemaVersion: 2,
          arxivId: entry.arxivId,
          slug: arxivSlug(entry.arxivId),
          latest: entry,
          history: [{ date: feed.date, entry }],
        });
    }
  }
  for (const paper of papers.values()) {
    await write(join(args.output, `data/papers/${paper.slug}.json`), paper);
    await write(
      join(args.output, `papers/${paper.slug}.md`),
      `# ${paper.latest.metadata.title ?? paper.arxivId}\n\n${paper.latest.analysis?.workSummary ?? '待解读'}\n`,
    );
  }
  const manifest: Manifest = {
    schemaVersion: 2,
    latestDate: days[0].date,
    generatedAt: days
      .map((d) => d.lastUpdated)
      .sort()
      .at(-1)!,
    days: days.map((d) => ({
      announcementDate: d.date,
      complete: d.coverage.complete,
      expectedCount: d.coverage.expectedCount,
      publishedCount: d.entries.length,
      lastUpdated: d.lastUpdated,
    })),
  };
  await write(join(args.output, 'data/manifest.json'), manifest);
  await write(join(args.output, 'data/volume.json'), buildStaticVolume(points));
  await write(join(args.output, 'index.md'), markdown(days[0]));
  await write(
    join(args.output, 'archive.md'),
    '# 日期归档\n\n' +
      days
        .map((d) => `- [${d.date}](daily/${d.date}.md) — ${coverageLabel(d)}`)
        .join('\n'),
  );
  await write(
    join(args.output, 'README.md'),
    `# 几何前沿日报\n\n最新公告：${manifest.latestDate}。基础信息先发布，解读持续补齐。\n`,
  );
  return { latestDate: manifest.latestDate, days: days.length };
}
function card(entry: ProgressiveEntry, base: string) {
  const m = entry.metadata,
    a = entry.analysis;
  return `<article class="paper" data-paper data-ai="${a?.aiStatus ?? 'unknown'}" data-topic="${esc(a?.topic ?? 'pending')}" data-priority="${a ? (a.priorityScore >= 75 ? 'high' : a.priorityScore >= 50 ? 'medium' : 'low') : 'pending'}"><h2><a href="${base}/papers/${arxivSlug(entry.arxivId)}/">${renderMathText(m.title ?? entry.arxivId)}</a></h2><p>${esc(m.authors?.join(' · ') ?? '作者待补齐')}</p><p>${esc(m.categories?.join(' · ') ?? '论文分类待补齐')} · ${m.version ? 'v' + m.version : '版本待补齐'} · ${a ? `${a.priorityScore} / 100 · ${a.analysisDepth === 'abstract' ? '摘要级分析' : '已补读正文关键部分'}` : '待解读'}</p>${
    a
      ? `<dl>${[
          ['完成的工作', a.workSummary],
          ['主要突破', a.breakthrough],
          ['技术', a.techniques.join('；')],
          ['限制与不确定性', a.limitations],
          ['排序理由', a.lowPriorityReason ?? a.priorityReason],
        ]
          .map(
            ([k, v]) => `<div><dt>${k}</dt><dd>${renderMathText(v)}</dd></div>`,
          )
          .join('')}</dl>`
      : '<p>基础信息已发布，中文解读稍后补充。</p>'
  }<details${a ? '' : ' open'}><summary>英文摘要</summary>${renderMathText(m.abstract ?? '摘要待补齐')}</details><p>${esc(a ? (a.aiStatus === 'explicit' ? `明确披露 AI 协作：${a.aiEvidence}（${a.aiEvidenceSource}）` : '未见已检查来源中的 AI 协作声明') : 'AI 协作披露待核查')}</p><p>提交时间：${esc(m.submittedAt ?? '待补齐')} · 修订时间：${esc(m.updatedAt ?? '待补齐')}</p><a href="https://arxiv.org/abs/${entry.arxivId}">arXiv ↗</a> · <a href="https://arxiv.org/pdf/${entry.arxivId}">PDF ↗</a></article>`;
}
export async function buildProgressivePages(args: {
  content: string;
  out: string;
  basePath: string;
}) {
  const manifest = await read<Manifest>(
    join(args.content, 'data/manifest.json'),
  );
  if (manifest.schemaVersion !== 2 || !manifest.days.length)
    throw new Error('Invalid progressive manifest');
  if (
    manifest.days.some((d) => !/^\d{4}-\d{2}-\d{2}$/.test(d.announcementDate))
  )
    throw new Error('Invalid archive date');
  const days = await Promise.all(
    manifest.days.map((d) =>
      read<ProgressiveFeed>(
        join(args.content, `data/daily/${d.announcementDate}.json`),
      ),
    ),
  );
  days.forEach(validate);
  if (manifest.latestDate !== days[0].date)
    throw new Error('Latest date mismatch');
  await rm(args.out, { recursive: true, force: true });
  await mkdir(join(args.out, 'assets/katex'), { recursive: true });
  await cp(join(args.content, 'data'), join(args.out, 'data'), {
    recursive: true,
  });
  await cp(
    resolve('node_modules/katex/dist/katex.min.css'),
    join(args.out, 'assets/katex/katex.min.css'),
  );
  await cp(
    resolve('node_modules/katex/dist/fonts'),
    join(args.out, 'assets/katex/fonts'),
    { recursive: true },
  );
  await cp(
    resolve('static-mirror/site.css'),
    join(args.out, 'assets/site.css'),
  );
  await cp(resolve('static-mirror/site.js'), join(args.out, 'assets/site.js'));
  await write(join(args.out, '.nojekyll'), '');
  const base = args.basePath;
  const layout = (title: string, body: string) =>
    `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><link rel="stylesheet" href="${base}/assets/site.css"><link rel="stylesheet" href="${base}/assets/katex/katex.min.css"></head><body data-base-path="${base}"><main><nav><a href="${base}/">最新日报</a> · <a href="${base}/archive/">日期归档</a> · <a href="https://geometry-arxiv-daily-jch.zychern672259.chatgpt.site">实时站点 ↗</a></nav>${body}</main><script src="${base}/assets/site.js" defer></script></body></html>`;
  const papers = new Map<string, ProgressiveEntry>();
  for (const feed of days) {
    const controls = `<form data-filters class="filters"><label>公告日<select name="date" data-date>${days.map((d) => `<option value="${d.date}"${d.date === feed.date ? ' selected' : ''}>${d.date}</option>`).join('')}</select></label><label>搜索<input name="q" type="search"></label><label>主题<select name="topic"><option value="all">全部主题</option>${[...new Set(feed.entries.map((e) => e.analysis?.topic).filter(Boolean))].map((t) => `<option>${esc(t!)}</option>`).join('')}<option value="pending">待解读</option></select></label><label>AI 状态<select name="ai"><option value="all">全部</option><option value="explicit">明确披露</option><option value="no_disclosure_observed">已检查来源未见披露</option><option value="unknown">待核查</option></select></label><label>优先级<select name="priority"><option value="all">全部</option><option value="high">高</option><option value="medium">中</option><option value="low">低</option><option value="pending">待解读</option></select></label></form>`;
    const overview = progressiveOverview(feed);
    const summary = overview.count
      ? `<section><h2>本期研究概览</h2><p>仅基于已解读的 ${overview.count} 篇。主要方向：${overview.topics
          .slice(0, 3)
          .map((t) => esc(t.topic) + '（' + t.count + ' 篇）')
          .join(
            '、',
          )}。</p><ul>${overview.highlights.map((h) => '<li>' + renderMathText(h.summary) + '</li>').join('')}</ul></section>`
      : '';
    const body = `<h1>几何前沿日报 · ${feed.date}</h1><p>${coverageLabel(feed)}</p><p>更新：${esc(formatPublicationTime(feed.lastUpdated))}（上海时间）</p><p>本期解读仅基于已分析的 ${feed.coverage.analyzedCount} 篇。</p>${summary}${controls}<section data-trend><h2>完整周分类趋势</h2><button data-trend-toggle>展开至 2 年</button><div class="trend-legend"><span class="dg">math.DG</span><span class="mg">math.MG</span><span class="gt">math.GT</span></div><div data-chart></div></section>${feed.entries
      .slice()
      .sort(
        (a, b) =>
          (b.analysis?.priorityScore ?? -1) - (a.analysis?.priorityScore ?? -1),
      )
      .map((e) => card(e, base))
      .join('')}<p data-empty hidden>当前筛选条件下没有论文。</p>`;
    const output = layout('几何前沿日报 · ' + feed.date, body);
    await write(join(args.out, `daily/${feed.date}/index.html`), output);
    await write(join(args.out, `daily/${feed.date}.md`), markdown(feed));
    if (feed.date === manifest.latestDate)
      await write(join(args.out, 'index.html'), output);
    for (const entry of feed.entries)
      if (!papers.has(entry.arxivId)) papers.set(entry.arxivId, entry);
  }
  for (const entry of papers.values())
    await write(
      join(args.out, `papers/${arxivSlug(entry.arxivId)}/index.html`),
      layout(entry.metadata.title ?? entry.arxivId, card(entry, base)),
    );
  await write(
    join(args.out, 'archive/index.html'),
    layout(
      '日期归档',
      `<h1>日期归档</h1><ul>${days.map((d) => `<li><a href="${base}/daily/${d.date}/">${d.date}</a> — ${coverageLabel(d)}</li>`).join('')}</ul>`,
    ),
  );
  return {
    latestDate: manifest.latestDate,
    days: days.length,
    papers: papers.size,
  };
}
