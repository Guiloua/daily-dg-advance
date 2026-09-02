'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Bot,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Clock3,
  Search,
  Sparkles,
} from 'lucide-react';
import { TrendChart } from './trend-chart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { groupVisibleReports } from '@/lib/dashboard';
import {
  TOPICS,
  type AiStatus,
  type DashboardData,
  type PriorityTier,
  type Topic,
} from '@/lib/types';

const tierLabel: Record<PriorityTier, string> = {
  high: '高优先级',
  medium: '中优先级',
  low: '低阅读优先级',
};

export function Dashboard({
  initialData,
  requestedDate,
}: {
  initialData: DashboardData;
  requestedDate?: string;
}) {
  const [data, setData] = useState(initialData);
  const [range, setRange] = useState<'6m' | '2y'>('6m');
  const [aiStatus, setAiStatus] = useState<AiStatus>(
    'no_disclosure_observed',
  );
  const [topic, setTopic] = useState<Topic | 'all'>('all');
  const [priority, setPriority] = useState<PriorityTier | 'all'>('all');
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (initialData.dataMode !== 'loading') return;
    let cancelled = false;
    const reportUrl = requestedDate
      ? `/api/reports?date=${encodeURIComponent(requestedDate)}`
      : '/api/reports';
    Promise.all([
      fetch(reportUrl),
      fetch('/api/volume?range=2y'),
    ])
      .then(async ([reportsResponse, volumeResponse]) => {
        if (!reportsResponse.ok || !volumeResponse.ok) {
          throw new Error('Dashboard API unavailable');
        }
        const reportsPayload = (await reportsResponse.json()) as {
          date: string;
          lastUpdated: string;
          coverage: DashboardData['coverage'];
          reports: DashboardData['reports'];
        };
        const volumePayload = (await volumeResponse.json()) as {
          points: DashboardData['volumes'];
        };
        if (!cancelled) {
          setData({
            latestDate: reportsPayload.date,
            lastUpdated: reportsPayload.lastUpdated,
            coverage: reportsPayload.coverage,
            reports: reportsPayload.reports,
            volumes: volumePayload.points,
            dataMode: 'database',
          });
        }
      })
      .catch(() => {
        // Failed production reads become explicit; preview papers are never
        // substituted for a database error.
        if (!cancelled) {
          setData((current) => ({ ...current, dataMode: 'unavailable' }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [initialData, requestedDate]);
  const topicGroups = useMemo(
    () =>
      groupVisibleReports(data.reports, {
        aiStatus,
        topic,
        priority,
        query,
      }),
    [aiStatus, topic, priority, query, data.reports],
  );
  const aiCount = data.reports.filter(
    (paper) => paper.aiStatus === 'explicit',
  ).length;
  const conventionalCount = data.reports.length - aiCount;
  const statusLabel =
    data.dataMode === 'loading'
      ? '正在读取最新日报'
      : data.dataMode === 'unavailable'
      ? '数据暂不可用'
      : data.dataMode === 'preview'
        ? '本地预览'
        : data.coverage.complete
          ? `已收录 ${data.coverage.publishedCount} / ${data.coverage.expectedCount}`
          : `已收录 ${data.coverage.publishedCount} · 待核验`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/80 bg-background/95">
        <div className="mx-auto flex min-h-[62px] max-w-[1040px] items-center justify-between gap-4 px-[14px] sm:px-5">
          <div className="flex min-w-0 items-baseline gap-2.5">
            <span
              aria-hidden="true"
              className="font-serif text-xl font-semibold italic text-primary"
            >
              G.
            </span>
            <div className="flex min-w-0 items-baseline gap-3">
              <p className="truncate font-serif text-base font-semibold tracking-tight sm:text-lg">
                几何前沿日报
              </p>
              <p className="hidden text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:block">
                Geometry arXiv Brief
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
            <span
              className={`inline-block size-2 rounded-full ${data.dataMode === 'loading' ? 'bg-amber-500' : data.dataMode === 'unavailable' ? 'bg-red-600' : 'bg-emerald-600'}`}
            />
            {statusLabel}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1040px] px-[14px] py-9 sm:px-5 sm:py-12">
        <section
          className="mx-auto max-w-[840px]"
          aria-labelledby="brief-title"
        >
          <div>
            <p className="eyebrow">
              {new Date(
                `${data.latestDate}T12:00:00`,
              ).toLocaleDateString('zh-CN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <h1
              id="brief-title"
              className="font-serif text-3xl font-semibold tracking-[-0.025em] sm:text-4xl"
            >
              今日值得读什么
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              自动生成的阅读指南，关键结论请回查原论文。
            </p>
          </div>

          {data.dataMode === 'loading' || data.dataMode === 'unavailable' ? (
            <div className="mt-8 border-y border-border py-8">
              <p className="font-serif text-lg font-semibold">
                {data.dataMode === 'loading' ? '正在读取最新日报' : '数据暂不可用'}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {data.dataMode === 'loading'
                  ? '正在从站点数据库载入完整论文清单与趋势。'
                  : '站点未能读取最新日报，请稍后刷新；当前不会用示例论文替代真实数据。'}
              </p>
            </div>
          ) : null}

          {data.dataMode === 'database' || data.dataMode === 'preview' ? (
          <><div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-[150px_minmax(220px,1fr)_190px_150px]">
            <form method="GET">
              <Input
                key={data.latestDate}
                type="date"
                name="date"
                defaultValue={data.latestDate}
                onChange={(event) => event.currentTarget.form?.requestSubmit()}
                aria-label="选择历史公告日"
                className="h-10 w-full rounded-[4px] text-xs"
              />
            </form>
            <div className="relative">
              <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="题目、作者或摘要"
                aria-label="搜索论文"
                className="h-10 w-full rounded-[4px] pl-9 text-xs"
              />
            </div>
            <select
              value={topic}
              aria-label="按研究主题筛选"
              onChange={(event) =>
                setTopic(event.target.value as Topic | 'all')
              }
              className="h-10 min-w-0 rounded-[4px] border border-border bg-card px-3 text-xs"
            >
              <option value="all">全部主题</option>
              {TOPICS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              value={priority}
              aria-label="按阅读优先级筛选"
              onChange={(event) =>
                setPriority(event.target.value as PriorityTier | 'all')
              }
              className="h-10 min-w-0 rounded-[4px] border border-border bg-card px-3 text-xs"
            >
              <option value="all">全部优先级</option>
              <option value="high">高优先级</option>
              <option value="medium">中优先级</option>
              <option value="low">低阅读优先级</option>
            </select>
          </div>

          <Tabs
            value={aiStatus}
            onValueChange={(value) => setAiStatus(value as AiStatus)}
            className="mt-5"
          >
            <TabsList className="grid h-auto w-full grid-cols-2 rounded-[4px] bg-muted/70 p-1 sm:w-fit">
              <TabsTrigger
                value="no_disclosure_observed"
                className="rounded-[3px] px-3 py-2"
              >
                <Sparkles />
                <span className="sm:hidden">
                  未见 AI 声明 · {conventionalCount}
                </span>
                <span className="hidden sm:inline">
                  未见 AI 协作声明 · {conventionalCount}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="explicit"
                className="rounded-[3px] px-3 py-2"
              >
                <Bot />
                <span className="sm:hidden">已披露 AI 协作 · {aiCount}</span>
                <span className="hidden sm:inline">
                  明确披露 AI 协作 · {aiCount}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {topicGroups.length ? (
            <div className="mt-11 space-y-14">
              {topicGroups.map(({ topic: topicName, papers }) => (
                <section key={topicName} className="w-full">
                  <div className="flex items-end justify-between border-b border-border pb-2.5">
                    <h2 className="font-serif text-lg font-semibold leading-snug">
                      {topicName}
                    </h2>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {papers.length}
                    </span>
                  </div>
                  <div className="divide-y divide-border">
                    {papers.map((paper) => (
                      <article key={paper.id} className="py-7 first:pt-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {paper.categories
                              .filter((item) =>
                                ['math.DG', 'math.MG', 'math.GT'].includes(
                                  item,
                                ),
                              )
                              .map((item) => (
                                <Badge
                                  key={item}
                                  variant="outline"
                                  className="rounded-[3px] border-primary/20 text-primary"
                                >
                                  {item}
                                </Badge>
                              ))}
                            <span className="ml-1 text-[11px] font-medium text-[var(--teal)]">
                              {paper.progressType}
                            </span>
                          </div>
                          <span
                            className={`font-mono text-xs font-semibold ${paper.priorityTier === 'low' ? 'text-muted-foreground' : 'text-primary'}`}
                          >
                            {paper.priorityScore}
                          </span>
                        </div>

                        <h3 className="mt-3 font-serif text-xl font-semibold leading-[1.34] tracking-[-0.012em] sm:text-[1.4rem]">
                          {paper.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                          {paper.authors.join(' · ')}
                        </p>

                        <div className="mt-6 space-y-5 text-[15px] leading-7">
                          <div>
                            <p className="field-label">完成的工作</p>
                            <p>{paper.workSummary}</p>
                          </div>
                          <div>
                            <p className="field-label">技术</p>
                            <p className="text-sm text-muted-foreground">
                              {paper.techniques.join(' · ')}
                            </p>
                          </div>
                          <div>
                            <p className="field-label">突破</p>
                            <p>{paper.breakthrough}</p>
                          </div>
                          {paper.lowPriorityReason ? (
                            <div className="border-l-2 border-border pl-3.5">
                              <p className="field-label">为何本期靠后</p>
                              <p className="text-sm text-muted-foreground">
                                {paper.lowPriorityReason}
                              </p>
                            </div>
                          ) : null}
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
                          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <Clock3 className="size-3" />
                            {paper.analysisDepth === 'abstract'
                              ? '摘要级分析'
                              : '已补读正文'}
                          </span>
                          <a
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                            href={`/paper/${paper.arxivId}`}
                          >
                            完整分析 <ArrowUpRight className="size-3.5" />
                          </a>
                        </div>
                        <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                          {tierLabel[paper.priorityTier]} · {paper.priorityReason}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="mt-11 border-y border-border py-10 text-center">
              <p className="font-serif text-lg">没有符合筛选条件的论文</p>
              <p className="mt-1 text-xs text-muted-foreground">
                尝试切换 AI 状态、主题或优先级。
              </p>
            </div>
          )}</>
          ) : null}
        </section>

        {(data.dataMode === 'database' || data.dataMode === 'preview') &&
        data.volumes.length ? (
        <section
          aria-labelledby="trend-title"
          className="mt-20 border-t border-border pt-11 sm:mt-24 sm:pt-14"
        >
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Publication pulse</p>
              <h2
                id="trend-title"
                className="font-serif text-2xl font-semibold tracking-[-0.02em] sm:text-3xl"
              >
                每周发文趋势
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                按周一至周五的 arXiv
                实际公告日汇总，每周五更新。每条线分别统计该板块的新投稿与跨列表论文。
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-fit rounded-[4px]"
              aria-expanded={range === '2y'}
              onClick={() =>
                setRange((current) => (current === '6m' ? '2y' : '6m'))
              }
            >
              <CalendarDays />
              {range === '6m' ? '展开至两年' : '收回近六月'}
              {range === '6m' ? <ChevronDown /> : <ChevronUp />}
            </Button>
          </div>
          <TrendChart volumes={data.volumes} range={range} />
        </section>
        ) : null}
      </div>
    </main>
  );
}
