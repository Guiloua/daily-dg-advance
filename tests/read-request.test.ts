import assert from 'node:assert/strict';
import { readJson, retryDelay } from '../lib/read-request';

const original = globalThis.fetch;
let calls = 0;
try {
  assert.equal(retryDelay('120'), 120_000);
  assert.equal(retryDelay('Thu, 01 Jan 1970 00:02:00 GMT', 0), 120_000);
  globalThis.fetch = async () => {
    calls++;
    return new Response('', { status: 429, headers: { 'Retry-After': '120' } });
  };
  await assert.rejects(readJson('/read'), /稍后/);
  assert.equal(calls, 1);
  calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return calls === 1
      ? new Response('', { status: 503 })
      : Response.json({ ok: true });
  };
  assert.deepEqual(await readJson('/read'), { ok: true });
  assert.equal(calls, 2);
  calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response('', { status: 401 });
  };
  await assert.rejects(readJson('/read'));
  assert.equal(calls, 1);
  calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new TypeError('Network error');
  };
  await assert.rejects(readJson('/read'));
  assert.equal(calls, 2);
  calls = 0;
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(readJson('/read', controller.signal));
  assert.equal(calls, 0);
  globalThis.fetch = async (_url, init) => {
    calls++;
    return await new Promise<Response>((_resolve, reject) =>
      init!.signal!.addEventListener('abort', () =>
        reject(init!.signal!.reason),
      ),
    );
  };
  const keepAlive = setTimeout(() => {}, 100);
  await assert.rejects(readJson('/read', undefined, 5));
  clearTimeout(keepAlive);
  assert.equal(calls, 1);
} finally {
  globalThis.fetch = original;
}
console.log('Read retry, timeout and cancellation tests passed');
