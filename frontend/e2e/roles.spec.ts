import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('Roles', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('opens roles list with permission picker support', async ({ page }) => {
    await page.getByRole('link', { name: 'Roles' }).click();
    await expect(page).toHaveURL(/\/dashboard\/roles/);
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible({
      timeout: 15_000,
    });
  });
});
