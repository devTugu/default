#!/usr/bin/env bash
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

echo "Fork readiness check — nextjs-fsd-portfolio-template"
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

if [[ -f .env.local ]]; then
  load_env_file .env.local
elif [[ -f .env ]]; then
  load_env_file .env
fi

check "NEXT_PUBLIC_APP_NAME is set" test -n "${NEXT_PUBLIC_APP_NAME:-}"
check "NEXT_PUBLIC_BRAND_NAME is set" test -n "${NEXT_PUBLIC_BRAND_NAME:-}"
check "API_INTERNAL_URL is set" test -n "${API_INTERNAL_URL:-}"

API_BASE="${API_INTERNAL_URL%/}"
HEALTH_URL="${API_BASE}/health/live"

if [[ -n "${API_INTERNAL_URL:-}" ]]; then
  check "API health/live responds" curl -sf "$HEALTH_URL" -o /dev/null
  check "Public site-settings responds" curl -sf "${API_BASE}/site-settings" -o /dev/null
  check "Public brands responds" curl -sf "${API_BASE}/brands?limit=1" -o /dev/null
else
  echo "⊘ Skipping API checks (API_INTERNAL_URL not set)"
fi

SITE_URL="${NEXT_PUBLIC_SITE_URL:-http://localhost:3000}"
SITE_URL="${SITE_URL%/}"

if curl -sf "${SITE_URL}/api/health" -o /dev/null 2>/dev/null; then
  check "Next.js /api/health" true
  check "Marketing home responds" curl -sf "${SITE_URL}/" -o /dev/null
  check "Brands page responds" curl -sfL "${SITE_URL}/projects" -o /dev/null
  check "News page responds" curl -sf "${SITE_URL}/news" -o /dev/null
  check "Contact page responds" curl -sf "${SITE_URL}/contact" -o /dev/null
else
  echo "⊘ Skipping Next.js route checks (dev server not running at ${SITE_URL})"
fi

echo ""
if [[ "$failures" -gt 0 ]]; then
  echo "$failures check(s) failed. See docs/FORK-GUIDE.md."
  exit 1
fi

echo "All checks passed."
