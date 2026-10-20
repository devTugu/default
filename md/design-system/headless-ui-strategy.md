# Headless UI dual stack — strategy (Phase 6)

## Current state

| Layer | Libraries | Example primitives |
|-------|-----------|-------------------|
| Radix (`radix-ui` meta) | Dialog, dropdown, sheet, accordion, tooltip (partial) | `dialog.tsx`, `dropdown-menu.tsx`, `sidebar.tsx` |
| Base UI (`@base-ui/react`) | Select, combobox, navigation menu, tabs | `navigation-menu.tsx`, `select.tsx`, `multi-select.tsx` |

Both ship similar accessibility patterns. Maintaining two mental models increases upgrade cost and bundle overlap.

## Decision (deferred)

Pick **one** primary stack for new primitives:

1. **Base UI** — aligns with shadcn v4 / `@shadcn/react` direction; already used for newer form controls.
2. **Radix** — mature ecosystem, current sidebar and overlay stack.

Until decided: **freeze migrations**; bugfixes only on existing primitives.

## Migration epic (when approved)

1. Inventory all primitives with `@radix-ui/*` vs `@base-ui/react` imports.
2. Choose pilot (e.g. `popover` or `tooltip`) and swap one primitive with visual regression on docs routes.
3. Batch migrate overlay family, then form controls.
4. Remove unused package from `@default/ui` dependencies.
5. Update `.cursor/rules/design-system.mdc` with single-stack guidance.

## Non-goals

- Mixing Radix Trigger with Base UI Content in one component.
- New third headless library without ADR.
