import { NextResponse } from 'next/server';
import { listReports } from '@/lib/repository';

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get('date') ?? undefined;
  return NextResponse.json({ date, reports: await listReports(date) });
}
