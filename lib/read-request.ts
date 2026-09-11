export function retryDelay(value: string | null, now = Date.now()): number {
  if (!value) return 1_000;
  const seconds = Number(value);
  const delay = Number.isFinite(seconds) ? seconds * 1_000 : Date.parse(value) - now;
  return Number.isFinite(delay) ? Math.max(0, delay) : 1_000;
}

async function waitToRetry(ms: number, signal?: AbortSignal) {
  signal?.throwIfAborted();
  // Do not shorten a server cooldown to fit the interactive waiting budget.
  if (ms > 15_000) throw new Error('服务繁忙，请稍后重试；已加载内容仍可阅读。');
  await new Promise<void>((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(signal?.reason); };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', abort, { once: true });
  });
}

/** Public reads only. A timeout or cancellation must never retry a write. */
export async function readJson<T>(
  url: string,
  signal?: AbortSignal,
  timeoutMs = 15_000,
  headers?: HeadersInit,
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    signal?.throwIfAborted();
    const timeout = AbortSignal.timeout(timeoutMs);
    const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;
    try {
      const response = await fetch(url, { signal: combined, headers });
      if (!response.ok) {
        if (attempt === 0 && [429, 502, 503, 504, 500].includes(response.status)) {
          await waitToRetry(retryDelay(response.headers.get('Retry-After')), signal);
          continue;
        }
        throw new Error(`读取失败 (${response.status})`);
      }
      return (await response.json()) as T;
    } catch (error) {
      if (signal?.aborted || timeout.aborted) throw error;
      if (attempt === 0 && error instanceof TypeError) {
        await waitToRetry(1_000, signal);
        continue;
      }
      throw error;
    }
  }
}
