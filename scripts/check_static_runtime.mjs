import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const assets = join(process.argv[2], 'assets');
for (const file of readdirSync(assets).filter((name) => name.endsWith('.js'))) {
  const source = readFileSync(join(assets, file), 'utf8');
  // The only runtime network dependency is the mirror's own volume file.
  assert.doesNotMatch(
    source,
    /\/api\/|XMLHttpRequest|WebSocket|sendBeacon|import\s*\(/,
  );
  const calls = source.match(/fetch\([\s\S]*?\);/g) ?? [];
  assert.equal(calls.length, 1);
  assert.match(
    calls[0],
    /^fetch\(`\$\{basePath\}\/data\/volume\.json`,\s*\{\s*signal:\s*controller\.signal,?\s*\}\);$/,
  );
}
console.log('Static runtime depends only on same-site volume JSON.');
