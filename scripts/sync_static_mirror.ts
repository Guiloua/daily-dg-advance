import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import {
  STATIC_MIRROR_SCHEMA_VERSION,
  arxivSlug,
  buildStaticDay,
  buildStaticVolume,
  mergeStaticPaper,
  renderArchiveMarkdown,
  renderDailyMarkdown,
  renderPaperMarkdown,
  type ReportFeed,
  type StaticMirrorManifestV1,
  type StaticPaperV1,
} from '../lib/static-mirror';
import type { VolumePoint } from '../lib/types';
import { reportBatchV2Schema, type ReportBatchV2 } from '../lib/validation';

interface Args {
  site: string;
  output: string;
  days: number;
  requiredDate?: string;
  batch?: string;
  volumeFile?: string;
  offline: boolean;
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
  const site = values.get('site');
  const output = values.get('output');
  if (!site || !output) {
    throw new Error(
      'Usage: sync_static_mirror.ts --site <url> --output <dir> [--days 10] [--required-date YYYY-MM-DD] [--batch report.json] [--volume-file volume.json] [--offline true]',
    );
  }
  return {
    site: site.replace(/\/$/, ''),
    output: resolve(output),
    days: Number.parseInt(values.get('days') ?? '10', 10),
    requiredDate: values.get('required-date'),
    batch: values.get('batch'),
    volumeFile: values.get('volume-file'),
    offline: values.get('offline') === 'true',
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
          ...(process.env.OAI_SITES_AUTHORIZATION
            ? {
                'OAI-Sites-Authorization': `Bearer ${process.env.OAI_SITES_AUTHORIZATION}`,
              }
            : {}),
        },
      });
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      if (attempt < 3)
        await new Promise((done) => setTimeout(done, attempt * 800));
    }
  }
  throw new Error(`Unable to read ${url}: ${String(lastError)}`);
}

async function readJson<T>(path: string): Promise<T | undefined> {
  try {
    return JSON.parse(await readFile(path, 'utf8')) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    throw error;
  }
}

