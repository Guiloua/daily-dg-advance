import { ProgressiveDashboard } from '@/components/progressive-dashboard';
export const dynamic = 'force-dynamic';
export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ date?: string }>;
}) {
  const query = await searchParams;
  return <ProgressiveDashboard requestedDate={query?.date} />;
}
