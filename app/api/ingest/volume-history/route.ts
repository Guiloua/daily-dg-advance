import { NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/auth';
import { ingestVolumeHistory } from '@/lib/repository';
import { volumeHistoryV1Schema } from '@/lib/validation';

export async function POST(request: Request) {
  if (!(await isAuthorized(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!request.headers.get('content-type')?.includes('application/json')) return NextResponse.json({ error: 'Expected application/json' }, { status: 415 });
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > 500_000) return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  try {
    const parsed = volumeHistoryV1Schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Invalid volume history', issues: parsed.error.issues }, { status: 400 });
    return NextResponse.json(await ingestVolumeHistory(parsed.data));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'History ingestion failed' }, { status: 500 });
  }
}
