import { test, expect } from '@playwright/test';
import { goToUsers, loginAsAdmin, viewerEmail } from './helpers/auth';

test.describe('GDPR', () => {
  test('admin can export user data as JSON', async ({ page }) => {
    await loginAsAdmin(page);
    await goToUsers(page);
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible({
      timeout: 15_000,
    });

    const viewerRow = page.getByRole('row').filter({ hasText: viewerEmail });
    await viewerRow.getByRole('button', { name: `Edit ${viewerEmail}` }).click();
    await expect(page.getByText('Privacy & GDPR')).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Export data' }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/user-\d+-export\.json$/);

    const path = await download.path();
    expect(path).toBeTruthy();
    if (!path) return;

    const fs = await import('node:fs/promises');
    const content = await fs.readFile(path, 'utf8');
    const payload = JSON.parse(content) as {
      exportedAt?: string;
      user?: { email?: string; id?: number };
      auditEvents?: unknown[];
    };
    expect(payload.exportedAt).toBeTruthy();
    expect(Array.isArray(payload.auditEvents)).toBe(true);
    expect(payload.user?.email).toBe(viewerEmail);
  });

  test('admin can anonymize a disposable user PII', async ({ page }) => {
    const disposableEmail = `gdpr-${Date.now()}@example.com`;
    const disposablePassword = 'GdprTest123!';

    await loginAsAdmin(page);
    await goToUsers(page);
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible({
      timeout: 15_000,
    });

    await page.getByRole('button', { name: 'Add user' }).click();
    await page.getByLabel('Email').fill(disposableEmail);
    await page.getByLabel('Password').fill(disposablePassword);
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByText('User created')).toBeVisible({ timeout: 10_000 });

    const userRow = page.getByRole('row').filter({ hasText: disposableEmail });
    await userRow.getByRole('button', { name: `Edit ${disposableEmail}` }).click();
    await page.getByRole('button', { name: 'Anonymize PII' }).click();
    await page.getByLabel('Type the user email to confirm').fill(disposableEmail);
    await page.getByRole('button', { name: 'Anonymize PII' }).last().click();

    await expect(page.getByText('User PII anonymized')).toBeVisible({
      timeout: 10_000,
    });
    await expect(
      page.getByRole('row').filter({ hasText: disposableEmail }),
    ).toHaveCount(0, { timeout: 15_000 });
  });
});
