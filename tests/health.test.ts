import assert from 'node:assert/strict';
import {
  buildHealthSnapshot,
  unavailableHealthSnapshot,
} from '../lib/health';

const completeWeek = {
  weekStart: '2026-08-24',
  weekEnding: '2026-08-28',
  mathDg: 118,
  mathMg: 32,
  mathGt: 55,
};
const healthy = buildHealthSnapshot({
  checkedAt: '2026-09-02T06:30:00Z',
  latestAnnouncementDate: '2026-09-02',
  latestSuccessfulRunAt: '2026-09-02T06:20:00Z',
  expectedCount: 55,
  publishedCount: 55,
  databasePublicationCount: 55,
  hasDailyVolume: true,
  latestCompleteWeek: completeWeek,
});

assert.equal(healthy.status, 'ok');
assert.deepEqual(healthy.checks, {
  database: true,
  coverage: true,
  weeklyVolume: true,
});

const mismatch = buildHealthSnapshot({
  ...healthy,
  expectedCount: 55,
  publishedCount: 54,
  databasePublicationCount: 54,
  hasDailyVolume: true,
});
assert.equal(mismatch.status, 'degraded');
assert.equal(mismatch.coverage.complete, false);

const zeroDay = buildHealthSnapshot({
  checkedAt: '2026-09-03T06:30:00Z',
  latestAnnouncementDate: '2026-09-03',
  latestSuccessfulRunAt: '2026-09-03T06:20:00Z',
  expectedCount: 0,
  publishedCount: 0,
  databasePublicationCount: 0,
  hasDailyVolume: true,
  latestCompleteWeek: completeWeek,
});
assert.equal(zeroDay.status, 'ok', 'a confirmed zero-publication day is healthy');

assert.equal(
  unavailableHealthSnapshot('2026-09-02T06:30:00Z').status,
  'degraded',
);
console.log('Health snapshot tests passed');
