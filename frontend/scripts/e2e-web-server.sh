#!/usr/bin/env bash
# Playwright webServer — production build uses output: 'standalone', not `next start`.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT}"

if [[ -f .next/standalone/server.js ]]; then
  cp -r public .next/standalone/public
  mkdir -p .next/standalone/.next
  cp -r .next/static .next/standalone/.next/static
  cd .next/standalone
  export HOSTNAME="${HOSTNAME:-127.0.0.1}"
  export PORT="${PORT:-3000}"
  export NODE_ENV="${NODE_ENV:-production}"
  exec node server.js
fi

exec pnpm run start
