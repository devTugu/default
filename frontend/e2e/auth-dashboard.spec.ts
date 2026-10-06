import { test, expect } from '@playwright/test';

const adminEmail = process.env.E2E_ADMIN_EMAIL ?? 'admin@example.com';
const adminPassword = process.env.E2E_ADMIN_PASSWORD ?? 'Admin123!';

test.describe('Auth and dashboard', () => {
  test('login, dashboard, users, logout', async ({ page }) => {
    await page.goto('/sign-in');

    await page.getByLabel('Email').fill(adminEmail);
    await page.getByLabel('Password').fill(adminPassword);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
    await expect(page.getByRole('heading', { name: 'Overview' }).first()).toBeVisible();

    await page.getByRole('link', { name: 'Users' }).click();
    await expect(page).toHaveURL(/\/dashboard\/users/);
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible({
      timeout: 15_000,
    });

    await page.getByRole('button', { name: adminEmail }).click();
    await page.getByText('Log out').click();
    await expect(page).toHaveURL(/\/sign-in/, { timeout: 10_000 });
  });
});
