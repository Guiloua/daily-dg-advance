import { aiUsageSummary } from '@/lib/ai-usage';
import { AiUsageBreakdown } from './ai-usage-breakdown';
import { conciseLimitations } from '@/lib/reading-presentation';
import { MathText } from './math-text';
import {
  disclosureLabel,
  disclosureStatus,
  disclosureSummary,
} from '../lib/ai-disclosure';
import {
  coverageLabel,
  progressiveOverview,
  formatPublicationTime,
  type ProgressiveEntry,
  type ProgressiveFeed,
} from '../lib/progressive';

export function EntryView({
  entry,
  href,
}: {
  entry: ProgressiveEntry;
  href?: string;
}) {
  const m = entry.metadata,
    a = entry.analysis;
  const title = m.title ?? `arXiv:${entry.arxivId} · 标题待补齐`;
  return (
    <article
      className="paper-panel mb-5 rounded-lg border border-border bg-card p-5 sm:p-7"
      data-paper
      data-title={`${m.title ?? ''} ${m.authors?.join(' ') ?? ''} ${m.abstract ?? ''} ${a?.workSummary ?? ''}`}
      data-ai={disclosureStatus(entry)}
      data-topic={a?.topic ?? 'pending'}
      data-priority={
        a
          ? a.priorityScore >= 75
            ? 'high'
            : a.priorityScore >= 50
              ? 'medium'
              : 'low'
          : 'pending'
      }
    >
      <p className="mb-3 text-xs text-muted-foreground">
        {m.categories?.join(' · ') ?? '论文分类待补齐'} ·{' '}
        {a
          ? `${a.priorityScore} / 100 · ${a.analysisDepth === 'abstract' ? '摘要级分析' : '已补读正文关键部分'}`
          : '待解读'}
        {m.version ? ` · v${m.version}` : ' · 版本待补齐'}
      </p>
      <h2 className="font-serif text-xl font-semibold leading-relaxed">
        {href ? (
          <a href={href}>
            <MathText>{title}</MathText>
          </a>
        ) : (
          <MathText>{title}</MathText>
        )}
      </h2>
      <p className="my-3 text-sm text-muted-foreground">
        {m.authors?.join(' · ') ?? '作者待补齐'}
      </p>
      {a ? (
        <div className="my-5 grid gap-4 sm:grid-cols-2">
          {[
            ['AI 使用说明', a.aiStatus === 'explicit' ? (a.aiEvidence ?? '') : ''],
            ['完成的工作', a.workSummary],
            ['主要突破', a.breakthrough],
            ['使用技术', a.techniques.join('；')],
            ['需谨慎处', conciseLimitations(a.limitations)],
          ]
            .filter(([, text]) => text)
            .map(([label, text]) => (
              <section key={label}>
                <h3 className="field-label">{label}</h3>
                <MathText>{text}</MathText>
              </section>
            ))}
        </div>
      ) : (
        <p className="my-4 text-sm text-muted-foreground">
          基础信息已发布，中文解读稍后补充。
        </p>
      )}
      {m.abstract ? (
        <details className="my-5" open={!a}>
          <summary>英文摘要</summary>
          <div className="prose-abstract mt-3 leading-7">
            <MathText>{m.abstract}</MathText>
          </div>
        </details>
      ) : (
        <p>摘要待补齐。</p>
      )}
      {m.comment ? (
        <p className="my-3 text-xs text-muted-foreground">
          作者评论：{m.comment}
        </p>
      ) : null}
      <p className="my-3 text-xs text-muted-foreground">
        {a?.aiStatus === 'explicit'
          ? a.aiEvidenceSource
          : disclosureLabel(entry)}
      </p>
      {a?.aiReview ? (
        <p className="my-3 text-sm text-muted-foreground">
          核查范围：{a.aiReview.note} ·{' '}
          {a.aiReview.version ? `v${a.aiReview.version}` : '版本待核实'}
          {a.aiReview.pages ? ` · ${a.aiReview.pages} 页` : ''} · 核查时间：
          {formatPublicationTime(a.aiReview.checkedAt)}（上海时间）{' '}
          <a href={a.aiReview.sourceUrl} target="_blank" rel="noreferrer">
            核查来源 ↗
          </a>
        </p>
      ) : null}
      <p className="my-3 text-xs text-muted-foreground">
        提交时间：{m.submittedAt ?? '待补齐'} · 修订时间：
        {m.updatedAt ?? '待补齐'}
      </p>
      <div className="flex gap-5 text-sm text-primary">
        <a
          href={`https://arxiv.org/abs/${entry.arxivId}`}
          target="_blank"
          rel="noreferrer"
        >
          arXiv 原文 ↗
        </a>
        <a
          href={`https://arxiv.org/pdf/${entry.arxivId}`}
          target="_blank"
          rel="noreferrer"
        >
          PDF ↗
        </a>
        {href ? <a href={href}>论文详情 →</a> : null}
      </div>
    </article>
  );
}
export function PublicationHeader({ feed }: { feed: ProgressiveFeed }) {
  return (
    <section className="mb-8">
      <h1 className="font-serif text-3xl font-semibold">几何前沿日报</h1>
      <p className="mt-3">
        {feed.date} · {coverageLabel(feed)}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        更新：{formatPublicationTime(feed.lastUpdated)}（上海时间）
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {disclosureSummary(feed)}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {feed.coverage.complete
          ? '本期基础资料与摘要解读已补齐。'
          : '已确认的信息持续发布，缺失资料和解读随后补齐。'}
      </p>
    </section>
  );
}

export function PublicationOverview({ feed }: { feed: ProgressiveFeed }) {
  const overview = progressiveOverview(feed);
  if (!overview.count) return null;
  return (
    <section className="mb-8 rounded-lg bg-muted p-5">
      <h2 className="mb-3 font-serif text-xl">本期研究概览</h2>
      <p className="mb-3 text-sm">
        仅基于已解读的 {overview.count} 篇。主要方向：
        {overview.topics
          .slice(0, 3)
          .map((t) => `${t.topic}（${t.count} 篇）`)
          .join('、')}
        。
      </p>
      <ul className="space-y-3 text-sm">
        {overview.highlights.map((h) => (
          <li key={h.arxivId}>
            <MathText>{h.summary}</MathText>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-border pt-4">
        <h3 className="mb-2 text-sm font-semibold">AI 技术声明</h3>
        <AiUsageBreakdown summary={aiUsageSummary(feed.entries)} />
      </div>
    </section>
  );
}
