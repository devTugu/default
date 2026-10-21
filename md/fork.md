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
| `/dashboard/*` | Admin (users, roles, permissions, site-settings, security) |

Constants: `frontend/src/shared/config/routes.ts`.

## Add a domain (8 steps)

0. **Scaffold (optional):** `pnpm generate:domain -- --name <kebab-case>` → types, api, hooks stub.
1. **Name** — kebab-case folders; permission in `permissions.const.ts`.
2. **Contract** — `packages/types/src/<domain>/` → `@default/types/<domain>`.
3. **Client** — `packages/api`, `packages/hooks` (React Query only in hooks).
4. **Backend domain/application** — entities + use cases.
5. **Backend infra + HTTP** — Drizzle repo, controller, shared Zod DTOs.
6. **Wire** — Nest module, permissions, seed.
7. **UI** — `frontend/src/features/<domain>/`, thin `app/dashboard/.../page.tsx`, sidebar.
8. **Gate** — `pnpm lint && pnpm typecheck && pnpm test && pnpm audit`.

**Copy pattern:** existing module e.g. users or site-settings (same layer layout).

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

**Included:** auth, MFA/OIDC, users/roles/permissions, site-settings, media, dashboard.  
**Not included:** billing, multi-org UI, feature flags, full CMS.

## Production checklist

**Backend:** rotate `JWT_*` / `MFA_ENCRYPTION_KEY`, `CORS_ORIGIN`, `SWAGGER_ENABLED=false`, Redis on, smoke `/health/ready` + login.

**Frontend:** `API_INTERNAL_URL`, `NEXT_PUBLIC_SITE_URL`, no secrets in `NEXT_PUBLIC_*`, smoke `/` + sign-in + dashboard.

Details: [deploy.md](deploy.md), [security.md](security.md).

## Syncing template updates

Tag releases on upstream (`CHANGELOG.md`). Merge platform files (auth, CI, shared packages); keep your `packages/types/src/<product>/` and features. Run full [quality.md](quality.md) after merge.