async function writeText(path: string, value: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, value, 'utf8');
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await writeText(path, `${JSON.stringify(value, null, 2)}\n`);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (!Number.isInteger(args.days) || args.days < 1 || args.days > 366) {
    throw new Error('--days must be an integer between 1 and 366');
  }
  const batch = args.batch
    ? reportBatchV2Schema.parse(
        JSON.parse(await readFile(resolve(args.batch), 'utf8')),
      )
    : undefined;
  if (
    batch &&
    args.requiredDate &&
    batch.announcementDay.date !== args.requiredDate
  ) {
    throw new Error('Batch announcement date does not match --required-date');
  }
  const existingVolume = await readJson<ReturnType<typeof buildStaticVolume>>(
    join(args.output, 'data/volume.json'),
  );
  let volumePoints: VolumePoint[];
  let remoteAvailable = !args.offline;
  if (args.volumeFile) {
    const payload = JSON.parse(
      await readFile(resolve(args.volumeFile), 'utf8'),
    ) as { points: VolumePoint[] };
    volumePoints = payload.points;
  } else {
    try {
      const volumePayload = await fetchJson<{ points: VolumePoint[] }>(
        `${args.site}/api/volume?range=2y`,
      );
      volumePoints = volumePayload.points;
    } catch (error) {
      if (!existingVolume || !batch) throw error;
      remoteAvailable = false;
      volumePoints = existingVolume.points.filter(
        (point) => point.announcementDate !== batch.announcementDay.date,
      );
      volumePoints.push(batch.dailyVolume);
    }
  }
  const volume = buildStaticVolume(volumePoints);
  const candidateDates = [...volume.points]
    .map((point) => point.announcementDate)
    .reverse();
  if (args.requiredDate && !candidateDates.includes(args.requiredDate)) {
    candidateDates.unshift(args.requiredDate);
  }

  const existingManifest = await readJson<StaticMirrorManifestV1>(
    join(args.output, 'data/manifest.json'),
  );
  const retainedDates =
    existingManifest?.days.map((day) => day.announcementDate) ?? [];
  const selected = new Map<string, ReturnType<typeof buildStaticDay>>();
  for (const date of retainedDates) {
    const existingDay = await readJson<ReturnType<typeof buildStaticDay>>(
      join(args.output, `data/daily/${date}.json`),
    );
    if (existingDay) selected.set(date, existingDay);
  }
  if (batch) {
    const date = batch.announcementDay.date;
    selected.set(date, buildStaticDay(reportFeedFromBatch(batch)));
  }
  let recentComplete = 0;
  let inspected = 0;
  for (const date of new Set(candidateDates)) {
    if (recentComplete >= args.days && date !== args.requiredDate) break;
    if (selected.has(date)) {
      recentComplete += 1;
      continue;
    }
    if (!remoteAvailable) continue;
    if (inspected >= Math.max(args.days * 4, 40)) break;
    inspected += 1;
    try {
      const feed = await fetchJson<ReportFeed>(
        `${args.site}/api/reports?date=${encodeURIComponent(date)}`,
      );
      selected.set(date, buildStaticDay(feed));
      recentComplete += 1;
    } catch (error) {
      if (date === args.requiredDate) throw error;
    }
  }
  if (!recentComplete) {
    throw new Error(
      'No complete report day was available for the static mirror',
    );
  }
  if (args.requiredDate && !selected.has(args.requiredDate)) {
    throw new Error(
      `Required announcement day ${args.requiredDate} was not mirrored`,
    );
  }

  const days = [...selected.values()].sort((a, b) =>
    b.announcementDate.localeCompare(a.announcementDate),
  );
  const generatedAt = days
    .map((day) => day.lastUpdated)
    .sort()
    .at(-1)!;
  const manifest: StaticMirrorManifestV1 = {
    schemaVersion: STATIC_MIRROR_SCHEMA_VERSION,
    latestDate: days[0].announcementDate,
    generatedAt,
    days: days.map((day) => ({
      announcementDate: day.announcementDate,
      expectedCount: day.coverage.expectedCount,
      publishedCount: day.coverage.publishedCount,
      aiDisclosureCount: day.aiDisclosureCount,
      complete: day.coverage.complete,
      lastUpdated: day.lastUpdated,
    })),
  };

  await writeJson(join(args.output, 'data/volume.json'), volume);
  for (const day of days) {
    await writeJson(
      join(args.output, `data/daily/${day.announcementDate}.json`),
      day,
    );
    await writeText(
      join(args.output, `daily/${day.announcementDate}.md`),
      renderDailyMarkdown(day),
    );
    for (const report of day.reports) {
      const slug = arxivSlug(report.arxivId);
      const paperJsonPath = join(args.output, `data/papers/${slug}.json`);
      const existing = await readJson<StaticPaperV1>(paperJsonPath);
      const paper = mergeStaticPaper(existing, report);
      await writeJson(paperJsonPath, paper);
      await writeText(
        join(args.output, `papers/${slug}.md`),
        renderPaperMarkdown(paper),
      );
    }
  }
  await writeJson(join(args.output, 'data/manifest.json'), manifest);
  await writeText(
    join(args.output, 'archive.md'),
    renderArchiveMarkdown(manifest),
  );
  await writeText(join(args.output, 'index.md'), renderDailyMarkdown(days[0]));
  await writeText(
    join(args.output, 'README.md'),
    `# 几何前沿日报内容镜像\n\n最新完整公告日：${manifest.latestDate}。\n\n- [最新日报](index.md)\n- [日期归档](archive.md)\n- [静态网页](https://guiloua.github.io/daily-dg-advance/)\n`,
  );
  process.stdout.write(
    `${JSON.stringify({ latestDate: manifest.latestDate, days: days.length, generatedAt })}\n`,
  );
}

function reportFeedFromBatch(batch: ReportBatchV2): ReportFeed {
  return {
    date: batch.announcementDay.date,
    lastUpdated: batch.run.completedAt,
    coverage: {
      expectedCount: batch.run.expectedCount,
      publishedCount: batch.reports.filter(
        (paper) => paper.entryKind !== 'revision',
      ).length,
      complete: true,
    },
    reports: batch.reports.map((paper) => ({
      ...paper,
      id: `${paper.announcementDate}:${paper.arxivId}:v${paper.version}`,
    })),
  };
}

await main();
