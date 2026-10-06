import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('Auth', () => {
  test('login and logout', async ({ page }) => {
    await loginAsAdmin(page);
    await expect(page.getByRole('heading', { name: 'Overview' }).first()).toBeVisible();

    await page.getByRole('button', { name: process.env.E2E_ADMIN_EMAIL ?? 'admin@example.com' }).click();
    await page.getByText('Log out').click();
    await expect(page).toHaveURL(/\/sign-in/, { timeout: 10_000 });
  });
});
