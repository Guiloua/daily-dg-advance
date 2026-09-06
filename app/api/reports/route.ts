import { NextResponse } from 'next/server';
import { loadReportFeed } from '@/lib/repository';

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get('date') ?? undefined;
  try {
    const feed = await loadReportFeed(date);
    return NextResponse.json(feed, {
      headers: { 'Cache-Control': 'public, max-age=60, must-revalidate' },
    });
  } catch {
    return NextResponse.json(
      { date: date ?? null, error: 'data_unavailable', reports: [] },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
