import type { HealthSnapshot, WeeklyVolumePoint } from './types';

export interface HealthSnapshotInput {
  checkedAt: string;
  latestAnnouncementDate: string | null;
  latestSuccessfulRunAt: string | null;
  expectedCount: number;
  publishedCount: number;
  databasePublicationCount: number;
  hasDailyVolume: boolean;
  latestCompleteWeek: WeeklyVolumePoint | null;
}

export function buildHealthSnapshot(
  input: HealthSnapshotInput,
): HealthSnapshot {
  const database = Boolean(
    input.latestAnnouncementDate &&
      input.latestSuccessfulRunAt &&
      input.hasDailyVolume,
  );
  const coverage =
    database &&
    input.expectedCount === input.publishedCount &&
    input.expectedCount === input.databasePublicationCount;
  const weeklyVolume = Boolean(input.latestCompleteWeek);
  const checks = { database, coverage, weeklyVolume };

  return {
    status: Object.values(checks).every(Boolean) ? 'ok' : 'degraded',
    checkedAt: input.checkedAt,
    latestAnnouncementDate: input.latestAnnouncementDate,
    latestSuccessfulRunAt: input.latestSuccessfulRunAt,
    coverage: {
      expectedCount: input.expectedCount,
      publishedCount: input.publishedCount,
      databasePublicationCount: input.databasePublicationCount,
      complete: coverage,
    },
    latestCompleteWeek: input.latestCompleteWeek,
    checks,
  };
}

export function unavailableHealthSnapshot(checkedAt: string): HealthSnapshot {
  return buildHealthSnapshot({
    checkedAt,
    latestAnnouncementDate: null,
    latestSuccessfulRunAt: null,
    expectedCount: 0,
    publishedCount: 0,
    databasePublicationCount: 0,
    hasDailyVolume: false,
    latestCompleteWeek: null,
  });
}
