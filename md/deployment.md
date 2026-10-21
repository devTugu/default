# Deployment

Production notes for API (`backend/`) and web (`frontend/`). Helm: [backend/deploy/helm/README.md](../backend/deploy/helm/README.md).

## Backend environment

| Category | Required | Notes |
|----------|----------|-------|
| `NODE_ENV` | `production` | |
| `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` | Yes | Rotate periodically |
| `DB_*` | Yes | PostgreSQL; `DB_SSL=true` if needed |
| `CORS_ORIGIN` | Yes | Frontend origin |
| `REDIS_URL` | Recommended | Throttle + permission cache |
| `MFA_ENCRYPTION_KEY` | If MFA used | |
| `SWAGGER_ENABLED` | `false` in prod | |

Schema: `backend/src/infrastructure/config/env.validation.ts`

### Database

```bash
pnpm --filter backend run migration:run
pnpm --filter backend run seed   # first deploy only
```

### Docker (API)

```bash
docker build -t website-api -f backend/Dockerfile backend
docker run -p 3001:3000 --env-file backend/.env website-api
```

### Helm

```bash
helm lint backend/deploy/helm/website-stack
helm upgrade --install website-staging backend/deploy/helm/website-stack \
  --namespace website-staging --create-namespace \
  --set api.image.tag=v1.0.0 \
  --set frontend.image.tag=v1.0.0
```

### Health

| Probe | Path |
|-------|------|
| Liveness | `/api/v1/health/live` |
| Readiness | `/api/v1/health/ready` |

### Operations

**Ready returns 503:** check PostgreSQL, Redis (`REDIS_ENABLED`), pool (`DB_CONNECTION_LIMIT`).

**Auth fails after deploy:** JWT secrets rotated? `CORS_ORIGIN` match? Redis up?

**MFA fails:** stable `MFA_ENCRYPTION_KEY`; server clock sync (TOTP).

**Backup:** `pg_dump` PostgreSQL. Redis is ephemeral (no backup).

**Observability (off by default):** `SENTRY_DSN`, `OTEL_ENABLED` + OTLP endpoint — enable on staging first.

**Audit retention:** `AUDIT_PURGE_ENABLED`, `AUDIT_RETENTION_DAYS` (default 90).

## Frontend environment

| Variable | Required | Example |
|----------|----------|---------|
| `API_INTERNAL_URL` | Yes (production) | `https://api.example.com/api/v1` |
| `NEXT_PUBLIC_APP_NAME` | No | `Website Admin` |
| `NEXT_PUBLIC_BRAND_NAME` | No | `Website Template` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://www.example.com` |

### Build

```bash
pnpm install
pnpm --filter frontend run build
pnpm --filter frontend run start
```

### Platforms

**Vercel / Railway:** set `API_INTERNAL_URL` to the deployed Nest API; set `NEXT_PUBLIC_SITE_URL`.

**Docker / Helm:** `frontend/Dockerfile` + chart `backend/deploy/helm/website-stack` (image `website-frontend`).

## CI

Root `.github/workflows/ci.yml` — lint, typecheck, unit tests, build, Playwright (`frontend/scripts/ci-e2e.sh`).

### Local E2E (mirrors CI)

1. Start PostgreSQL + Redis (see `backend/local/postgre/docker-compose.yml`).
2. Copy `backend/.env.example` → `backend/.env`, run `pnpm --filter backend run db:setup`.
3. Build frontend with production flags:

```bash
pnpm --filter frontend run build
NEXT_SERVER_MODE=prod API_INTERNAL_URL=http://localhost:3001/api/v1 \
  API_DIR=backend bash frontend/scripts/ci-e2e.sh
```

Requires Chromium (`pnpm --filter frontend exec playwright install chromium`).
