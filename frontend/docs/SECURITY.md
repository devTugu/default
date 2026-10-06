# Security

BFF proxy, httpOnly cookies, CSRF.

## Auth flow

1. `/sign-in` → `POST /api/auth/login` → Nest login
2. BFF sets httpOnly cookies (access + refresh + session hint)
3. Admin API via `/api/backend/*` — BFF attaches JWT from cookie
4. `POST /api/auth/refresh` rotates tokens; MFA inline on sign-in

Tokens are **never** in `localStorage`.

## Allowlist & CSRF

- Proxy paths: `src/shared/config/bff-allowlist.ts` (unknown paths → 403)
- State-changing BFF calls need `X-CSRF-Token` from `GET /api/auth/csrf`

## Session

`src/processes/proxy.ts` guards `/dashboard/*` (redirect to `/sign-in` when unauthenticated).

## Environment

| Variable | Scope | Purpose |
|----------|-------|---------|
| `API_INTERNAL_URL` | Server | Nest base (`…/api/v1`) — required in production |
| `NEXT_PUBLIC_*` | Client | Display names only — no secrets |

Optional OIDC: `/api/auth/oauth/*`, `/oauth/callback`.

Backend controls: [backend Security](../../backend/docs/SECURITY.md).
