'use client';

import { useMemo, useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TOPICS,
  type AiStatus,
  type DashboardData,
  type PriorityTier,
} from '@/lib/types';

const tierLabel: Record<PriorityTier, string> = {
  high: '高优先级',
  medium: '中优先级',
  low: '低阅读优先级',
};

export function Dashboard({ initialData }: { initialData: DashboardData }) {
  const [range, setRange] = useState<'6m' | '2y'>('6m');
  const [aiStatus, setAiStatus] = useState<AiStatus>('no_disclosure_observed');
  const [topic, setTopic] = useState<string>('all');
  const [priority, setPriority] = useState<string>('all');
  const [query, setQuery] = useState('');
  const visibleReports = useMemo(
    () =>
      initialData.reports.filter(
        (paper) =>
          paper.aiStatus === aiStatus &&
          (topic === 'all' || paper.topic === topic) &&
          (priority === 'all' || paper.priorityTier === priority) &&
          (!query ||
            `${paper.title} ${paper.authors.join(' ')} ${paper.workSummary}`
              .toLowerCase()
              .includes(query.toLowerCase())),
      ),
    [aiStatus, topic, priority, query, initialData.reports],
  );
  const aiCount = initialData.reports.filter(
    (paper) => paper.aiStatus === 'explicit',
  ).length;
  const conventionalCount = initialData.reports.length - aiCount;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/80 bg-background/95">
        <div className="mx-auto flex max-w-[1580px] items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full border border-primary/20 bg-primary/8 font-serif text-lg text-primary">
              G
            </div>
            <div>
              <p className="font-serif text-lg font-semibold tracking-tight">
                几何前沿日报
              </p>
              <p className="text-[10px] uppercase tracking-[0.19em] text-muted-foreground">
                Geometry arXiv Brief
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="status-dot" />
            {initialData.dataMode === 'preview'
              ? '预览数据'
              : `更新于 ${new Date(initialData.lastUpdated).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1580px] px-5 py-6 sm:px-8 sm:py-8">
        <section
          aria-labelledby="trend-title"
          className="paper-panel p-5 sm:p-7"
        >
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Publication pulse</p>
              <h1
                id="trend-title"
                className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                每周发文趋势
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                按周一至周五的 arXiv
                实际公告日汇总，每周五更新。板块分别计数；去重总量不会重复计算跨列表论文。
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
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
          <TrendChart volumes={initialData.volumes} range={range} />
        </section>

        <section className="mt-10" aria-labelledby="brief-title">
          <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <p className="eyebrow">
                {new Date(
                  `${initialData.latestDate}T12:00:00`,
                ).toLocaleDateString('zh-CN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h2
                id="brief-title"
                className="font-serif text-2xl font-semibold tracking-tight"
              >
                今日值得读什么
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                自动生成的阅读指南；关键结论请回查原论文。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <form method="GET">
                <Input
                  type="date"
                  name="date"
                  defaultValue={initialData.latestDate}
                  aria-label="选择历史公告日"
                  className="h-8 w-38 text-xs"
                />
              </form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2 size-3.5 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="题目、作者或摘要"
                  className="h-8 w-48 pl-8 text-xs"
                />
              </div>
              <select
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="h-8 rounded-lg border border-border bg-card px-2 text-xs"
              >
                <option value="all">全部主题</option>
                {TOPICS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className="h-8 rounded-lg border border-border bg-card px-2 text-xs"
              >
                <option value="all">全部优先级</option>
                <option value="high">高优先级</option>
                <option value="medium">中优先级</option>
                <option value="low">低阅读优先级</option>
              </select>
            </div>
          </div>

          <Tabs
            value={aiStatus}
            onValueChange={(value) => setAiStatus(value as AiStatus)}
          >
            <TabsList className="mb-6 h-10 max-w-full overflow-x-auto p-1">
              <TabsTrigger value="no_disclosure_observed" className="px-3">
                <Sparkles />
                未见 AI 协作声明 · {conventionalCount}
              </TabsTrigger>
              <TabsTrigger value="explicit" className="px-3">
                <Bot />
                明确披露 AI 协作 · {aiCount}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {visibleReports.length ? (
            <div className="space-y-8">
              {TOPICS.filter((item) => topic === 'all' || topic === item).map(
                (topicName) => {
                  const papers = visibleReports
                    .filter((paper) => paper.topic === topicName)
                    .sort((a, b) => b.priorityScore - a.priorityScore);
                  return (
                    <section key={topicName} className="w-full">
                      <div className="mb-3 flex items-end justify-between border-b border-border pb-2">
                        <h3 className="font-serif text-base font-semibold leading-snug">
                          {topicName}
                        </h3>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {papers.length}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {papers.length ? (
                          papers.map((paper) => (
                            <Card key={paper.id} className="paper-card">
                              <CardHeader>
                                <div className="mb-2 flex items-center justify-between gap-2">
                                  <div className="flex gap-1">
                                    {paper.categories
                                      .filter((item) =>
                                        [
                                          'math.DG',
                                          'math.MG',
                                          'math.GT',
                                        ].includes(item),
                                      )
                                      .map((item) => (
                                        <Badge
                                          key={item}
                                          variant="outline"
                                          className="border-primary/20 text-primary"
                                        >
                                          {item}
                                        </Badge>
                                      ))}
                                  </div>
                                  <span
                                    className={`font-mono text-xs font-semibold ${paper.priorityTier === 'low' ? 'text-muted-foreground' : 'text-primary'}`}
                                  >
                                    {paper.priorityScore}
                                  </span>
                                </div>
                                <p className="text-[11px] font-medium text-[var(--teal)]">
                                  {paper.progressType}
                                </p>
                                <CardTitle className="font-serif text-[17px]">
                                  {paper.title}
                                </CardTitle>
                                <p className="line-clamp-2 text-xs text-muted-foreground">
                                  {paper.authors.join(' · ')}
                                </p>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3 text-sm leading-6">
                                  <div>
                                    <p className="field-label">完成的工作</p>
                                    <p>{paper.workSummary}</p>
                                  </div>
                                  <div>
                                    <p className="field-label">技术</p>
                                    <p className="text-xs text-muted-foreground">
                                      {paper.techniques.join(' · ')}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="field-label">突破</p>
                                    <p>{paper.breakthrough}</p>
                                  </div>
                                  {paper.lowPriorityReason ? (
                                    <div className="rounded-md bg-muted p-2.5">
                                      <p className="field-label">
                                        为何本期靠后
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {paper.lowPriorityReason}
                                      </p>
                                    </div>
                                  ) : null}
                                </div>
                                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                    <Clock3 className="size-3" />
                                    {paper.analysisDepth === 'abstract'
                                      ? '摘要级分析'
                                      : '已补读正文'}
                                  </span>
                                  <a
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                                    href={`/paper/${paper.arxivId}`}
                                  >
                                    完整分析{' '}
                                    <ArrowUpRight className="size-3.5" />
                                  </a>
                                </div>
                                <p className="mt-2 text-[10px] text-muted-foreground">
                                  {tierLabel[paper.priorityTier]} ·{' '}
                                  {paper.priorityReason}
                                </p>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="rounded-lg border border-dashed border-border p-5 text-center text-xs text-muted-foreground">
                            本日该主题暂无论文
                          </div>
                        )}
                      </div>
                    </section>
                  );
                },
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <p className="font-serif text-lg">没有符合筛选条件的论文</p>
              <p className="mt-1 text-xs text-muted-foreground">
                尝试切换 AI 状态、主题或优先级。
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
