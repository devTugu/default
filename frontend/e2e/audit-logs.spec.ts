import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';

test.describe('Audit logs', () => {
  test('admin can view audit logs table', async ({ page }) => {
    await loginAsAdmin(page);
    await page.getByRole('link', { name: 'Audit Logs' }).click();
    await expect(page.getByRole('heading', { name: 'Audit Logs' })).toBeVisible({
      timeout: 15_000,
    });
  });
});
