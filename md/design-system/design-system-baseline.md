# Design system remediation — baseline

Recorded before Phase 1 (2026-03-20). Re-measure after each phase on the same machine.

## Build

| Metric | Value | Notes |
|--------|-------|-------|
| `pnpm --filter frontend build` | Re-measure after remediation | Fixed TanStack v9 `flexRender` import; `@default/ui` animated-text export pattern |
| CSS output | Re-measure on green build | — |

## Routes (manual / Lighthouse)

| Route | FCP / nodes / chunks | Notes |
|-------|----------------------|-------|
| `/docs/components/button` | TBD | 33 variants eager-loaded pre-Phase-1 |
| `/docs/components/topbar` | TBD | 6 blocks + navigation menus |

## Post-remediation (2026-03-20)

| Change | Status |
|--------|--------|
| Docs lazy `load()` + `DocsInViewMount` | Done (~70 `*DocsPage.tsx`) |
| Tailwind `@source` split (`globals.css` + `app/docs/docs.css`) | Done |
| Theme: UI `sonner` uses `theme` prop; app uses `motion` not `framer-motion` | Done |
| Composed dedupe script + sync re-export | Done |
| Topbar shared dropdowns + `TopbarLogo` (local SVG) | Done |
| `@default/ui-charts`, `@default/ui-code`, `@default/ui-motion-3d` | Done |
| Headless strategy doc | `md/design-system/headless-ui-strategy.md` |

Docs audit checklist: [docs-audit.md](docs-audit.md). Re-run build + Lighthouse when changing `@source` or preview shells.
