# Quality gates

Run before merge or release (matches CI `quality` job):

```bash
pnpm generate:tokens   # if tokens changed
pnpm lint
pnpm typecheck
pnpm build
pnpm test
pnpm --filter backend test:cov
pnpm audit
```

Backend Jest: workspace packages need `moduleNameMapper` in `backend/package.json` for `@default/utils/*` and `@default/types/*`.

UI `/docs` catalog: dev-only (`NEXT_SERVER_MODE=prod` hides in prod). Composed blocks in `@default/ui` may use `@ts-nocheck` — not app business logic.

Rules: `.cursor/rules/` · ESLint clean-code limits — split units instead of disabling rules.
