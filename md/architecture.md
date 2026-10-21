# Architecture

Rules: `.cursor/rules/clean-architecture.mdc` (backend), `.cursor/rules/frontend-data.mdc` + `design-system.mdc` (frontend).

## System

```text
Browser → Next.js (FSD + BFF) → NestJS API → PostgreSQL
                              ↘ Redis (cache / throttle)
```

Shared contracts: `@default/types`. Helpers: `@default/utils`.

## Backend

```text
domain/ → application/ → presentation/
              ↑ infrastructure/
```

| Module | Role |
|--------|------|
| Auth | Login, refresh, MFA, OIDC |
| User | CRUD, export/anonymize |
| Authorization | Roles, permissions |
| SiteSetting | Singleton CMS-style settings |
| Media | S3-compatible upload |
| Dashboard | Admin stats |

Drizzle: `backend/src/infrastructure/database/drizzle/`, migrations in `drizzle/migrations/`.

## Frontend

```text
@default/types → @default/api → @default/hooks → features | widgets
```

Layers: `app` → `widgets` → `features` → `entities` → `shared`. Features must not import widgets.

BFF: `frontend/app/api/auth/*`, `frontend/app/api/backend/*`, `frontend/src/shared/lib/bff-*`.

## Admin request flow

```mermaid
sequenceDiagram
  participant Browser
  participant BFF as Next BFF
  participant Nest as Nest API
  Browser->>BFF: /api/backend/...
  BFF->>Nest: JWT from httpOnly cookie
  Nest-->>BFF: JSON
  BFF-->>Browser: JSON
```

Extend after fork: [fork.md](fork.md).
