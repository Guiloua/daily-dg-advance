import { NextResponse } from 'next/server';
import {
  readProgressive,
  progressiveDates,
} from '@/lib/progressive-repository';
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const date = params.get('date') ?? undefined;
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date))
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
  try {
    return NextResponse.json(
      params.get('dates') === 'true'
        ? { dates: await progressiveDates() }
        : await readProgressive(date),
      { headers: { 'Cache-Control': 'no-cache' } },
    );
  } catch {
    return NextResponse.json(
      { error: 'data_unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
