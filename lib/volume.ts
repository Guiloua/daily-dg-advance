import type { VolumePoint, WeeklyVolumePoint } from './types';

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function weekBounds(value: string): { weekStart: string; weekEnding: string } {
  const date = new Date(`${value}T00:00:00Z`);
  const isoWeekday = date.getUTCDay() || 7;
  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() - (isoWeekday - 1));
  const friday = new Date(monday);
  friday.setUTCDate(monday.getUTCDate() + 4);
  return { weekStart: isoDate(monday), weekEnding: isoDate(friday) };
}

export function aggregateWeeklyVolumes(
  points: VolumePoint[],
): WeeklyVolumePoint[] {
  if (!points.length) return [];
  const latestAnnouncementDate = points.at(-1)!.announcementDate;
  const weeks = new Map<string, WeeklyVolumePoint>();
  for (const point of points) {
    const { weekStart, weekEnding } = weekBounds(point.announcementDate);
    if (weekEnding > latestAnnouncementDate) continue;
    const current = weeks.get(weekEnding) ?? {
      weekStart,
      weekEnding,
      mathDg: 0,
      mathMg: 0,
      mathGt: 0,
      totalUnique: 0,
      crosslistOverlap: 0,
    };
    current.mathDg += point.mathDg;
    current.mathMg += point.mathMg;
    current.mathGt += point.mathGt;
    current.totalUnique += point.totalUnique;
    current.crosslistOverlap += point.crosslistOverlap;
    weeks.set(weekEnding, current);
  }
  return [...weeks.values()].sort((a, b) =>
    a.weekEnding.localeCompare(b.weekEnding),
  );
}
