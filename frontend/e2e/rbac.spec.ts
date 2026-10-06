import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('RBAC', () => {
  test('dashboard is protected before login', async ({ page }) => {
    await page.goto('/dashboard/users');
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('admin can access users after login', async ({ page }) => {
    await loginAsAdmin(page);
    await page.getByRole('link', { name: 'Users' }).click();
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible({
      timeout: 15_000,
    });
  });
});
