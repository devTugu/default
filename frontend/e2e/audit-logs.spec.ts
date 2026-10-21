import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';
import { goToSiteSettings } from './helpers/dashboard-nav';

test.describe('Audit logs', () => {
  test('admin can view audit logs under site settings', async ({ page }) => {
    await loginAsAdmin(page);
    await goToSiteSettings(page);
    await page.getByRole('link', { name: 'Audit logs' }).click();
    await expect(page).toHaveURL(/tab=audit/);
    await expect(page.getByRole('heading', { name: 'Audit logs' })).toBeVisible({
      timeout: 15_000,
    });
  });
});
