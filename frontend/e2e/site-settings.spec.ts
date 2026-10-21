import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';
import { goToSiteSettings } from './helpers/dashboard-nav';

test.describe('Site settings', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('loads site settings form', async ({ page }) => {
    await goToSiteSettings(page);
    await expect(page.getByRole('heading', { name: 'Account & Security' })).toBeVisible({
      timeout: 15_000,
    });
  });
});
