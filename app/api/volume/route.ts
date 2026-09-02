import { NextResponse } from 'next/server';
import { listVolumes } from '@/lib/repository';

export async function GET(request: Request) {
  const range = new URL(request.url).searchParams.get('range') === '2y' ? '2y' : '3m';
  return NextResponse.json({ range, days: await listVolumes(range) });
}
