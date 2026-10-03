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
import { filterEntries, prepareEntries } from '@/lib/progressive-reading';
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
    [loading, setLoading] = useState(true),
    [datesError, setDatesError] = useState(false),
    [datesRetry, setDatesRetry] = useState(0),
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
    setLoading(true);
    readJson<ProgressiveFeed>(
      '/api/reports/v2' + (date ? '?date=' + encodeURIComponent(date) : ''),
      c.signal,
    )
      .then((result) => {
        if (!c.signal.aborted) setFeed(result);
      })
      .catch(() => {
        if (!c.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!c.signal.aborted) setLoading(false);
      });
    return () => c.abort();
  }, [ready, date, retry]);
  useEffect(() => {
    if (!ready) return;
    const c = new AbortController();
    setDatesError(false);
    readJson<{ dates: string[] }>('/api/reports/v2?dates=true', c.signal)
      .then((result) => {
        if (!c.signal.aborted) setDates(result.dates);
      })
      .catch(() => {
        if (!c.signal.aborted) setDatesError(true);
      });
    return () => c.abort();
  }, [ready, retry, datesRetry]);
  const prepared = useMemo(() => prepareEntries(feed?.entries ?? []), [feed]);
  const visible = useMemo(
    () => filterEntries(prepared, { query, topic, ai, priority }),
    [prepared, query, topic, ai, priority],
  );
  return (
    <main className="mx-auto max-w-[1040px] px-4 py-8 sm:px-6">
      <nav className="mb-8 flex justify-between text-sm">
        <Link href="/">G. 几何前沿日报</Link>
        <a href="https://guiloua.github.io/daily-dg-advance/">静态镜像 ↗</a>
      </nav>
      {error ? (
        <p role="alert">
          {date ? `${date} 日报暂时读取失败。` : '日报暂时读取失败。'}
          {feed ? `继续显示已加载的 ${feed.date} 日报。` : ''}
          <button onClick={() => setRetry((r) => r + 1)}>重试</button>
        </p>
      ) : loading && feed ? (
        <p role="status">正在读取{date || '最新公告'}日报…</p>
      ) : null}
      {datesError ? (
        <p role="alert">
          日期列表暂时读取失败，已加载日报仍可阅读。
          <button onClick={() => setDatesRetry((r) => r + 1)}>
            重试日期列表
          </button>
        </p>
      ) : null}
      {!feed ? (
        loading ? (
          <p role="status">正在读取最新日报…</p>
        ) : null
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
              <option value="no_disclosure_observed">全文检索未见披露</option>
              <option value="unknown">待完成核查</option>
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
