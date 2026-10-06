import type { Page } from '@playwright/test';

const adminEmail = process.env.E2E_ADMIN_EMAIL ?? 'admin@example.com';
const adminPassword = process.env.E2E_ADMIN_PASSWORD ?? 'Admin123!';
const viewerEmail = process.env.E2E_VIEWER_EMAIL ?? 'viewer@example.com';
const viewerPassword = process.env.E2E_VIEWER_PASSWORD ?? 'Viewer123!';

async function fetchCsrf(page: Page): Promise<string> {
  const response = await page.request.get('/api/auth/csrf');
  const json = (await response.json()) as { data: { token: string } };
  return json.data.token;
}

export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto('/sign-in');
  await page.getByLabel('Email').fill(adminEmail);
  await page.getByLabel('Password').fill(adminPassword);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(/\/dashboard/, { timeout: 15_000 });
}

export async function loginAsViewer(page: Page): Promise<void> {
  await page.goto('/sign-in');
  await page.getByLabel('Email').fill(viewerEmail);
  await page.getByLabel('Password').fill(viewerPassword);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(/\/dashboard/, { timeout: 15_000 });
}

export { fetchCsrf, adminEmail, adminPassword, viewerEmail, viewerPassword };
