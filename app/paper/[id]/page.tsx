import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  BookOpen,
  Gauge,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MathText } from '@/components/math-text';
import { getPaper } from '@/lib/repository';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const paper = await getPaper(decodeURIComponent(id));
  if (!paper) return { title: '论文未找到 · 几何前沿日报' };
  return {
    title: `${paper.title} · 几何前沿日报`,
    description: paper.workSummary,
    openGraph: {
      title: paper.title,
      description: paper.workSummary,
      images: [],
    },
    twitter: {
      card: 'summary',
      title: paper.title,
      description: paper.workSummary,
      images: [],
    },
  };
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paper = await getPaper(decodeURIComponent(id));
  if (!paper) notFound();
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          返回日报
        </Link>
        <article className="paper-panel p-6 sm:p-10">
          <div className="flex flex-wrap gap-2">
            {paper.categories.map((category) => (
              <Badge key={category} variant="outline">
                {category}
              </Badge>
            ))}
            <Badge
              variant={paper.priorityTier === 'low' ? 'secondary' : 'default'}
            >
              {paper.priorityScore} ·{' '}
              {paper.priorityTier === 'high'
                ? '高优先级'
                : paper.priorityTier === 'medium'
                  ? '中优先级'
                  : '低阅读优先级'}
            </Badge>
          </div>
          <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            {paper.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {paper.authors.join(' · ')}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="size-3.5" />
              {paper.analysisDepth === 'abstract'
                ? '摘要级分析'
                : '已补读正文关键部分'}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="size-3.5" />
              {paper.topic}
            </span>
            <span className="flex items-center gap-1">
              {paper.aiStatus === 'explicit' ? (
                <Bot className="size-3.5" />
              ) : (
                <Sparkles className="size-3.5" />
              )}
              {paper.aiStatus === 'explicit'
                ? '明确披露 AI 协作'
                : '未见已检查来源中的 AI 协作声明'}
            </span>
          </div>
          <div className="mt-10 grid gap-7 sm:grid-cols-2">
            <section>
              <p className="field-label">完成的工作</p>
              <p className="leading-7">{paper.workSummary}</p>
            </section>
            <section>
              <p className="field-label">主要突破</p>
              <p className="leading-7">{paper.breakthrough}</p>
            </section>
            <section>
              <p className="field-label">使用技术</p>
              <ul className="space-y-2">
                {paper.techniques.map((technique) => (
                  <li key={technique} className="flex gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-primary" />
                    {technique}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <p className="field-label">限制与不确定性</p>
              <p className="leading-7">{paper.limitations}</p>
            </section>
          </div>
          <section className="mt-10 border-t border-border pt-8">
            <p className="field-label">原始英文摘要</p>
            <div className="prose-abstract mt-3 leading-7 text-foreground/85">
              <MathText>{paper.abstract}</MathText>
            </div>
          </section>
          <section className="mt-8 rounded-lg bg-muted p-4">
            <p className="field-label">排序理由</p>
            <p className="text-sm leading-6">{paper.priorityReason}</p>
            {paper.lowPriorityReason ? (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {paper.lowPriorityReason}
              </p>
            ) : null}
          </section>
          {paper.aiStatus === 'explicit' ? (
            <section className="mt-5 rounded-lg border border-[var(--teal)]/25 bg-[var(--teal)]/5 p-4">
              <p className="field-label">AI 协作证据</p>
              <p className="text-sm">{paper.aiEvidence}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                来源：{paper.aiEvidenceSource}
              </p>
            </section>
          ) : null}
          <div className="mt-8 flex gap-3">
            <a
              href={paper.arxivUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              arXiv 页面 <ArrowUpRight className="size-4" />
            </a>
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium"
            >
              PDF <ArrowUpRight className="size-4" />
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}
