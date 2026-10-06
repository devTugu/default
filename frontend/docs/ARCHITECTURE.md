# Architecture

Next.js **Feature-Sliced Design (FSD)** + **BFF** auth.

## Layers

```
app/           # App Router (routes, layouts, API routes)
widgets/       # Composed UI (sidebar, marketing sections)
features/      # User interactions (auth, site-settings, MFA)
entities/      # Models + API clients
shared/        # Config, UI kit, i18n, utilities
processes/     # Providers, proxy / middleware
```

**Import rule:** upper layers import lower layers only. Features must not import widgets.

## Request flow

```mermaid
sequenceDiagram
  participant Browser
  participant NextApp as Next.js
  participant BFF as BFF /api/backend
  participant Nest as NestJS API

  Note over Browser,Nest: Public home SSR
  Browser->>NextApp: GET /
  NextApp->>Nest: fetchInternal /site-settings
  Nest-->>NextApp: JSON
  NextApp-->>Browser: HTML

  Note over Browser,Nest: Admin
  Browser->>BFF: PATCH /api/backend/admin/site-settings
  BFF->>Nest: Forward with httpOnly cookie JWT
  Nest-->>BFF: Response
  BFF-->>Browser: JSON
```

## Decisions

1. **FSD** — clear slice boundaries; shared stays primitives.
2. **BFF httpOnly auth** — tokens never in `localStorage`; `/api/auth/*` sets cookies; admin traffic via `/api/backend/*` allowlist.
3. **White label** — env fallbacks + runtime `site_settings`.

## Key paths

| Area | Location |
|------|----------|
| Marketing | `app/(marketing)/` |
| Admin | `app/dashboard/` |
| Auth BFF | `app/api/auth/` |
| Proxy allowlist | `src/shared/config/bff-allowlist.ts` |
| Public fetch | `src/entities/public-api/public-server.ts` |
