import assert from 'node:assert/strict';
import { aggregateWeeklyVolumes } from '../lib/volume';

const days = [
  {
    announcementDate: '2026-08-24',
    mathDg: 2,
    mathMg: 1,
    mathGt: 0,
  },
  {
    announcementDate: '2026-08-25',
    mathDg: 1,
    mathMg: 1,
    mathGt: 1,
  },
  {
    announcementDate: '2026-08-28',
    mathDg: 3,
    mathMg: 0,
    mathGt: 2,
  },
  {
    announcementDate: '2026-08-31',
    mathDg: 99,
    mathMg: 99,
    mathGt: 99,
  },
];

const weeks = aggregateWeeklyVolumes(days);
assert.equal(
  weeks.length,
  1,
  'an incomplete current week must remain hidden until Friday',
);
assert.deepEqual(weeks[0], {
  weekStart: '2026-08-24',
  weekEnding: '2026-08-28',
  mathDg: 6,
  mathMg: 2,
  mathGt: 3,
});
console.log('Weekly volume aggregation tests passed');
