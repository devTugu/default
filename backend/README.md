# Website Template API

NestJS REST API — Clean Architecture, JWT + MFA + OIDC, RBAC, Drizzle, MySQL.

Install from the monorepo root — see [../README.md](../README.md).

## Commands

```bash
pnpm --filter backend run migration:run
pnpm --filter backend run seed
pnpm --filter backend run dev
```

| Resource | URL |
|----------|-----|
| API | `http://localhost:3001/api/v1` |
| Health | `/api/v1/health/ready` |
| Swagger | `/api/docs` when `SWAGGER_ENABLED=true` |

**Seed admin:** `admin@example.com` / `Admin123!`

## Docs

[docs/](docs/) — Fork Guide, Architecture, API, Security, Deployment.

## License

MIT
