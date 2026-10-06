# Fork Guide

Customize the frontend after fork. Root quick start: [../../README.md](../../README.md). Backend: [backend Fork Guide](../../backend/docs/FORK-GUIDE.md).

## Branding

```env
NEXT_PUBLIC_APP_NAME=Your Admin
NEXT_PUBLIC_BRAND_NAME=Your Product
NEXT_PUBLIC_SITE_URL=https://www.example.com
API_INTERNAL_URL=http://localhost:3001/api/v1
```

Runtime logos/hero/SEO: Admin → **Site settings**. Resolution: site-settings name → `NEXT_PUBLIC_BRAND_NAME` → fallback (`src/shared/config/brand.ts`).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home — hero + about from site-settings |
| `/sign-in` | Login (BFF cookies) |
| `/dashboard` | Overview |
| `/dashboard/users` | Users |
| `/dashboard/roles` | Roles |
| `/dashboard/permissions` | Permissions |
| `/dashboard/site-settings` | Branding / hero / SEO |
| `/dashboard/audit-logs` | Audit |
| `/dashboard/security` | MFA |

Constants: `src/shared/config/routes.ts`. Sidebar: `src/widgets/app-sidebar/`.

## Extend

| Goal | Where |
|------|--------|
| New public page | `app/(marketing)/` + `widgets/marketing` |
| New admin feature | `src/features/*` + `app/dashboard/...` |
| New BFF API path | Add to `src/shared/config/bff-allowlist.ts` |
| Permissions UI | Gate with `useAuthPermissions` / `PermissionGate` |

## Production checklist

- [ ] `API_INTERNAL_URL` points at production API
- [ ] `NEXT_PUBLIC_SITE_URL` set
- [ ] No secrets in `NEXT_PUBLIC_*`
- [ ] Smoke: `/`, sign-in, dashboard, site-settings save

## Related

- [Architecture](ARCHITECTURE.md)
- [Security](SECURITY.md)
- [Deployment](DEPLOYMENT.md)
