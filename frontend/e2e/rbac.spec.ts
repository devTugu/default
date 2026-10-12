import { test, expect } from '@playwright/test';
import { goToUsers, loginAsAdmin } from './helpers/auth';

test.describe('RBAC', () => {
  test('dashboard is protected before login', async ({ page }) => {
    await page.goto('/dashboard/users');
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('admin can access users after login', async ({ page }) => {
    await loginAsAdmin(page);
    await goToUsers(page);
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible({
      timeout: 15_000,
    });
  });
});
