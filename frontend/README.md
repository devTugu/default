# Website Template Frontend

Next.js — FSD, BFF httpOnly auth, MFA, RBAC.

Install from the monorepo root — see [../README.md](../README.md).

## Commands

```bash
cp frontend/.env.example frontend/.env.local
pnpm --filter frontend run dev
```

```env
API_INTERNAL_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_NAME=Website Admin
NEXT_PUBLIC_BRAND_NAME=Website Template
```

## Docs

[docs/](docs/) — Fork Guide, Architecture, Security, Deployment.

## License

MIT
