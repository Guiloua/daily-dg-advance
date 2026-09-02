#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
site_url="${1:-$(tr -d '\r\n' < "$repo_root/.automation/site-url")}" 
required_date="${2:-}"
batch_path="${3:-}"
lock_dir="$repo_root/.automation/static-mirror.lock"

if ! mkdir "$lock_dir" 2>/dev/null; then
  echo "Static mirror sync is already running." >&2
  exit 1
fi

worktree="$(mktemp -d "${TMPDIR:-/tmp}/geometry-static-content.XXXXXX")"
cleanup() {
  git -C "$repo_root" worktree remove --force "$worktree" >/dev/null 2>&1 || true
  rmdir "$lock_dir" >/dev/null 2>&1 || true
}
trap cleanup EXIT

git -C "$repo_root" fetch origin main daily-content
git -C "$repo_root" worktree add --detach "$worktree" origin/daily-content

sync_args=(
  "$repo_root/node_modules/.bin/tsx"
  "$repo_root/scripts/sync_static_mirror.ts"
  --site "$site_url"
  --output "$worktree"
  --days 10
)
if [[ -n "$required_date" ]]; then
  sync_args+=(--required-date "$required_date")
fi
if [[ -n "$batch_path" ]]; then
  sync_args+=(--batch "$batch_path")
fi
"${sync_args[@]}"

node "$repo_root/scripts/check_secrets.mjs" "$worktree"
git -C "$worktree" add README.md index.md archive.md daily papers data
if git -C "$worktree" diff --cached --quiet; then
  echo '{"status":"unchanged"}'
  exit 0
fi

latest_date="$(node -e 'const fs=require("fs"); const p=JSON.parse(fs.readFileSync(process.argv[1],"utf8")); process.stdout.write(p.latestDate)' "$worktree/data/manifest.json")"
git -C "$worktree" commit -m "content: mirror ${latest_date}"
git -C "$worktree" push origin HEAD:daily-content
content_sha="$(git -C "$worktree" rev-parse HEAD)"

gh api --method POST "repos/Guiloua/daily-dg-advance/dispatches" \
  -f event_type=static-content-updated \
  -F "client_payload[content_sha]=${content_sha}"
echo "{\"status\":\"pushed\",\"latestDate\":\"${latest_date}\",\"contentSha\":\"${content_sha}\"}"
