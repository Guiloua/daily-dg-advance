/** Public reads only. A timeout or cancellation must never retry a write. */
export async function readJson<T>(
  url: string,
  signal?: AbortSignal,
  timeoutMs = 15_000,
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    signal?.throwIfAborted();
    const timeout = AbortSignal.timeout(timeoutMs);
    const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;
    try {
      const response = await fetch(url, { signal: combined });
      if (!response.ok) {
        if (attempt === 0 && [502, 503, 504, 500].includes(response.status))
          continue;
        throw new Error(`读取失败 (${response.status})`);
      }
      return (await response.json()) as T;
    } catch (error) {
      if (signal?.aborted || timeout.aborted) throw error;
      if (attempt === 0 && error instanceof TypeError) continue;
      throw error;
    }
  }
}
