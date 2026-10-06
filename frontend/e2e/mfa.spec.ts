import { test, expect } from '@playwright/test';
import { adminEmail, adminPassword } from './helpers/auth';
import { enrollAdminMfa, generateTotp } from './helpers/mfa';

test.describe('MFA login', () => {
  test('requires TOTP after MFA enrollment', async ({ page }) => {
    const secret = await enrollAdminMfa(page);

    await page.goto('/sign-in');
    await page.getByLabel('Email').fill(adminEmail);
    await page.getByLabel('Password').fill(adminPassword);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(
      page.getByText('Enter the 6-digit code from your authenticator app'),
    ).toBeVisible({ timeout: 10_000 });

    const code = generateTotp(secret);
    await page.getByPlaceholder('000000').fill(code);
    await page.getByRole('button', { name: 'Verify code' }).click();

    await page.waitForURL(/\/dashboard/, { timeout: 15_000 });
  });
});
