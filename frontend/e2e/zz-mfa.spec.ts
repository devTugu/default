import { test, expect } from '@playwright/test';
import { adminEmail, adminPassword } from './helpers/auth';
import { disableAdminMfa, enrollAdminMfa, generateTotp } from './helpers/mfa';

test.describe('MFA login', () => {
  test('requires TOTP after MFA enrollment', async ({ page }) => {
    let secret = '';
    try {
      secret = await enrollAdminMfa(page);
      await page.goto('/sign-in');
      const form = page.locator('form').first();
      await form.getByLabel('Email').fill(adminEmail);
      await form.getByLabel('Password').fill(adminPassword);
      await form.getByRole('button', { name: 'Sign in', exact: true }).click();

      await expect(
        page.getByText('Enter the 6-digit code from your authenticator app'),
      ).toBeVisible({ timeout: 10_000 });

      const code = generateTotp(secret);
      await page.getByPlaceholder('000000').fill(code);
      await page.getByRole('button', { name: 'Verify code' }).click();

      await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
    } finally {
      if (secret) {
        await disableAdminMfa(page, secret);
      }
    }
  });
});
