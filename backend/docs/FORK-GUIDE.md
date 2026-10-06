# Fork Guide

Fork this monorepo and grow it into your product. Root quick start: [../../README.md](../../README.md).

## Branding

**Env (deploy-time)**

| Variable | Purpose |
|----------|---------|
| `APP_DISPLAY_NAME` | API / Swagger display name |
| `MFA_ISSUER` | Authenticator app label |
| `NEXT_PUBLIC_APP_NAME` | Admin chrome title |
| `NEXT_PUBLIC_BRAND_NAME` | Fallback brand name |
| `NEXT_PUBLIC_SITE_URL` | Canonical / OG URL |

**Runtime:** Admin → **Site settings** — logos, hero, about, theme color, SEO, footer (`site_settings` table). No redeploy needed.

## Extend

| Goal | Where |
|------|--------|
| New API domain | `domain` → `application` → `infrastructure` → `presentation` |
| New admin page | `frontend/src/features` + `app/dashboard/...` |
| New public page | `app/(marketing)/` + widgets |
| Permissions | `permissions.const.ts` + `@Permissions()` on controllers |

Keep Clean Architecture / FSD import rules.

## Scope

**Included:** auth (JWT, MFA, OIDC), users/roles/permissions, site-settings, media, dashboard, audit, tenancy-ready schema (default org).

**Not included:** billing, multi-org UI, feature flags, CMS content modules. Add after fork when needed.

## Production checklist

- [ ] Rotate `JWT_*` and `MFA_ENCRYPTION_KEY`
- [ ] Set `CORS_ORIGIN` and `NEXT_PUBLIC_SITE_URL`
- [ ] `SWAGGER_ENABLED=false`
- [ ] Redis on for shared throttle/cache
- [ ] Smoke: `/health/ready`, `/`, admin login, site-settings save

## Related

- [Architecture](ARCHITECTURE.md)
- [Deployment](DEPLOYMENT.md)
- [Security](SECURITY.md)
