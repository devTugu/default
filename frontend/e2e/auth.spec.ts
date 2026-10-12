import { test, expect } from '@playwright/test';
import { loginAsAdmin, logoutAsAdmin } from './helpers/auth';

test.describe('Auth', () => {
  test('login and logout', async ({ page }) => {
    await loginAsAdmin(page);
    await expect(
      page.getByRole('heading', { name: 'Overview' }).first(),
    ).toBeVisible();

    await logoutAsAdmin(page);
  });
});
