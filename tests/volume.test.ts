import assert from 'node:assert/strict';
import { aggregateWeeklyVolumes, selectWeeklyRange } from '../lib/volume';

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
const history = Array.from({ length: 105 }, (_, index) => ({ ...weeks[0], mathDg: index }));
assert.equal(selectWeeklyRange(history, '6m').length, 26);
assert.equal(selectWeeklyRange(history, '2y').length, 104);
assert.equal(selectWeeklyRange(history, '2y')[0].mathDg, 1);
assert.deepEqual(selectWeeklyRange(history, '6m').at(-1), history.at(-1));
assert.equal(history.length, 105, 'raw history remains unchanged');
assert.deepEqual(selectWeeklyRange([], '2y'), []);
console.log('Weekly volume aggregation tests passed');
