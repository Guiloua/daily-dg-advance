import { privateResponse as NextResponse } from '@/lib/private-response';
import { isAuthorized } from '@/lib/auth';
import { getIngestState } from '@/lib/repository';

export async function GET(request: Request) {
  if (!(await isAuthorized(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    return NextResponse.json(await getIngestState());
  } catch {
    return NextResponse.json({ error: 'data_unavailable' }, { status: 503 });
  }
}
