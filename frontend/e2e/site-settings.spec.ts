import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('Site settings', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('loads site settings form', async ({ page }) => {
    await page.getByRole('link', { name: 'Site Settings' }).click();
    await expect(page).toHaveURL(/\/dashboard\/site-settings/);
    await expect(page.getByRole('tab', { name: 'Hero' })).toBeVisible({
      timeout: 15_000,
    });
  });
});
