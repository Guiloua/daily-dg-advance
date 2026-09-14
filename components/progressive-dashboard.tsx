'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { readJson } from '@/lib/read-request';
import type { ProgressiveFeed } from '@/lib/progressive';
import { TOPICS } from '@/lib/types';
import {
  EntryView,
  PublicationHeader,
  PublicationOverview,
} from './publication-view';
import { LazyTrend } from './lazy-trend';
export function ProgressiveDashboard({
  requestedDate,
}: {
  requestedDate?: string;
}) {
  const [feed, setFeed] = useState<ProgressiveFeed | null>(null),
    [dates, setDates] = useState<string[]>([]),
    [date, setDate] = useState(requestedDate ?? ''),
    [query, setQuery] = useState(''),
    [topic, setTopic] = useState('all'),
    [ai, setAi] = useState('all'),
    [priority, setPriority] = useState('all'),
    [range, setRange] = useState<'6m' | '2y'>('6m'),
    [error, setError] = useState(false),
    [retry, setRetry] = useState(0),
    [ready, setReady] = useState(false);
  useEffect(() => {
    const restore = () => {
      const p = new URLSearchParams(location.search);
      setDate(p.get('date') ?? '');
      setQuery(p.get('q') ?? '');
      setTopic(p.get('topic') ?? 'all');
      setAi(p.get('ai') ?? 'all');
      setPriority(p.get('priority') ?? 'all');
      setReady(true);
    };
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries({
      date,
      q: query,
      topic,
      ai,
      priority,
    }))
      if (v && v !== 'all') p.set(k, v);
    history.replaceState(
      null,
      '',
      `${location.pathname}${p.size ? '?' + p : ''}`,
    );
  }, [ready, date, query, topic, ai, priority]);
  useEffect(() => {
    if (!ready) return;
    const c = new AbortController();
    setError(false);
    setFeed(null);
    readJson<ProgressiveFeed>(
      '/api/reports/v2' + (date ? '?date=' + encodeURIComponent(date) : ''),
      c.signal,
    )
      .then(setFeed)
      .catch(() => {
        if (!c.signal.aborted) setError(true);
      });
    readJson<{ dates: string[] }>('/api/reports/v2?dates=true', c.signal)
      .then((r) => setDates(r.dates))
      .catch(() => {});
    return () => c.abort();
  }, [ready, date, retry]);
  const visible = useMemo(
    () =>
      feed?.entries
        .filter((e) => {
          const a = e.analysis,
            m = e.metadata;
          return (
            (!query ||
              `${e.arxivId} ${m.title ?? ''} ${m.authors?.join(' ') ?? ''} ${m.abstract ?? ''} ${a?.workSummary ?? ''}`
                .toLowerCase()
                .includes(query.toLowerCase())) &&
            (topic === 'all' || (a?.topic ?? 'pending') === topic) &&
            (ai === 'all' || (a?.aiStatus ?? 'unknown') === ai) &&
            (priority === 'all' ||
              (a
                ? a.priorityScore >= 75
                  ? 'high'
                  : a.priorityScore >= 50
                    ? 'medium'
                    : 'low'
                : 'pending') === priority)
          );
        })
        .sort(
          (a, b) =>
            (b.analysis?.priorityScore ?? -1) -
              (a.analysis?.priorityScore ?? -1) ||
            a.arxivId.localeCompare(b.arxivId),
        ) ?? [],
    [feed, query, topic, ai, priority],
  );
  return (
    <main className="mx-auto max-w-[1040px] px-4 py-8 sm:px-6">
      <nav className="mb-8 flex justify-between text-sm">
        <Link href="/">G. 几何前沿日报</Link>
        <a href="https://guiloua.github.io/daily-dg-advance/">静态镜像 ↗</a>
      </nav>
      {error ? (
        <p role="alert">
          日报暂时读取失败。
          <button onClick={() => setRetry((r) => r + 1)}>重试</button>
        </p>
      ) : !feed ? (
        <p>正在读取最新日报…</p>
      ) : (
        <>
          <PublicationHeader feed={feed} />
          <PublicationOverview feed={feed} />
          <section className="mb-8">
            <div className="flex justify-between">
              <h2>近完整周分类趋势</h2>
              <select
                aria-label="趋势范围"
                value={range}
                onChange={(e) => setRange(e.target.value as '6m' | '2y')}
              >
                <option value="6m">26 周</option>
                <option value="2y">104 周</option>
              </select>
            </div>
            <LazyTrend range={range} />
          </section>
          <div className="mb-7 flex flex-wrap gap-3 text-sm">
            <select
              aria-label="公告日"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            >
              <option value="">最新公告</option>
              {dates.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <input
              aria-label="搜索论文"
              placeholder="标题、作者、摘要"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded border p-2"
            />
            <select
              aria-label="主题"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="all">全部主题</option>
              {TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
              <option value="pending">待解读</option>
            </select>
            <select
              aria-label="AI 状态"
              value={ai}
              onChange={(e) => setAi(e.target.value)}
            >
              <option value="all">全部 AI 状态</option>
              <option value="explicit">明确披露</option>
              <option value="no_disclosure_observed">已检查来源未见披露</option>
              <option value="unknown">待核查</option>
            </select>
            <select
              aria-label="优先级"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="all">全部优先级</option>
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
              <option value="pending">待解读</option>
            </select>
          </div>
          <p className="mb-5 text-sm text-muted-foreground">
            本期解读仅基于已分析的 {feed.coverage.analyzedCount}{' '}
            篇；待解读论文不参与评分与研究趋势判断。
          </p>
          {[true, false].map((analyzed) => {
            const entries = visible.filter(
              (e) => Boolean(e.analysis) === analyzed,
            );
            return entries.length ? (
              <section key={String(analyzed)}>
                <h2 className="my-5 font-serif text-xl">
                  {analyzed ? '研究解读' : '待解读'} · {entries.length}
                </h2>
                {entries.map((entry) => (
                  <EntryView
                    key={entry.arxivId}
                    entry={entry}
                    href={'/paper/' + encodeURIComponent(entry.arxivId)}
                  />
                ))}
              </section>
            ) : null;
          })}
          {!visible.length ? <p>当前条件下没有论文。</p> : null}
        </>
      )}
    </main>
  );
}
