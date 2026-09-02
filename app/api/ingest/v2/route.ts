import { NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/auth';
import { ingestBatchV2 } from '@/lib/repository';
import { reportBatchV2Schema } from '@/lib/validation';

export async function POST(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json(
      { error: 'Expected application/json' },
      { status: 415 },
    );
  }
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > 4_000_000) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }
  try {
    const parsed = reportBatchV2Schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid or incomplete report batch', issues: parsed.error.issues },
        { status: 400 },
      );
    }
    return NextResponse.json(await ingestBatchV2(parsed.data));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Ingestion failed' },
      { status: 500 },
    );
  }
}
