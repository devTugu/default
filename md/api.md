# API

Base: `/api/v1`

## Envelope

```json
{ "success": true, "data": {}, "timestamp": "...", "path": "...", "requestId": "..." }
```

Localized fields: `{ "en": "...", "mn": "..." }`.

## Public

| Method | Path |
|--------|------|
| GET | `/health/live`, `/health/ready` |
| GET | `/site-settings` |

## Auth

| Method | Path |
|--------|------|
| POST | `/auth/login`, `/auth/refresh`, `/auth/logout` |
| GET | `/auth/me` |
| * | `/auth/mfa/*`, `/auth/oauth/*` |

## Admin (Bearer + permissions)

| Area | Paths |
|------|-------|
| Users | `/users` (+ export/anonymize) |
| Roles / permissions | `/roles`, `/permissions` |
| Site settings | `/admin/site-settings` |
| Dashboard | `/admin/dashboard` |
| Media | `/admin/media` |
| Audit logs | `/admin/audit-logs` |

OpenAPI: `/api/docs` when `SWAGGER_ENABLED=true`.
