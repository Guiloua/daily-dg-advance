import { privateResponse } from '@/lib/private-response';
import { isAuthorized } from '@/lib/auth';
import {
  publicationSchema,
  PublicationConflict,
  PublicationValidationError,
} from '@/lib/progressive';
import { publishProgressive } from '@/lib/progressive-repository';
export async function POST(request: Request) {
  if (!(await isAuthorized(request)))
    return privateResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!request.headers.get('content-type')?.includes('application/json'))
    return privateResponse.json({ error: 'Expected JSON' }, { status: 415 });
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 4_000_000)
      return privateResponse.json(
        { error: 'Payload too large' },
        { status: 413 },
      );
    const parsed = publicationSchema.safeParse(JSON.parse(raw));
    if (!parsed.success)
      return privateResponse.json(
        { error: 'Invalid publication', issues: parsed.error.issues },
        { status: 400 },
      );
    return privateResponse.json(await publishProgressive(parsed.data));
  } catch (error) {
    return privateResponse.json(
      { error: error instanceof Error ? error.message : 'Publication failed' },
      {
        status:
          error instanceof PublicationConflict
            ? 409
            : error instanceof SyntaxError ||
                error instanceof PublicationValidationError
              ? 400
              : 500,
      },
    );
  }
}
