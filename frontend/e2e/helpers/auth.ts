import { expect, type Page } from '@playwright/test';

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
  await expect(form.getByLabel('Email')).toBeVisible();
  await form.getByLabel('Email').fill(email);
  await form.getByLabel('Password').fill(password);

  const loginResponse = page.waitForResponse(
    (res) =>
      res.url().includes('/api/auth/login') &&
      res.request().method() === 'POST',
  );
  await form.getByRole('button', { name: /^(Sign in|Нэвтрэх)$/, exact: true }).click();
  const loginRes = await loginResponse;
  expect(loginRes.ok(), `login HTTP ${loginRes.status()}`).toBeTruthy();

  const mfaStep = page.getByText(/Enter the 6-digit code/i);
  if (await mfaStep.isVisible({ timeout: 3_000 }).catch(() => false)) {
    throw new Error(
      'Account requires MFA — ensure mfa.spec teardown ran (disableAdminMfa).',
    );
  }

  await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
}

export async function loginAsAdmin(page: Page): Promise<void> {
  await submitSignIn(page, adminEmail, adminPassword);
}

export async function loginAsViewer(page: Page): Promise<void> {
  await submitSignIn(page, viewerEmail, viewerPassword);
}

export { goToRoles, goToSiteSettings, goToUsers } from './dashboard-nav';

export async function logoutAsAdmin(page: Page): Promise<void> {
  const footer = page.locator('[data-sidebar="footer"]');
  await footer.locator('[data-slot="dropdown-menu-trigger"]').click();
  await page.getByRole('menuitem', { name: /sign out/i }).click();
  await expect(page).toHaveURL('/', { timeout: 10_000 });
}

export { fetchCsrf, adminEmail, adminPassword, viewerEmail, viewerPassword };
