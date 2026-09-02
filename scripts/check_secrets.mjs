#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { relative, resolve } from 'node:path';

const root = process.cwd();
const ignoredDirectories = new Set([
  '.git',
  '.next',
  '.vinext',
  '.wrangler',
  'node_modules',
]);

function filesBelow(path) {
  const absolute = resolve(root, path);
  const stat = statSync(absolute);
  if (stat.isFile()) return [absolute];
  const files = [];
  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const child = resolve(absolute, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(relative(root, child)));
    else if (entry.isFile()) files.push(child);
  }
  return files;
}

function trackedFiles() {
  return execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
    .split('\0')
    .filter(Boolean)
    .map((path) => resolve(root, path));
}

const rules = [
  ['private-key', /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/g],
  ['openai-key', /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/g],
  ['github-token', /\bgh[pousr]_[A-Za-z0-9]{30,}\b/g],
  ['aws-access-key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g],
  ['slack-token', /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g],
  ['literal-bearer', /\bBearer\s+[A-Za-z0-9._-]{24,}\b/g],
];

function hasUnsafeIngestAssignment(text) {
  const assignments = text.matchAll(
    /INGEST_TOKEN\s*[:=]\s*["']?([^"'\s,;]+)/g,
  );
  for (const match of assignments) {
    const value = match[1];
    if (
      !value.startsWith('replace-with-') &&
      !value.startsWith('env.') &&
      !value.startsWith('process.env') &&
      !value.startsWith('${{') &&
      value !== 'undefined'
    ) {
      return true;
    }
  }
  return false;
}

const requested = process.argv.slice(2);
const files = requested.length ? requested.flatMap(filesBelow) : trackedFiles();
const findings = [];
for (const file of files) {
  const buffer = readFileSync(file);
  if (buffer.includes(0)) continue;
  const text = buffer.toString('utf8');
  for (const [name, pattern] of rules) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) findings.push({ file: relative(root, file), rule: name });
  }
  if (hasUnsafeIngestAssignment(text)) {
    findings.push({ file: relative(root, file), rule: 'ingest-token-assignment' });
  }
}

if (findings.length) {
  console.error('Potential secrets detected (values intentionally redacted):');
  for (const finding of findings) {
    console.error(`- ${finding.file}: ${finding.rule}`);
  }
  process.exit(1);
}

console.log(`Secret scan passed for ${files.length} files.`);
