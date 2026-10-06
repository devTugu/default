# Website Template

Full-stack **auth and admin starter** for a product site or internal app. Fork it, then add your domain modules on top (billing and multi-org UI are not included).

| Package | Role |
|---------|------|
| [`backend/`](backend/) | NestJS API — auth, RBAC, site-settings, media, dashboard, audit |
| [`frontend/`](frontend/) | Next.js — public home + admin dashboard (FSD + BFF) |

**Who it is for:** a solo developer (or small team) who wants a production-shaped starting point — JWT auth, permissions, admin UI, and a marketing home — without shipping a full CMS.

## Requirements

- Node.js 20+
- [pnpm](https://pnpm.io/) 9.15+
- MySQL 8
- Redis 7 (optional; set `REDIS_ENABLED=false`)

## Quick start

```bash
pnpm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
# Edit DB_* and JWT_* in backend/.env

pnpm infra:up
pnpm --filter backend run migration:run
pnpm --filter backend run seed
pnpm dev
```

**Seed admin:** `admin@example.com` / `Admin123!`

| Resource | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| API | http://localhost:3001/api/v1 |
| Health | http://localhost:3001/api/v1/health/ready |

## What you get

- Auth: JWT + refresh, optional MFA / OIDC
- Admin: users, roles, permissions, site-settings, audit, security
- Public: `/` (hero + about from site-settings)
- Stack: NestJS Clean Architecture + Drizzle, Next.js FSD + BFF cookies

After fork, add your own entities, pages, and APIs under the same layers. See [backend/docs/FORK-GUIDE.md](backend/docs/FORK-GUIDE.md).

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Backend + frontend |
| `pnpm build` / `lint` / `test` | Quality gates |
| `pnpm test:e2e:backend` | Nest e2e (needs DB) |
| `pnpm test:e2e:frontend` | Playwright |
| `pnpm infra:up` / `infra:down` | Dev MySQL + Redis |

## Docs

- [Backend docs](backend/docs/) — fork, architecture, API, security, deploy
- [Frontend docs](frontend/docs/) — fork, architecture, security, deploy
- [Helm](backend/deploy/helm/README.md)

## License

MIT
