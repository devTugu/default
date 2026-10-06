# Security

Auth/admin security for this template. Not a SOC 2 / ISO certification claim.

## Authentication

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

## Compliance scaffold

In-app: RBAC, JWT/MFA/OIDC, BFF cookies, lockout, audit, GDPR stubs, throttle, validation, health, optional Sentry/OTEL.

Operator (your infra): TLS termination, WAF, pen-test, SIEM, residency, backup encryption, legal hold.

## Frontend session

Browser uses httpOnly cookies via Next.js BFF — see [frontend Security](../../frontend/docs/SECURITY.md).
