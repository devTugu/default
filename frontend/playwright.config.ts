import { defineConfig, devices } from '@playwright/test';

const isCi = Boolean(process.env.CI);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 1 : 0,
  workers: isCi ? 1 : undefined,
  timeout: 60_000,
  globalTimeout: isCi ? 45 * 60_000 : undefined,
  reporter: isCi ? [['github'], ['list']] : 'html',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    actionTimeout: 15_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  ...(process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? {}
    : {
        webServer: {
          command: 'bash scripts/e2e-web-server.sh',
          url: 'http://localhost:3000',
          reuseExistingServer: !isCi,
          timeout: 180_000,
          env: {
            API_INTERNAL_URL:
              process.env.API_INTERNAL_URL ?? 'http://localhost:3001/api/v1',
            NODE_ENV: 'production',
            HOSTNAME: '127.0.0.1',
            PORT: '3000',
          },
        },
      }),
});
