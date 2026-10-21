import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';
import { goToRoles } from './helpers/dashboard-nav';

test.describe('Roles', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('opens roles list with permission picker support', async ({ page }) => {
    await goToRoles(page);
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible({
      timeout: 15_000,
    });
  });
});
