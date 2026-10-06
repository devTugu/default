import { test, expect } from '@playwright/test';
import { loginAsViewer } from './helpers/auth';

test.describe('Permissions', () => {
  test('viewer without DASHBOARD_READ sees access denied on overview', async ({
    page,
  }) => {
    await loginAsViewer(page);
    await expect(page.getByText('Access denied')).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText('DASHBOARD_READ')).toBeVisible();
  });

  test('viewer without AUDIT_READ cannot view audit logs page', async ({
    page,
  }) => {
    await loginAsViewer(page);
    await page.goto('/dashboard/audit-logs');
    await expect(page.getByText('Access denied')).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText('AUDIT_READ')).toBeVisible();
  });
});
