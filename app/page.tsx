import { Dashboard } from '@/components/dashboard';
import { loadDashboard } from '@/lib/repository';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: { searchParams?: Promise<{ date?: string }> }) {
  const query = await searchParams;
  return <Dashboard initialData={await loadDashboard(query?.date)} />;
}
