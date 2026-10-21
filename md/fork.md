# Fork & extend

Platform skeleton (auth, RBAC, admin, marketing) — not a vertical clone (Booking/Shopify/Upwork). Add your domains on the same layers.

## Quick commands

```bash
pnpm fork:check
pnpm generate:domain -- --name announcements
pnpm fork:rename-scope -- --scope @acme          # dry-run
pnpm fork:rename-scope -- --scope @acme --apply  # rename @default → @acme
```

## Branding

| Variable | Purpose |
|----------|---------|
| `APP_DISPLAY_NAME` | API / Swagger name |
| `MFA_ISSUER` | Authenticator label |
| `NEXT_PUBLIC_APP_NAME` | Admin title |
| `NEXT_PUBLIC_BRAND_NAME` | Fallback brand |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL |
| `API_INTERNAL_URL` | Server-only Nest base (`…/api/v1`) — required in prod |
| `NEXT_SERVER_MODE` | `dev` \| `prod` — `/docs` catalog in dev only |

**Runtime:** Admin → **Site settings** (logos, hero, SEO, theme). See `frontend/src/shared/config/brand.ts`.

## Main routes

| Path | Purpose |
|------|---------|
| `/` | Marketing home |
| `/sign-in` | Login (BFF cookies) |
| `/dashboard/*` | Admin (users, roles, permissions, site-settings, security, audit) |

Constants: `frontend/src/shared/config/routes.ts`.

## Add a domain

0. **Scaffold:** `pnpm generate:domain -- --name <kebab-case>` — types → api → hooks → Drizzle table + repository → Nest `GET /admin/<name>` → BFF + `/dashboard/<name>` + `${NAME}_READ` + sidebar/i18n.
1. **Migrate:** `pnpm --filter backend run db:generate` → `migration:run` → `seed`.
2. **Product logic** — extend table/port/use cases; domain entities when rules grow.
3. **UI** — data table, forms in `frontend/src/features/<domain>/`.
4. **Gate** — `pnpm quality && pnpm audit`.

**Copy pattern:** users, site-settings, or audit-logs (list + permissions).

### Vertical module ideas (you build these)

| Shape | Modules to add |
|-------|----------------|
| Marketplace | `jobs`, `proposals`, `contracts`, `wallet` |
| Merchant | `shops`, `products`, `orders` + external billing |
| Booking | `listings`, `availability`, `reservations` |

## Where code lives

| Goal | Path |
|------|------|
| Shared schema | `packages/types/src/<domain>/` |
| HTTP client | `packages/api/src/<domain>/` |
| Hooks | `packages/hooks/src/<domain>/` |
| Backend | `backend/src/domain|application|infrastructure|presentation` |
| Admin UI | `frontend/src/features/<domain>/` |
| BFF allowlist | `frontend/src/shared/config/bff-allowlist.ts` |

Data flow: `@default/types` → `@default/api` → `@default/hooks` → UI. No raw Nest `fetch` in features.

**Included:** auth, MFA/OIDC, users/roles/permissions, site-settings, media, dashboard, audit log read.  
**Not included:** billing, multi-org UI, feature flags, full CMS.

## Production checklist

**Backend:** rotate `JWT_*` / `MFA_ENCRYPTION_KEY`, `CORS_ORIGIN`, `SWAGGER_ENABLED=false`, Redis on, smoke `/health/ready` + login.

**Frontend:** `API_INTERNAL_URL`, `NEXT_PUBLIC_SITE_URL`, no secrets in `NEXT_PUBLIC_*`, smoke `/` + sign-in + dashboard.

Details: [deploy.md](deploy.md), [security.md](security.md).

## Syncing template updates

1. Watch upstream [CHANGELOG.md](../CHANGELOG.md) and git tags (`v1.x.x`).
2. Merge **platform** changes: `.github/`, `.cursor/rules/`, `packages/config/`, auth/BFF, CI scripts, shared packages you did not fork heavily.
3. Keep **product** changes: your `packages/types/src/<product>/`, `frontend/src/features/<product>/`, Drizzle migrations for your tables.
4. After merge: `pnpm install`, `pnpm quality`, `pnpm test:e2e:backend` (or full CI locally), fix conflicts in `permissions.const.ts` / seed only if both sides added codes.
