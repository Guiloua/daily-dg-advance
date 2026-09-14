import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import {
  coverageLabel,
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
import { TOPICS, type VolumePoint, type PriorityTier } from '../lib/types';
import { buildDailyOverview } from '../lib/dashboard';
import {
  layout,
  renderOverview,
  formatUpdateTime,
  writeStaticAssets,
  validateBuiltLinks,
} from './static-presentation';
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
    const source = entry.sources[0];
    // Legacy reports have no source observation receipt or guaranteed update time.
    // Validate their content without inventing provenance to satisfy ingestion.
    if (!source) {
      entryPatchSchema.shape.metadata.parse(entry.metadata);
      entryPatchSchema.shape.analysis.parse(entry.analysis ?? undefined);
      entryPatchSchema.shape.analysisBasis.parse(
        entry.analysisBasis ?? undefined,
      );
      if (Boolean(entry.analysis) !== Boolean(entry.analysisBasis))
        throw new Error('Analysis requires an explicit source basis');
      continue;
    }
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

function priority(entry: ProgressiveEntry): PriorityTier | 'pending' {
  const score = entry.analysis?.priorityScore;
  return score === undefined
    ? 'pending'
    : score >= 75
      ? 'high'
      : score >= 50
        ? 'medium'
        : 'low';
}

function card(entry: ProgressiveEntry, base: string, detail = false) {
  const m = entry.metadata,
    a = entry.analysis;
  const url = `${base}/papers/${arxivSlug(entry.arxivId)}/`;
  const labels = {
    high: '高优先级',
    medium: '中优先级',
    low: '低阅读优先级',
    pending: '待解读',
  };
  return `<article class="paper" data-paper data-ai="${a?.aiStatus ?? 'unknown'}" data-topic="${esc(a?.topic ?? 'pending')}" data-priority="${priority(entry)}">
    <div class="paper-meta"><span>${esc(m.categories?.join(' · ') ?? '分类待补齐')}</span><span>${a ? a.priorityScore + ' · ' : ''}${labels[priority(entry)]}</span></div>
    <p class="progress">${esc(a?.progressType ?? '待解读')}</p>
    <h4><a href="${url}">${renderMathText(m.title ?? entry.arxivId)}</a></h4>
    <p class="authors">${esc(m.authors?.join(' · ') ?? '作者待补齐')}</p>
    ${
      a
        ? '<dl>' +
          [
            ['完成的工作', a.workSummary],
            ['技术', a.techniques.join(' · ')],
            ['可能的突破', a.breakthrough],
            ['需谨慎处', a.limitations],
            ['排序理由', a.lowPriorityReason ?? a.priorityReason],
          ]
            .map(
              ([k, v]) =>
                `<div><dt>${k}</dt><dd>${renderMathText(v)}</dd></div>`,
            )
            .join('') +
          '</dl>'
        : '<p>基础信息已发布，中文解读稍后补充。</p>'
    }
    <details${!a || detail ? ' open' : ''}><summary>英文摘要与分析依据</summary>
      <div class="abstract">${renderMathText(m.abstract ?? '摘要待补齐')}</div>
      <p>${a ? (a.analysisDepth === 'abstract' ? '摘要级分析' : '已补读正文') : '待解读'} · ${m.version ? 'v' + m.version : '版本待补齐'}</p>
      <p>${renderMathText(a ? (a.aiStatus === 'explicit' ? '明确披露 AI 协作：' + a.aiEvidence : '未见已检查来源中的 AI 协作声明') : 'AI 协作披露待核查')}</p>
      ${a?.aiEvidenceSource ? '<p>' + esc(a.aiEvidenceSource) + '</p>' : ''}
      <p>提交时间：${m.submittedAt ? formatUpdateTime(m.submittedAt) : '待补齐'} · 修订时间：${m.updatedAt ? formatUpdateTime(m.updatedAt) : '待补齐'}（上海时间）</p>
      <p><a href="https://arxiv.org/abs/${entry.arxivId}">arXiv ↗</a> · <a href="https://arxiv.org/pdf/${entry.arxivId}">PDF ↗</a></p>
    </details>
    ${detail ? '' : '<a class="detail-link" href="' + url + '">完整分析 →</a>'}
  </article>`;
}

function groupedCards(feed: ProgressiveFeed, base: string) {
  const labels = {
    no_disclosure_observed: '未见 AI 协作声明',
    explicit: '明确披露 AI 协作',
    unknown: '待解读与披露核查',
  };
  return (
    (['no_disclosure_observed', 'explicit', 'unknown'] as const)
      .map((ai) => {
        const entries = feed.entries.filter(
          (e) => (e.analysis?.aiStatus ?? 'unknown') === ai,
        );
        if (!entries.length) return '';
        const groups = [...TOPICS, 'pending']
          .map((topic) => {
            const papers = entries
              .filter((e) => (e.analysis?.topic ?? 'pending') === topic)
              .sort(
                (a, b) =>
                  (b.analysis?.priorityScore ?? -1) -
                    (a.analysis?.priorityScore ?? -1) ||
                  a.arxivId.localeCompare(b.arxivId),
              );
            if (!papers.length) return '';
            return `<section class="topic-group" data-group data-ai="${ai}" data-topic="${esc(topic)}">
        <div class="topic-heading"><h3>${topic === 'pending' ? '待解读' : esc(topic)}</h3><span data-group-count>${papers.length}</span></div>
        ${papers.map((e) => card(e, base)).join('\n')}
      </section>`;
          })
          .join('\n');
        return `<section class="ai-group" data-ai-group="${ai}"><h2>${labels[ai]}</h2>${groups}</section>`;
      })
      .join('\n') +
    '<p class="empty" data-empty hidden>当前筛选条件下没有论文。</p>'
  );
}

function metadataStatus(feed: ProgressiveFeed) {
  const fields = {
    title: '题目',
    authors: '作者',
    abstract: '摘要',
    categories: '分类',
    primaryCategory: '主分类',
    version: '版本',
    submittedAt: '提交时间',
    updatedAt: '修订时间',
  } as const;
  const missing = Object.entries(fields).flatMap(([key, label]) => {
    const count = feed.entries.filter((e) => {
      const value = e.metadata[key as keyof typeof fields];
      return !value || (Array.isArray(value) && !value.length);
    }).length;
    return count ? [`${label}（${count} 篇）`] : [];
  });
  return missing.length
    ? `<details class="publication-status"><summary>查看待补资料</summary><p>${missing.join('、')}。已收录和已解读数量按本次保存的快照展示，未确认的资料不会标记为完成。</p></details>`
    : '';
}

function dailyOverview(feed: ProgressiveFeed) {
  const evidence = feed.entries.flatMap((e) =>
    e.analysis
      ? [
          {
            ...e.analysis,
            arxivId: e.arxivId,
            title: e.metadata.title ?? e.arxivId,
            priorityTier: priority(e) as PriorityTier,
          },
        ]
      : [],
  );
  const overview = buildDailyOverview(evidence);
  overview.mainProgress = overview.mainProgress.map((s) =>
    s.replace('本期共收录', '本期已解读'),
  );
  overview.mainProgress.unshift(
    `以下总览仅基于 ${evidence.length} 篇已解读论文；待解读论文不参与总结与排序判断。`,
  );
  return renderOverview(overview);
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
  const assets = await writeStaticAssets(args.out);
  await write(join(args.out, '.nojekyll'), '');
  const base = args.basePath;
  const page = (title: string, body: string) =>
    layout({
      title,
      body,
      description: '几何前沿日报 · DG、MG、GT 研究阅读指南',
      basePath: base,
      assets,
    });
  const papers = new Map<string, ProgressiveEntry>();
  for (const feed of days) {
    const controls = `<form data-filters class="filters">
      <label><span>公告日</span><select name="date" data-date>${days.map((d) => `<option value="${d.date}"${d.date === feed.date ? ' selected' : ''}>${d.date}</option>`).join('')}</select></label>
      <label class="search"><span>搜索</span><input name="q" type="search" placeholder="题目、作者或摘要" autocomplete="off"></label>
      <label><span>主题</span><select name="topic"><option value="all">全部主题</option>${TOPICS.map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join('')}<option value="pending">待解读</option></select></label>
      <label><span>AI 状态</span><select name="ai"><option value="all">全部</option><option value="no_disclosure_observed">未见声明</option><option value="explicit">明确披露</option><option value="unknown">待核查</option></select></label>
      <label><span>优先级</span><select name="priority"><option value="all">全部</option><option value="high">高</option><option value="medium">中</option><option value="low">低</option><option value="pending">待解读</option></select></label>
    </form>`;
    const aiCount = feed.entries.filter(
      (e) => e.analysis?.aiStatus === 'explicit',
    ).length;
    const body = `<div class="page-head"><p class="eyebrow">${feed.date}</p><h1>今日值得读什么</h1><p>${coverageLabel(feed)} · 明确披露 AI 协作 ${aiCount} 篇</p><p>更新时间：${formatUpdateTime(feed.lastUpdated)}</p></div>
      ${metadataStatus(feed)}
      ${dailyOverview(feed)}
      <section class="reports"><div class="section-head"><h2>全部论文</h2><p>按主题与阅读优先级排列</p></div>${controls}<div data-report-list>${groupedCards(feed, base)}</div></section>
      <p class="markdown-links"><a href="${base}/daily/${feed.date}.md">查看原始 Markdown</a> · <a href="${base}/daily/${feed.date}.md" download>下载 Markdown</a></p>
      <section class="trend" data-trend><div class="section-head"><div><p class="eyebrow">Publication pulse</p><h2>每周发文趋势</h2></div><button type="button" data-trend-toggle>展开至 2 年</button></div><p>仅统计 math.DG、math.MG、math.GT 的 New submissions 与 Cross-lists；修订不计入。仅显示清单完整的周。</p><div class="trend-legend"><span class="dg">math.DG</span><span class="mg">math.MG</span><span class="gt">math.GT</span></div><div class="chart" data-chart></div></section>`;
    const output = page('几何前沿日报 · ' + feed.date, body);
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
      page(entry.metadata.title ?? entry.arxivId, card(entry, base, true)),
    );
  await write(
    join(args.out, 'archive/index.html'),
    page(
      '日期归档',
      `<article class="markdown-body archive-page"><h1>日期归档</h1><ul>${days.map((d) => `<li><a href="${base}/daily/${d.date}/">${d.date}</a> — ${coverageLabel(d)}</li>`).join('')}</ul></article>`,
    ),
  );
  await validateBuiltLinks(args.out, base);
  return {
    latestDate: manifest.latestDate,
    days: days.length,
    papers: papers.size,
  };
}
