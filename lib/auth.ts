import { env } from 'cloudflare:workers';

async function digest(value: string) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
}

export async function isAuthorized(request: Request) {
  const expected = env.INGEST_TOKEN;
  const header = request.headers.get('authorization');
  if (!expected || !header?.startsWith('Bearer ')) return false;
  const [left, right] = await Promise.all([digest(header.slice(7)), digest(expected)]);
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) mismatch |= left[index] ^ right[index];
  return mismatch === 0;
}
