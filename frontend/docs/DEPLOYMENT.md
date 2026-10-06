# Deployment

## Environment

| Variable | Required | Example |
|----------|----------|---------|
| `API_INTERNAL_URL` | Yes (production) | `https://api.example.com/api/v1` |
| `NEXT_PUBLIC_APP_NAME` | No | `Website Admin` |
| `NEXT_PUBLIC_BRAND_NAME` | No | `Website Template` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://www.example.com` |

## Build

```bash
pnpm install
pnpm --filter frontend run build
pnpm --filter frontend run start
```

## Platforms

**Vercel / Railway:** set `API_INTERNAL_URL` to the deployed Nest API; set `NEXT_PUBLIC_SITE_URL`.

**Docker / Helm:** `frontend/Dockerfile` + chart `backend/deploy/helm/website-stack` (image `website-frontend`).

## CI

Root `.github/workflows/ci.yml` — lint, typecheck, unit tests, build, Playwright (`frontend/scripts/ci-e2e.sh`).

See also [backend Deployment](../../backend/docs/DEPLOYMENT.md).
