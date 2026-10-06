#!/usr/bin/env bash
set -euo pipefail

SMOKE_BASE_URL="${SMOKE_BASE_URL:?Set SMOKE_BASE_URL (frontend public URL)}"
API_URL="${API_URL:?Set API_URL (API public URL)}"

echo "Smoke: API health..."
ready_status="$(curl -s -o /dev/null -w '%{http_code}' "${API_URL}/api/v1/health/ready")"
if [[ "${ready_status}" != "200" ]]; then
  echo "FAIL: /health/ready returned ${ready_status}"
  exit 1
fi
echo "OK: /health/ready → 200"

echo "Smoke: Frontend sign-in..."
sign_in_status="$(curl -s -o /dev/null -w '%{http_code}' "${SMOKE_BASE_URL}/sign-in")"
if [[ "${sign_in_status}" != "200" ]]; then
  echo "FAIL: /sign-in returned ${sign_in_status}"
  exit 1
fi
echo "OK: /sign-in → 200"

if [[ "${SMOKE_LOGIN:-false}" == "true" ]]; then
  echo "Smoke: BFF CSRF..."
  csrf_status="$(curl -s -o /dev/null -w '%{http_code}' "${SMOKE_BASE_URL}/api/auth/csrf")"
  if [[ "${csrf_status}" != "200" ]]; then
    echo "FAIL: /api/auth/csrf returned ${csrf_status}"
    exit 1
  fi
  echo "OK: /api/auth/csrf → 200"
fi

echo "All smoke checks passed."
