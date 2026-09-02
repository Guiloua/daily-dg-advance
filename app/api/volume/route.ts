import { NextResponse } from 'next/server';
import { listVolumes } from '@/lib/repository';
import { aggregateWeeklyVolumes } from '@/lib/volume';

export async function GET(request: Request) {
  const range =
    new URL(request.url).searchParams.get('range') === '2y' ? '2y' : '6m';
  const weeks = aggregateWeeklyVolumes(await listVolumes('2y'));
  return NextResponse.json({
    range,
    weeks: range === '6m' ? weeks.slice(-26) : weeks,
  });
}
