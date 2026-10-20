# Quality gates (regulated / enterprise)

Monorepo commands must finish with **0 errors, 0 warnings** before merge or release.

## Required local / CI pipeline

```bash
pnpm typecheck   # all workspace packages
pnpm lint        # ESLint (frontend/backend) + tsc lint scripts in packages
pnpm test        # backend Jest + frontend Vitest + @default/utils
pnpm build       # backend + frontend + @default/ui stamp
```

Optional but recommended before docs changes:

```bash
PLAYWRIGHT_SKIP_WEBSERVER=1 pnpm --filter frontend test:e2e e2e/docs.spec.ts
```

## Layer policy

| Layer | Strict TypeScript | Notes |
|-------|-------------------|--------|
| `backend/`, `frontend/` (app), `packages/types`, `packages/api`, `packages/hooks`, `packages/utils` | Yes | Production code |
| `@default/ui` `primitives/`, `lib/`, `hooks/` | Yes | Design system core |
| `@default/ui` `composed/`, `default-space/` | `@ts-nocheck` | Registry-synced demo catalog; not app business logic |
| `/docs` catalog | Lazy previews, noindex, honest UI | See [docs-audit.md](docs-audit.md) |

## Turbo

- `lint` / `typecheck` do **not** depend on `^build` (avoids false cycles; faster PR feedback).
- `@default/ui#build` depends on token/chart/motion packages only — not `@default/ui-code` (breaks ui ↔ ui-code cycle).

## Security / compliance (fork deploy)

- Production CSP and security headers: `frontend/next.config.ts`
- Docs public by default — restrict `/docs` in prod (VPN/SSO/middleware) if catalog is internal-only
- Third-party assets in block demos — self-host or tighten `img-src` for regulated environments

## Regression

After touching shared UI or data tables, re-run the full block above. Do not raise ESLint limits to silence violations — split units per `.cursor/rules/clean-code.mdc`.
