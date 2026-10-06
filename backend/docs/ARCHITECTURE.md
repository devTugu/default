# Architecture

NestJS API using **Clean Architecture**.

## Layers

```
src/
├── domain/              # Entities, repository interfaces (no Nest/ORM)
├── application/         # Use cases, ports, DTOs
├── infrastructure/      # Drizzle, Redis, JWT, migrations, seed
├── presentation/http/   # Controllers, guards, filters, DTOs
└── shared/              # Types, helpers
```

**Dependency rule:** `presentation` → `application` → `domain` ← `infrastructure`

## Modules

| Module | Responsibility |
|--------|----------------|
| Auth | Login, refresh, logout, MFA, OIDC |
| User | CRUD, GDPR export/anonymize |
| Authorization | Roles, permissions |
| SiteSetting | Singleton site settings |
| Media | S3-compatible upload |
| Dashboard | Admin stats |
| Audit | Audit log API |

## Persistence

- **ORM:** Drizzle (`infrastructure/database/drizzle/`)
- **Migrations:** `drizzle/migrations/` via `migration:run`
- **Core tables:** users, roles, permissions, refresh_tokens, audit_logs, site_settings, organizations, organization_members

## Context

```
Browser → Next.js BFF → NestJS API → MySQL
                       ↘ Redis (cache / throttle)
```

## Decisions

1. **Clean Architecture** — domain has no Nest/ORM deps; use cases orchestrate ports.
2. **Identity** — JWT + refresh; optional MFA/OIDC; RBAC permission codes; audit interceptor.
3. **White label** — env for deploy-time names; `site_settings` for runtime branding.
4. **Template scope** — auth/admin foundation only; billing / multi-org UI excluded (schema is tenancy-ready).
