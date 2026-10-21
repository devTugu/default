import type { Page } from '@playwright/test';

const adminEmail = process.env.E2E_ADMIN_EMAIL ?? 'admin@default.mn';
const adminPassword = process.env.E2E_ADMIN_PASSWORD ?? 'admin123!';
const viewerEmail = process.env.E2E_VIEWER_EMAIL ?? 'viewer@default.mn';
const viewerPassword = process.env.E2E_VIEWER_PASSWORD ?? 'viewer123!';

async function fetchCsrf(page: Page): Promise<string> {
  const response = await page.request.get('/api/auth/csrf');
  const json = (await response.json()) as { data: { token: string } };
  return json.data.token;
}

async function submitSignIn(page: Page, email: string, password: string): Promise<void> {
  await page.goto('/sign-in');
  const form = page.locator('form').first();
  await form.getByLabel('Email').fill(email);
  await form.getByLabel('Password').fill(password);
  await form.getByRole('button', { name: /^(Sign in|Нэвтрэх)$/, exact: true }).click();
  await page.waitForURL(/\/dashboard/, { timeout: 30_000 });
}

export async function loginAsAdmin(page: Page): Promise<void> {
  await submitSignIn(page, adminEmail, adminPassword);
}

export async function loginAsViewer(page: Page): Promise<void> {
  await submitSignIn(page, viewerEmail, viewerPassword);
}

/** Users lives under the Access control collapsible in the sidebar. */
export async function goToUsers(page: Page): Promise<void> {
  const sidebar = page.locator('[data-sidebar="sidebar"]');
  const usersLink = sidebar.getByRole('link', { name: 'Users', exact: true });
  if (!(await usersLink.isVisible())) {
    await sidebar
      .getByRole('button', { name: /access control/i })
      .click();
  }
  await usersLink.click();
  await page.waitForURL(/\/dashboard\/users/, { timeout: 15_000 });
}

export async function logoutAsAdmin(page: Page): Promise<void> {
  await page.getByRole('button', { name: adminEmail }).click();
  await page.getByRole('menuitem', { name: /sign out/i }).click();
  await page.waitForURL(
    (url) => new URL(url).pathname === '/',
    { timeout: 10_000 },
  );
}

export { fetchCsrf, adminEmail, adminPassword, viewerEmail, viewerPassword };
