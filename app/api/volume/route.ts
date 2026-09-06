import { NextResponse } from 'next/server';
import { listVolumes } from '@/lib/repository';
import { aggregateWeeklyVolumes, selectWeeklyRange } from '@/lib/volume';

export async function GET(request: Request) {
  try {
    const range =
      new URL(request.url).searchParams.get('range') === '2y' ? '2y' : '6m';
    const points = await listVolumes('2y');
    const weeks = aggregateWeeklyVolumes(points);
    const selectedWeeks = selectWeeklyRange(weeks, range);
    const firstWeekStart = selectedWeeks[0]?.weekStart;
    return NextResponse.json(
      {
        range,
        points:
          range === '6m' && firstWeekStart
            ? points.filter((point) => point.announcementDate >= firstWeekStart)
            : points,
        weeks: selectedWeeks,
      },
      { headers: { 'Cache-Control': 'public, max-age=60, must-revalidate' } },
    );
  } catch {
    return NextResponse.json(
      { error: 'data_unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
