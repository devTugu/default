# Product — Website template (`@default/*`)

**Default** in this repo means a **brand-agnostic full-stack starter**: public marketing home + admin dashboard + auth/RBAC — not a specific customer site. Fork it, rename env vars and site-settings, then add your domain (jobs, billing, CMS, etc.) on the same layers.

## Who it is for

- Solo devs or small teams who want production-shaped auth, permissions, audit, and white-label site settings without building infra from scratch.
- Teams that prefer **pnpm + Turbo**, **NestJS (Clean Architecture) + Drizzle + PostgreSQL**, and **Next.js (FSD) + BFF httpOnly cookies**.

## What is included

| Area | Included |
|------|----------|
| Auth | JWT access + refresh rotation, login throttle, lockout, optional MFA / OIDC |
| Admin | Users, roles, permissions, site-settings, media upload, dashboard stats, audit logs |
| Public | `/` hero + about driven by `site_settings` |
| Packages | `@default/types`, `@default/api`, `@default/hooks`, `@default/ui`, `@default/design-tokens`, `@default/utils` |
| Ops scaffold | Docker, Helm chart, health probes, optional Sentry/OTEL hooks |

## What is not included

- Billing, subscriptions, or payment gateways
- Multi-organization admin UI (schema is tenancy-ready; UI is single-org)
- Feature flags, full CMS modules, mobile app
- End-user GDPR self-service portal (admin export/anonymize APIs only)

## Surfaces

| Surface | Path | Role |
|---------|------|------|
| API | `backend/` | `/api/v1/*` NestJS |
| Web | `frontend/` | Marketing + `/dashboard/*` + BFF `/api/auth/*`, `/api/backend/*` |
| UI docs | `frontend/app/docs/` | Interactive `@default/ui` catalog (dev/demo) |

## After fork

1. Read [fork-guide.md](fork-guide.md) — env branding + Admin site-settings.
2. Read [architecture.md](architecture.md) — where to add modules and pages.
3. Keep client data flow: `@default/types` → `@default/api` → `@default/hooks` → UI (see `.cursor/rules/project-core.mdc`).
