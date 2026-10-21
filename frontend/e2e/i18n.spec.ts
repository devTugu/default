import { test, expect } from '@playwright/test';

test.describe('i18n', () => {
  test('shows Mongolian sign-in strings when locale cookie is mn', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: 'locale',
        value: 'mn',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/sign-in');
    await expect(page.getByText('Нэвтрэх', { exact: true }).first()).toBeVisible();
    await expect(
      page.locator('form').getByRole('button', { name: 'Нэвтрэх', exact: true }),
    ).toBeVisible();
  });

  test('shows English sign-in strings when locale cookie is en', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: 'locale',
        value: 'en',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/sign-in');
    await expect(page.getByText('Sign in', { exact: true }).first()).toBeVisible();
    await expect(
      page.locator('form').getByRole('button', { name: 'Sign in', exact: true }),
    ).toBeVisible();
  });

  test('shows localized home page copy for Mongolian', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: 'locale',
        value: 'mn',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/');
    await expect(
      page.getByRole('link', { name: 'Эхлэх', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Нууцлал', exact: true }),
    ).toBeVisible();
  });

  test('shows Mongolian hero nav labels when locale cookie is mn', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: 'locale',
        value: 'mn',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/');
    await expect(
      page.getByRole('link', { name: 'Нөхцөл', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Demo захиалах', exact: true }),
    ).toBeVisible();
  });
});
