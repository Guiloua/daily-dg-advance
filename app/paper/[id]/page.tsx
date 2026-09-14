import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readProgressivePaper } from '@/lib/progressive-repository';
import { EntryView } from '@/components/publication-view';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const paper = await readProgressivePaper(decodeURIComponent(id));
  return {
    title: paper
      ? `${paper.entry.metadata.title ?? id} · 几何前沿日报`
      : '论文未找到',
    description:
      paper?.entry.analysis?.workSummary ?? paper?.entry.metadata.abstract,
  };
}
export default async function PaperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paper = await readProgressivePaper(decodeURIComponent(id));
  if (!paper) notFound();
  return (
    <main className="mx-auto max-w-4xl px-5 py-8">
      <nav className="mb-8 flex justify-between">
        <a href={'/?date=' + paper.date}>← 返回日报</a>
        <a href="https://guiloua.github.io/daily-dg-advance/">静态镜像 ↗</a>
      </nav>
      <EntryView entry={paper.entry} />
    </main>
  );
}
