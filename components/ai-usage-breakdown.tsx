import { aiUsageGroups, type aiUsageSummary } from '@/lib/ai-usage';
import { MathText } from './math-text';

export function AiUsageBreakdown({
  summary,
}: {
  summary: ReturnType<typeof aiUsageSummary>;
}) {
  return (
    <div className="space-y-2 text-sm leading-6">
      <p className="text-muted-foreground">按稿件计数，一篇可计入多项。</p>
      {aiUsageGroups(summary).map((group) => (
        <details key={group.key}>
          <summary className="cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-primary">
            {group.label}：{group.count} 篇
          </summary>
          {group.papers.length ? (
            <ul className="my-3 ml-5 list-disc space-y-2">
              {group.papers.map((paper) => (
                <li key={paper.arxivId}>
                  <a
                    className="underline underline-offset-4 hover:text-primary"
                    href={`/paper/${encodeURIComponent(paper.arxivId)}`}
                  >
                    <MathText>{paper.title}</MathText>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="my-2 text-muted-foreground">暂无符合此项的论文。</p>
          )}
        </details>
      ))}
    </div>
  );
}
