# Security

Template security notes — not a certification claim.

## Backend auth

| Mechanism | Details |
|-----------|---------|
| JWT access | `JWT_ACCESS_EXPIRES_IN` (default `15m`) |
| Refresh | Rotated; Redis blacklist on logout |
| Throttle / lockout | `LOGIN_THROTTLE_*`, `LOGIN_MAX_FAILED_ATTEMPTS` |
| Password | bcrypt; policy in shared types |

Secrets: `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` (min 32 chars), `MFA_ENCRYPTION_KEY`.

## MFA / OIDC

`MFA_ISSUER`, `MFA_REQUIRED_ROLES`, `OAUTH_*` when `OAUTH_ENABLED=true`.

## Authorization

Permission codes on admin routes (`PermissionsGuard`); Redis cache when enabled.

## BFF (frontend)

- httpOnly cookies for tokens — not `localStorage`
- `/api/backend/*` proxy with JWT from cookie
- CSRF on state-changing BFF routes (`GET /api/auth/csrf`)
- Path allowlist: `frontend/src/shared/config/bff-allowlist.ts`
- Dashboard guard: `frontend/src/processes/proxy.ts`

| Variable | Scope |
|----------|--------|
| `API_INTERNAL_URL` | Server only — required in prod |
| `NEXT_PUBLIC_*` | Display only — no secrets |

Client IP for upstream: `frontend/src/shared/lib/bff-client-meta.ts`.

## Dependencies

CI: `pnpm audit` (`--audit-level=high`, exit 0). Overrides in root `package.json` → `pnpm.overrides`.

## Operator (your infra)

TLS, WAF, backups, SIEM, key rotation, legal/privacy policy — outside this repo.
