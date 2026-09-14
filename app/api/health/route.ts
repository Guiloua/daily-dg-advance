import { NextResponse } from 'next/server';
import { getHealthSnapshot, listVolumes } from '@/lib/repository';
import { readProgressive } from '@/lib/progressive-repository';
import { aggregateWeeklyVolumes } from '@/lib/volume';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const [old, feed, volumes] = await Promise.all([
      getHealthSnapshot(),
      readProgressive(),
      listVolumes('2y'),
    ]);
    return NextResponse.json(
      {
        ...old,
        status: 'ok',
        latestAnnouncementDate: feed.date,
        latestSuccessfulRunAt: feed.lastUpdated || old.latestSuccessfulRunAt,
        coverage: {
          ...feed.coverage,
          databasePublicationCount: feed.entries.length,
        },
        latestCompleteWeek: aggregateWeeklyVolumes(volumes).at(-1) ?? null,
        contentStatus: feed.coverage.complete ? 'complete' : 'pending',
        publicationRevision: feed.revision,
        checks: {
          database: true,
          coverage: feed.coverage.complete,
          weeklyVolume: volumes.length > 0,
        },
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return NextResponse.json(
      { status: 'degraded', error: 'database_unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
