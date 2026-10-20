import { defineConfig, devices } from '@playwright/test';

/** Smoke the docs catalog via `next dev` (catalog is off under `next start`). */
export default defineConfig({
  testDir: './e2e',
  testMatch: 'docs.spec.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      NEXT_SERVER_MODE: 'dev',
      API_INTERNAL_URL:
        process.env.API_INTERNAL_URL ?? 'http://localhost:3001/api/v1',
    },
  },
});
