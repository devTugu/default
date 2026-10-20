# UI package split — follow-ups

## Shipped

| Package | Exports |
|---------|---------|
| `@default/ui-charts` | `./chart` |
| `@default/ui-code` | `./code-block` |
| `@default/ui-motion-3d` | `./pixel-snow` |

`@default/ui/primitives/chart` and `code-block` re-export from these packages.

## Backlog (clean-code file size)

| Primitive | Lines | Suggested split |
|-----------|-------|-----------------|
| `sidebar.tsx` | ~750 | `sidebar-context.tsx`, `sidebar-layout.tsx` (constants → `sidebar-constants.ts` done) |
| `autocomplete.tsx` | ~700 | `autocomplete-list.tsx`, `autocomplete-input.tsx` |
| `multi-select.tsx` | ~600 | `multi-select-trigger.tsx`, `multi-select-content.tsx` |

Split without behavior changes; run `@default/ui typecheck` after each.
