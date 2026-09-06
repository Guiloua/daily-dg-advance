'use client';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { readJson } from '@/lib/read-request';
import type { VolumePoint } from '@/lib/types';

export function LazyTrend({ range }: { range: '6m' | '2y' }) {
  const anchor = useRef<HTMLDivElement>(null);
  const cache = useRef(new Map<string, VolumePoint[]>());
  const [near, setNear] = useState(false);
  const [points, setPoints] = useState<VolumePoint[] | null>(null);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [Chart, setChart] = useState<ReturnType<typeof lazy> | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    if (anchor.current) observer.observe(anchor.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!near) return;
    const controller = new AbortController();
    setError(false);
    setPoints(null);
    Promise.all([
      import('./trend-chart'),
      cache.current.has(range)
        ? Promise.resolve(cache.current.get(range)!)
        : readJson<{ points: VolumePoint[] }>(
            `/api/volume?range=${range}`,
            controller.signal,
          ).then((result) => result.points),
    ])
      .then(([module, result]) => {
        if (controller.signal.aborted) return;
        cache.current.set(range, result);
        setChart(() => lazy(async () => ({ default: module.TrendChart })));
        setPoints(result);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, [near, range, retry]);
  return (
    <div ref={anchor} className="min-h-[320px]" aria-live="polite">
      {error ? (
        <p>
          趋势暂不可用，不影响论文阅读。
          <button onClick={() => setRetry((value) => value + 1)}>
            重试趋势
          </button>
        </p>
      ) : points && Chart ? (
        <Suspense fallback={<p>正在加载图表…</p>}>
          <Chart volumes={points} range={range} />
        </Suspense>
      ) : (
        <p>正在等待加载每周趋势…</p>
      )}
    </div>
  );
}
