# Website template — Claude instructions

Full-stack auth/admin starter (pnpm workspace). Overview: `README.md`. Product & fork docs: `md/README.md`.

Single source of truth for coding rules is `.cursor/rules/` — shared with Cursor. Edit rules there, not here.

## Always-on rules

@.cursor/rules/project-core.mdc
@.cursor/rules/clean-code.mdc
@.cursor/rules/reuse-utils.mdc
@.cursor/rules/shared-schemas.mdc

## Scoped rules — read before editing matching files

| Files | Rule |
|-------|------|
| `backend/**` | `.cursor/rules/clean-architecture.mdc` |
| `frontend/**` | `.cursor/rules/frontend-data.mdc` |
| `frontend/**`, `packages/ui/**`, `packages/design-tokens/**` | `.cursor/rules/design-system.mdc` |
| `frontend/e2e/**`, `frontend/playwright.config.ts` | `.cursor/rules/playwright-e2e.mdc` |

## Commands

```bash
pnpm dev:backend | dev:frontend
pnpm lint
pnpm test
pnpm test:e2e:frontend
pnpm --filter @default/design-tokens generate
```

Run lint + tests for the touched package before reporting work as done.
