# API Reference

Base URL: `/api/v1`

## Envelope

```json
{
  "success": true,
  "data": {},
  "timestamp": "2026-10-06T12:00:00.000Z",
  "path": "/api/v1/site-settings",
  "requestId": "uuid"
}
```

Localized fields use `{ "en": "...", "mn": "..." }` where applicable.

## Public

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health/live` | Liveness |
| GET | `/health/ready` | Readiness |
| GET | `/site-settings` | Hero, header, footer, SEO, theme, about |

## Auth

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/login` | Email/password → tokens |
| POST | `/auth/refresh` | Rotate tokens |
| POST | `/auth/logout` | Revoke refresh |
| GET | `/auth/me` | Current user + permissions |
| * | `/auth/mfa/*`, `/auth/oauth/*` | Optional MFA / OIDC |

## Admin

Require `Authorization: Bearer <accessToken>` and permissions.

| Area | Paths |
|------|-------|
| Users | `/users` (+ `/export`, `/anonymize`) |
| Roles | `/roles` |
| Permissions | `/permissions` |
| Site settings | `/admin/site-settings` |
| Dashboard | `/admin/dashboard` |
| Audit | `/admin/audit-logs` |
| Media | `/admin/media` |

OpenAPI: `/api/docs` when `SWAGGER_ENABLED=true`.
