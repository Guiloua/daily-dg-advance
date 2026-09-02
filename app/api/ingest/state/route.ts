import { NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/auth';
import { getIngestState } from '@/lib/repository';

export async function GET(request: Request) {
  if (!(await isAuthorized(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await getIngestState());
}
