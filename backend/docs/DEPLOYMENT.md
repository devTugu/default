# Deployment

Production for the NestJS API (`backend/`). Frontend notes: [frontend/docs/DEPLOYMENT.md](../../frontend/docs/DEPLOYMENT.md).

## Environment

| Category | Required | Notes |
|----------|----------|-------|
| `NODE_ENV` | `production` | |
| `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` | Yes | Rotate periodically |
| `DB_*` | Yes | MySQL 8; `DB_SSL=true` if needed |
| `CORS_ORIGIN` | Yes | Frontend origin |
| `REDIS_URL` | Recommended | Throttle + permission cache |
| `MFA_ENCRYPTION_KEY` | If MFA used | |
| `SWAGGER_ENABLED` | `false` in prod | |

Schema: `src/infrastructure/config/env.validation.ts`

## Database

```bash
pnpm --filter backend run migration:run
pnpm --filter backend run seed   # first deploy only
```

## Docker

```bash
docker build -t website-api -f backend/Dockerfile backend
docker run -p 3001:3000 --env-file backend/.env website-api
```

## Helm

```bash
helm lint backend/deploy/helm/website-stack
helm upgrade --install website-staging backend/deploy/helm/website-stack \
  --namespace website-staging --create-namespace \
  --set api.image.tag=v1.0.0 \
  --set frontend.image.tag=v1.0.0
```

See [deploy/helm/README.md](../deploy/helm/README.md).

## Health

| Probe | Path |
|-------|------|
| Liveness | `/api/v1/health/live` |
| Readiness | `/api/v1/health/ready` |

## Operations

**Ready returns 503:** check MySQL, Redis (`REDIS_ENABLED`), pool (`DB_CONNECTION_LIMIT`).

**Auth fails after deploy:** JWT secrets rotated? `CORS_ORIGIN` match? Redis up?

**MFA fails:** stable `MFA_ENCRYPTION_KEY`; server clock sync (TOTP).

**Backup:** `mysqldump` MySQL. Redis is ephemeral (no backup).

**Observability (off by default):** `SENTRY_DSN`, `OTEL_ENABLED` + OTLP endpoint — enable on staging first.

**Audit retention:** `AUDIT_PURGE_ENABLED`, `AUDIT_RETENTION_DAYS` (default 90).
