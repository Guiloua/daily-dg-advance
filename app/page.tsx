import { Dashboard } from '@/components/dashboard';
import { loadDashboard } from '@/lib/repository';
import type { DashboardData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ date?: string }>;
}) {
  const query = await searchParams;
  const initialData: DashboardData =
    process.env.NODE_ENV === 'development'
      ? await loadDashboard(query?.date)
      : {
          latestDate: query?.date ?? new Date().toISOString().slice(0, 10),
          lastUpdated: '',
          volumes: [],
          reports: [],
          dataMode: 'loading',
          coverage: {
            expectedCount: 0,
            publishedCount: 0,
            complete: false,
          },
        };
  return <Dashboard initialData={initialData} requestedDate={query?.date} />;
}
