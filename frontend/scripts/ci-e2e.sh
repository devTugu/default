#!/usr/bin/env bash
set -euo pipefail

# Run from monorepo root: API_DIR=backend bash frontend/scripts/ci-e2e.sh
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
API_DIR="${API_DIR:-backend}"
API_PATH="${ROOT_DIR}/${API_DIR}"
API_PID=""
KEYCLOAK_STARTED=false

cd "${ROOT_DIR}"

cleanup() {
  if [[ -n "${API_PID}" ]] && kill -0 "${API_PID}" 2>/dev/null; then
    kill "${API_PID}" || true
    wait "${API_PID}" 2>/dev/null || true
  fi
  if [[ "${KEYCLOAK_STARTED}" == "true" ]]; then
    docker compose -f "${API_PATH}/deploy/docker/docker-compose.keycloak-e2e.yml" down || true
  fi
}
trap cleanup EXIT

if [[ "${RUN_OAUTH_E2E:-true}" == "true" ]] && command -v docker >/dev/null 2>&1; then
  echo "Starting Keycloak for OAuth E2E..."
  docker compose -f "${API_PATH}/deploy/docker/docker-compose.keycloak-e2e.yml" up -d
  KEYCLOAK_STARTED=true
  echo "Waiting for Keycloak at http://localhost:8080/health/ready ..."
  for attempt in $(seq 1 60); do
    if curl -sf http://localhost:8080/health/ready > /dev/null; then
      echo "Keycloak is ready"
      break
    fi
    if [[ "${attempt}" -eq 60 ]]; then
      echo "Keycloak failed to become ready in time"
      docker compose -f "${API_PATH}/deploy/docker/docker-compose.keycloak-e2e.yml" logs keycloak || true
      exit 1
    fi
    sleep 3
  done
  cat >> "${API_PATH}/.env" <<'EOF'
OAUTH_ENABLED=true
OAUTH_ISSUER=http://localhost:8080/realms/website
OAUTH_CLIENT_ID=website-admin
OAUTH_CLIENT_SECRET=website-admin-secret
OAUTH_CALLBACK_URL=http://localhost:3000/oauth/callback
EOF
  export NEXT_PUBLIC_OAUTH_ENABLED=true
fi

if [[ -n "${MFA_REQUIRED_ROLES:-}" ]]; then
  echo "MFA_REQUIRED_ROLES=${MFA_REQUIRED_ROLES}" >> "${API_PATH}/.env"
fi

echo "Building API for E2E..."
pnpm --filter backend run build

MAIN_ENTRY=""
if [[ -f "${API_PATH}/dist/main.js" || -f "${API_PATH}/dist/main" ]]; then
  MAIN_ENTRY="dist/main"
elif [[ -f "${API_PATH}/dist/src/main.js" || -f "${API_PATH}/dist/src/main" ]]; then
  MAIN_ENTRY="dist/src/main"
fi

if [[ -z "${MAIN_ENTRY}" ]]; then
  echo "API build output missing main entry."
  exit 1
fi

echo "Starting API from ${MAIN_ENTRY} ..."
(
  cd "${API_PATH}"
  node "${MAIN_ENTRY}"
) &
API_PID=$!

echo "Waiting for API at http://localhost:3001/api/v1/health/ready..."
for attempt in $(seq 1 60); do
  if curl -sf http://localhost:3001/api/v1/health/ready > /dev/null; then
    echo "API is ready"
    break
  fi
  if [[ "${attempt}" -eq 60 ]]; then
    echo "API failed to become ready in time"
    exit 1
  fi
  sleep 2
done

pnpm --filter frontend run test:e2e
