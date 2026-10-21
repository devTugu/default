# Fork guide

Fork this monorepo and grow it into your product. Quick start: [../README.md](../README.md).

## Branding

**Env (deploy-time)**

| Variable | Purpose |
|----------|---------|
| `APP_DISPLAY_NAME` | API / Swagger display name |
| `MFA_ISSUER` | Authenticator app label |
| `NEXT_PUBLIC_APP_NAME` | Admin chrome title |
| `NEXT_PUBLIC_BRAND_NAME` | Fallback brand name |
| `NEXT_PUBLIC_SITE_URL` | Canonical / OG URL |
| `API_INTERNAL_URL` | Server-only Nest base (`…/api/v1`) — required in production |
| `NEXT_SERVER_MODE` | `dev` \| `prod` — docs catalog and debug surfaces (`frontend/src/shared/config/server-mode.ts`) |

**Runtime:** Admin → **Site settings** — logos, hero, about, theme color, SEO, footer (`site_settings`). No redeploy needed.

Frontend resolution: site-settings name → `NEXT_PUBLIC_BRAND_NAME` → fallback (`frontend/src/shared/config/brand.ts`).

## Routes (frontend)

| Path | Purpose |
|------|---------|
| `/` | Home — hero + about from site-settings |
| `/sign-in` | Login (BFF cookies) |
| `/dashboard` | Overview |
| `/dashboard/users` | Users |
| `/dashboard/roles` | Roles |
| `/dashboard/permissions` | Permissions |
| `/dashboard/site-settings` | Branding / hero / SEO |
| `/dashboard/site-settings?tab=audit` | Audit (legacy `/dashboard/audit-logs` redirects) |
| `/dashboard/security` | MFA |

Constants: `frontend/src/shared/config/routes.ts`. Sidebar: `frontend/src/widgets/app-sidebar/`.

## Extend

| Goal | Where |
|------|--------|
| Shared API contract | `packages/types/src/<domain>/` → `@default/types/<domain>` |
| New API domain | `domain` → `application` → `infrastructure` → `presentation` |
| New admin page | `frontend/src/features/*` + `app/dashboard/...` |
| New public page | `app/(marketing)/` + widgets |
| New domain (full stack) | `@default/types` → `@default/api` → `@default/hooks` → features UI |
| New BFF API path | `frontend/src/shared/config/bff-allowlist.ts` |
| Permissions | `permissions.const.ts` + `@Permissions()` on controllers; UI: `PermissionGate` |
| Design tokens | `packages/design-tokens/tokens.json` → `pnpm generate:tokens` |
| UI primitive | `packages/ui/src/primitives/` (`@default/ui`) |

Keep Clean Architecture / FSD import rules. Agent rules: `.cursor/rules/`. Client data: `@default/types` → `@default/api` → `@default/hooks` → UI — no raw `fetch` to Nest from features.

## Scope

**Included:** auth (JWT, MFA, OIDC), users/roles/permissions, site-settings, media, dashboard, audit, tenancy-ready schema (default org).

**Not included:** billing, multi-org UI, feature flags, CMS content modules. Add after fork when needed.

## Production checklist

**Backend**

- [ ] Rotate `JWT_*` and `MFA_ENCRYPTION_KEY`
- [ ] Set `CORS_ORIGIN` and matching frontend URL
- [ ] `SWAGGER_ENABLED=false`
- [ ] Redis on for shared throttle/cache
- [ ] Smoke: `/health/ready`, admin login, site-settings save

**Frontend**

- [ ] `API_INTERNAL_URL` points at production API
- [ ] `NEXT_PUBLIC_SITE_URL` set
- [ ] No secrets in `NEXT_PUBLIC_*`
- [ ] Smoke: `/`, sign-in, dashboard, site-settings save

## Related

- [Architecture](architecture.md)
- [Deployment](deployment.md)
- [Security](security.md)
