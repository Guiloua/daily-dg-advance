import { privateResponse as NextResponse } from '@/lib/private-response';
import { isAuthorized } from '@/lib/auth';
import { ingestBatch } from '@/lib/repository';
import { reportBatchV1Schema } from '@/lib/validation';

export async function POST(request: Request) {
  if (!(await isAuthorized(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!request.headers.get('content-type')?.includes('application/json')) return NextResponse.json({ error: 'Expected application/json' }, { status: 415 });
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > 1_500_000) return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  try {
    const parsed = reportBatchV1Schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Invalid report batch', issues: parsed.error.issues }, { status: 400 });
    return NextResponse.json(await ingestBatch(parsed.data));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Ingestion failed' }, { status: 500 });
  }
}
