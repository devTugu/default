import { test, expect } from '@playwright/test';
import { goToUsers, loginAsAdmin, logoutAsAdmin } from './helpers/auth';

test.describe('Auth and dashboard', () => {
  test('login, dashboard, users, logout', async ({ page }) => {
    await loginAsAdmin(page);

    await expect(
      page.getByRole('heading', { name: 'Overview' }).first(),
    ).toBeVisible();

    await goToUsers(page);
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible({
      timeout: 15_000,
    });

    await logoutAsAdmin(page);
  });
});
