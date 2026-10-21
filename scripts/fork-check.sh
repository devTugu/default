#!/usr/bin/env bash
# Golden template fork / local readiness (run from repo root).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

failures=0

check() {
  local label="$1"
  shift
  if "$@"; then
    echo "✓ $label"
  else
    echo "✗ $label"
    failures=$((failures + 1))
  fi
}

echo "Golden template readiness check"
echo ""

load_env_file() {
  local file="$1"
  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
    if [[ "$line" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then
      export "$line"
    fi
  done < "$file"
}

if [[ -f backend/.env ]]; then
  load_env_file backend/.env
fi
if [[ -f frontend/.env.local ]]; then
  load_env_file frontend/.env.local
fi

check "backend/.env exists" test -f backend/.env
check "frontend/.env.local exists" test -f frontend/.env.local

API_BASE="${API_INTERNAL_URL:-http://localhost:3001/api/v1}"
API_BASE="${API_BASE%/}"

if curl -sf "${API_BASE}/health/live" -o /dev/null 2>/dev/null; then
  check "API health/live" true
  check "Public site-settings" curl -sf "${API_BASE}/site-settings" -o /dev/null
else
  echo "⊘ API not reachable at ${API_BASE} (start: pnpm dev:backend)"
fi

SITE_URL="${NEXT_PUBLIC_SITE_URL:-http://localhost:3000}"
SITE_URL="${SITE_URL%/}"

if curl -sf "${SITE_URL}/" -o /dev/null 2>/dev/null; then
  check "Marketing home /" true
  check "Sign-in /sign-in" curl -sf "${SITE_URL}/sign-in" -o /dev/null
else
  echo "⊘ Frontend not reachable at ${SITE_URL} (start: pnpm dev:frontend)"
fi

echo ""
if [[ "$failures" -gt 0 ]]; then
  echo "$failures check(s) failed. See md/fork.md."
  exit 1
fi

echo "All automated checks passed."
