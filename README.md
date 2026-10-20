# Website Template

Full-stack **auth and admin starter** for a product site or internal app. Fork it, then add your domain modules on top (billing and multi-org UI are not included).

| Package | Role |
|---------|------|
| [`backend/`](backend/) | NestJS API — auth, RBAC, site-settings, media, dashboard, audit |
| [`frontend/`](frontend/) | Next.js — public home + admin dashboard (FSD + BFF) |
| [`packages/types`](packages/types) | `@default/types` — shared Zod schemas |
| [`packages/api`](packages/api) | `@default/api` — HTTP client + domain APIs |
| [`packages/hooks`](packages/hooks) | `@default/hooks` — React Query hooks |
| [`packages/ui`](packages/ui) | `@default/ui` — UI primitives |
| [`packages/design-tokens`](packages/design-tokens) | `@default/design-tokens` — tokens.json → CSS |
| [`packages/utils`](packages/utils) | `@default/utils` — pure helpers |
| [`packages/config/*`](packages/config) | shared tsconfig + eslint-config |

Agent rules: [`.cursor/rules/`](.cursor/rules/), [`CLAUDE.md`](CLAUDE.md).

**Who it is for:** a solo developer (or small team) who wants a production-shaped starting point — JWT auth, permissions, admin UI, and a marketing home — without shipping a full CMS.

## Requirements

- Node.js 20+
- [pnpm](https://pnpm.io/) 9.15+
- PostgreSQL 16
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

**Seed admin:** `admin@default.mn` / `admin123!`

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

After fork, add your own entities, pages, and APIs under the same layers. See [md/fork-guide.md](md/fork-guide.md).

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Backend + frontend (Turbo) |
| `pnpm build` / `lint` / `typecheck` / `test` | Quality gates (`^build` via Turbo) |
| `pnpm generate:tokens` | Regenerate `@default/design-tokens` CSS/theme |
| `pnpm test:e2e:backend` | Nest e2e (needs DB) |
| `pnpm test:e2e:frontend` | Playwright |
| `pnpm infra:up` / `infra:down` | Dev PostgreSQL + Redis |

## Docs

- [md/](md/) — product overview, fork guide, architecture, API, security, deployment, design-system notes
- [Helm](backend/deploy/helm/README.md)

## License

MIT
