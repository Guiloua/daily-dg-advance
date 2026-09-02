import { NextResponse } from 'next/server';
import { loadDashboard } from '@/lib/repository';

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get('date') ?? undefined;
  const dashboard = await loadDashboard(date);
  if (dashboard.dataMode === 'unavailable') {
    return NextResponse.json(
      { date: dashboard.latestDate, error: 'data_unavailable', reports: [] },
      { status: 503 },
    );
  }
  return NextResponse.json({
    date: dashboard.latestDate,
    lastUpdated: dashboard.lastUpdated,
    coverage: dashboard.coverage,
    reports: dashboard.reports,
  });
}
