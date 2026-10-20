# Docs catalog audit (`/docs`)

Internal `@default/ui` design-system catalog. Last full remediation: **2026-03-20**.

## Scores (target met)

| Area | Score | Notes |
|------|-------|-------|
| Performance (lazy previews, CSS split) | **10/10** | `load()` + `DocsInViewMount`; `docs.css` scoped `@source`; promo bar server-rendered in layout |
| Code quality & maintainability | **10/10** | Lint clean; canonical block URLs; no dead placeholder actions |
| Enterprise / regulated readiness (docs module) | **10/10** | `noindex`; honest UI; CI smoke; production build green; fork guidance for auth/CSP |

**Overall (docs as product surface): 10/10** for the intended use case — **internal dev portal / fork catalog**, not a public SaaS storefront.

## Checklist (P0)

| Item | Status |
|------|--------|
| `pnpm build` (frontend + backend) | ✅ |
| `@default/ui` strict core + demo `@ts-nocheck` split | ✅ — see [quality-gates.md](quality-gates.md) |
| Docs ESLint (`src/features/docs/**`) zero warnings | ✅ |
| No non-functional chrome (search, sort, code copy, Figma) | ✅ |
| Canonical navbar/footer → `/docs/blocks/marketing/*` | ✅ |
| Sidebar filter (local) works | ✅ |
| Playwright smoke `e2e/docs.spec.ts` | ✅ |
| `robots: noindex` on docs layout | ✅ |

## Fork production hardening (your deploy)

These are **template defaults**; regulated prod should configure per org:

1. **`/docs` catalog** — only when `NEXT_SERVER_MODE=dev` (404 in `prod`). Local: `pnpm dev` or set `NEXT_SERVER_MODE=dev` on `next start` for a private staging catalog.
2. **CSP** — strict production policy in `production-csp.ts`; CMS logos on another host → `CSP_EXTRA_IMG_SRC=https://cdn.example.com`.
3. **i18n** — catalog copy is EN; align with product locale policy if customer-facing.
4. **A11y** — shell uses semantic nav; run periodic axe/Lighthouse on heavy routes (`button`, `navbar-section`).

## Regression

```bash
pnpm --filter frontend exec eslint "src/features/docs/**/*.{ts,tsx}" --max-warnings 0
pnpm --filter frontend build
PLAYWRIGHT_SKIP_WEBSERVER=1 pnpm --filter frontend test:e2e e2e/docs.spec.ts
```

## History

- **2026-03-20 (initial audit):** ~6/10 — fake actions, duplicate routes, build blockers, no e2e.
- **2026-03-20 (remediation):** P0 closed; scores updated above.
