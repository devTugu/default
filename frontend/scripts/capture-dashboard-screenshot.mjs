#!/usr/bin/env node
/**
 * Captures docs/gallery/dashboard-overview.png from a running dev server.
 * Usage: npm run dev (in another terminal), then node scripts/capture-dashboard-screenshot.mjs
 */
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'docs/gallery/dashboard-overview.png');
fs.mkdirSync(path.dirname(output), { recursive: true });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const email = process.env.E2E_ADMIN_EMAIL ?? 'admin@example.com';
const password = process.env.E2E_ADMIN_PASSWORD ?? 'Admin123!';

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  locale: 'en-US',
});
await context.addCookies([
  {
    name: 'locale',
    value: 'en',
    url: siteUrl,
  },
]);
const page = await context.newPage();

await page.goto(`${siteUrl}/sign-in`, { waitUntil: 'networkidle' });
await page.getByLabel('Email').fill(email);
await page.getByLabel('Password').fill(password);
await page.getByRole('button', { name: /sign in/i }).click();

try {
  await page.waitForURL(/\/dashboard/, { timeout: 60_000 });
} catch (error) {
  const debugPath = path.join(root, 'docs/gallery/capture-debug.png');
  await page.screenshot({ path: debugPath, fullPage: true });
  console.error(`Login did not reach dashboard. URL: ${page.url()}`);
  console.error(`Debug screenshot: ${debugPath}`);
  throw error;
}
await page.waitForTimeout(1500);
await page.screenshot({ path: output, fullPage: true });

await browser.close();
console.log(`Saved ${output}`);
