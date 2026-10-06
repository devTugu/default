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
    await expect(page.getByRole('heading', { name: 'Нэвтрэх' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Нэвтрэх', exact: true }),
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
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Sign in', exact: true }),
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
      page.getByText('NestJS Clean Architecture API болон Next.js FSD admin'),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Нэвтрэх/ }),
    ).toBeVisible();
  });

  test('shows CMS hero title in Mongolian when locale cookie is mn', async ({
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
      page.getByRole('heading', {
        level: 1,
        name: /Сайн байна уу, би хөгжүүлэгч/,
      }),
    ).toBeVisible();
  });
});
