# Security

Auth/admin security for this template. Not a SOC 2 / ISO certification claim.

## Dependency audit (CI)

CI runs `pnpm audit --audit-level=high` (must exit 0). Root `package.json` uses `pnpm.overrides` for patched transitive versions and `pnpm.auditConfig.ignoreGhsas` only where upstream has **no fix** yet:

| Advisory | Package | Mitigation |
|----------|---------|------------|
| GHSA-vfj7-8cjw-p6xm | `braces` (via ESLint `micromatch`) | Dev-only; no patched release — tracked ignore, remove when upstream updates |

Run locally: `pnpm audit` (root script alias for `--audit-level=high`).

## Backend authentication

| Mechanism | Details |
|-----------|---------|
| JWT access | `JWT_ACCESS_EXPIRES_IN` (default `15m`) |
| Refresh | Rotated; Redis blacklist on logout |
| Login throttle | `LOGIN_THROTTLE_TTL` / `LOGIN_THROTTLE_LIMIT` |
| Account lockout | `LOGIN_MAX_FAILED_ATTEMPTS` / `LOGIN_LOCKOUT_MINUTES` |
| Password | bcrypt; min 8 + upper + lower + digit |

Secrets: `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` (min 32 chars).

## MFA / OIDC

| Env | Purpose |
|-----|---------|
| `MFA_ENCRYPTION_KEY` | Encrypt TOTP secrets |
| `MFA_ISSUER` | Authenticator label |
| `MFA_REQUIRED_ROLES` | Roles that must enroll MFA |
| `OAUTH_*` | Optional OIDC (`OAUTH_ENABLED=true`) |

## Authorization

Permission codes on admin routes (`PermissionsGuard`). Cached in Redis when enabled.

## Audit & GDPR

- Mutating admin actions → `audit_logs`
- Retention: `AUDIT_PURGE_ENABLED`, `AUDIT_RETENTION_DAYS`
- `GET /users/:id/export` (`USER_READ`) — profile, roles, OAuth metadata, MFA flag, audit events
- `POST /users/:id/anonymize` (`USER_DELETE`) — clear PII/secrets/tokens; soft-delete
- Admin-gated only (no end-user DSR portal)

## Frontend session (BFF)

1. `/sign-in` → `POST /api/auth/login` → Nest login
2. BFF sets httpOnly cookies (access + refresh + session hint)
3. Admin API via `/api/backend/*` — BFF attaches JWT from cookie
4. `POST /api/auth/refresh` rotates tokens; MFA inline on sign-in

Tokens are **never** in `localStorage`.

**Allowlist & CSRF**

- Proxy paths: `frontend/src/shared/config/bff-allowlist.ts` (unknown paths → 403)
- State-changing BFF calls need `X-CSRF-Token` from `GET /api/auth/csrf`

**Session guard:** `frontend/src/processes/proxy.ts` guards `/dashboard/*` (redirect to `/sign-in` when unauthenticated).

| Variable | Scope | Purpose |
|----------|-------|---------|
| `API_INTERNAL_URL` | Server | Nest base — required in production |
| `NEXT_PUBLIC_*` | Client | Display names only — no secrets |

Optional OIDC: `/api/auth/oauth/*`, `/oauth/callback`.

## Compliance scaffold

In-app: RBAC, JWT/MFA/OIDC, BFF cookies, lockout, audit, GDPR stubs, throttle, validation, health, optional Sentry/OTEL.

Operator (your infra): TLS termination, WAF, pen-test, SIEM, residency, backup encryption, legal hold.
