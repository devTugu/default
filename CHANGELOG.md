# Changelog

## [1.1.0] — 2026-03-24

### Added

- Golden template tooling: `pnpm generate:domain` (Drizzle + repository + admin route), `pnpm fork:check`, `pnpm fork:rename-scope`
- Consolidated docs under `md/` (fork, deploy, quality)
- CI: required `pnpm audit --audit-level=high`
- Root `pnpm quality` script aligned with local pre-merge gates

### Changed

- Homepage hero i18n; BFF client IP; Vitest 5; eslint-plugin-boundaries v7

### Fixed

- Backend typecheck without pre-built `@default/utils` dist
- Jest workspace package resolution

## [1.0.0] — baseline

Auth/RBAC/admin/marketing platform skeleton — see [md/fork.md](md/fork.md).
