#!/usr/bin/env node

import { readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';

const migrationDirectory = 'drizzle';
const journal = JSON.parse(
  readFileSync(join(migrationDirectory, 'meta', '_journal.json'), 'utf8'),
);
const sqlFiles = readdirSync(migrationDirectory)
  .filter((name) => /^\d{4}_.+\.sql$/.test(name))
  .sort();
const journalFiles = journal.entries.map((entry) => `${entry.tag}.sql`);

if (JSON.stringify(sqlFiles) !== JSON.stringify(journalFiles)) {
  console.error('Migration SQL files and Drizzle journal entries do not match.');
  process.exit(1);
}

const destructiveRules = [
  /\bDROP\s+(?:TABLE|COLUMN|INDEX)\b/i,
  /\bTRUNCATE\b/i,
  /\bDELETE\s+FROM\b/i,
  /\bALTER\s+TABLE\b[\s\S]*?\bRENAME\b/i,
  /\bALTER\s+TABLE\b[\s\S]*?\bALTER\s+COLUMN\b/i,
];

const unsafe = [];
for (const file of sqlFiles) {
  const sql = readFileSync(join(migrationDirectory, file), 'utf8');
  if (destructiveRules.some((rule) => rule.test(sql))) unsafe.push(basename(file));
}

if (unsafe.length) {
  console.error(
    `Destructive migration statements require an explicit migration plan: ${unsafe.join(', ')}`,
  );
  process.exit(1);
}

console.log(`Migration integrity check passed for ${sqlFiles.length} migrations.`);
