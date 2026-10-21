# Deploy

Helm details: [backend/deploy/helm/README.md](../backend/deploy/helm/README.md).

## Backend env (required)

| Variable | Notes |
|----------|--------|
| `NODE_ENV=production` | |
| `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` | Rotate periodically |
| `DB_*` | PostgreSQL; `DB_SSL=true` if needed |
| `CORS_ORIGIN` | Frontend origin |
| `REDIS_URL` | Throttle + permission cache (recommended) |
| `MFA_ENCRYPTION_KEY` | If MFA enabled |
| `SWAGGER_ENABLED=false` | Prod |

Validation: `backend/src/infrastructure/config/env.validation.ts`

```bash
pnpm --filter backend run migration:run
pnpm --filter backend run seed   # first deploy only
```

**Health:** `/api/v1/health/live`, `/api/v1/health/ready`

**Docker:** `docker build -f backend/Dockerfile backend`

**Ops:** 503 ready → DB/Redis; auth fails → JWT/CORS/Redis; MFA → stable encryption key + clock.

**Optional:** `SENTRY_DSN`, `OTEL_ENABLED` — try on staging first.

## Frontend env

| Variable | Notes |
|----------|--------|
| `API_INTERNAL_URL` | e.g. `https://api.example.com/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site |
| `NEXT_PUBLIC_APP_NAME` / `NEXT_PUBLIC_BRAND_NAME` | Display only |

```bash
pnpm --filter frontend run build && pnpm --filter frontend run start
```

Vercel/Railway: set `API_INTERNAL_URL` to deployed API.

## CI & local E2E

CI: `.github/workflows/ci.yml` — lint, typecheck, test, build, Playwright.

Local E2E (optional):

1. PostgreSQL + Redis (`backend/local/postgre/docker-compose.yml` or `pnpm infra:up`)
2. `backend/.env` + `pnpm --filter backend run db:setup`
3. `pnpm --filter frontend run build`
4. `NEXT_SERVER_MODE=prod API_INTERNAL_URL=http://localhost:3001/api/v1 API_DIR=backend bash frontend/scripts/ci-e2e.sh`

Playwright: `pnpm --filter frontend exec playwright install chromium`
