import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('Audit logs', () => {
  test('admin can view audit logs under site settings', async ({ page }) => {
    await loginAsAdmin(page);
    await page.getByRole('link', { name: 'Site Settings' }).click();
    await page.getByRole('link', { name: 'Audit logs' }).click();
    await expect(page.getByRole('heading', { name: 'Audit logs' })).toBeVisible({
      timeout: 15_000,
    });
  });
});
