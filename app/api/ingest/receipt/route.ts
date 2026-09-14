import { privateResponse } from '@/lib/private-response';
import { isAuthorized } from '@/lib/auth';
import { receipt } from '@/lib/progressive-repository';
export async function GET(request: Request) {
  if (!(await isAuthorized(request)))
    return privateResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = new URL(request.url).searchParams.get('id');
  if (!id)
    return privateResponse.json({ error: 'Missing ID' }, { status: 400 });
  const result = await receipt(id);
  return privateResponse.json(
    result
      ? {
          contentHash: result.content_hash,
          snapshot: JSON.parse(result.snapshot_json),
        }
      : { error: 'Not found' },
    { status: result ? 200 : 404 },
  );
}
