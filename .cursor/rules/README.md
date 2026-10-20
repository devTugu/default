# Cursor rules

Single source of truth for agents and humans. Wired in [`CLAUDE.md`](../../CLAUDE.md) (always-on vs scoped).

## Always apply

| Rule | Focus |
|------|--------|
| [project-core.mdc](project-core.mdc) | Monorepo layout, data flow, naming |
| [clean-code.mdc](clean-code.mdc) | Size limits, style, naming |
| [reuse-utils.mdc](reuse-utils.mdc) | Search `@default/*` before new helpers |
| [shared-schemas.mdc](shared-schemas.mdc) | One Zod schema per domain in `@default/types` |

## Scoped (read before editing matching paths)

| Rule | Globs / paths |
|------|----------------|
| [clean-architecture.mdc](clean-architecture.mdc) | `backend/**` |
| [frontend-data.mdc](frontend-data.mdc) | `frontend/**` |
| [design-system.mdc](design-system.mdc) | `frontend/**`, `packages/ui/**`, `packages/design-tokens/**` |
| [playwright-e2e.mdc](playwright-e2e.mdc) | `frontend/e2e/**`, `frontend/playwright.config.ts` |

Intentionally **not** included (unlike larger product repos): URL-state-only rules, SEO, MR review, mobile, Redis/Bull — add here only when this template grows those surfaces.
