# Quality gates

Run before merge or release.

**CI parity (recommended before push):**

```bash
pnpm verify
```

Runs: `generate:tokens` · lightningcss check · lint · typecheck · build · test · backend `test:cov` · audit.

**Manual (same steps as CI `quality` job):**

```bash
pnpm generate:tokens   # if tokens changed
pnpm lint
pnpm typecheck
pnpm build
pnpm test
pnpm --filter backend test:cov
pnpm audit
```

**E2E (CI `backend-e2e` + `frontend-e2e` jobs):**

```bash
pnpm test:e2e:backend
pnpm test:e2e:frontend   # needs DB + build; Playwright uses `scripts/e2e-web-server.sh` (standalone, not `next start`)
```

Production `node dist/main` resolves `@default/utils` / `@default/types` via **`require` → `dist/`** — `backend` `prebuild` compiles those before `nest build`.

Backend Jest (unit + e2e): `@default/utils/*` and `@default/types/*` need matching `moduleNameMapper` in `backend/package.json` and `backend/test/jest-e2e.json`.

Turbo may print **circular dependency** (`@default/ui` ↔ `@default/ui-code`) — informational; exit code stays 0.

UI `/docs` catalog: dev-only (`NEXT_SERVER_MODE=prod` hides in prod). Composed blocks in `@default/ui` may use `@ts-nocheck` — not app business logic.

Rules: `.cursor/rules/` · ESLint clean-code limits — split units instead of disabling rules.
