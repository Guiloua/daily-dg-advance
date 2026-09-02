import { NextResponse } from 'next/server';
import { unavailableHealthSnapshot } from '@/lib/health';
import { getHealthSnapshot } from '@/lib/repository';

export const dynamic = 'force-dynamic';

function response(body: ReturnType<typeof unavailableHealthSnapshot>) {
  return NextResponse.json(body, {
    status: body.status === 'ok' ? 200 : 503,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function GET() {
  try {
    return response(await getHealthSnapshot());
  } catch {
    return response(unavailableHealthSnapshot(new Date().toISOString()));
  }
}
