import { authenticator } from 'otplib';
import { expect, type Page } from '@playwright/test';
import {
  adminEmail,
  adminPassword,
  fetchCsrf,
  loginAsAdmin,
} from './auth';

function extractSecretFromOtpAuthUrl(otpauthUrl: string): string {
  const url = new URL(otpauthUrl);
  return url.searchParams.get('secret') ?? '';
}

export async function enrollAdminMfa(page: Page): Promise<string> {
  await loginAsAdmin(page);

  const csrf = await fetchCsrf(page);
  const enrollResponse = await page.request.post('/api/backend/auth/mfa/enroll', {
    headers: { 'x-csrf-token': csrf },
  });
  const enrollJson = (await enrollResponse.json()) as {
    data: { otpauthUrl: string };
  };
  const secret = extractSecretFromOtpAuthUrl(enrollJson.data.otpauthUrl);
  const code = authenticator.generate(secret);

  await page.request.post('/api/backend/auth/mfa/enroll/confirm', {
    headers: { 'x-csrf-token': csrf, 'Content-Type': 'application/json' },
    data: { code },
  });

  await page.request.post('/api/auth/logout', {
    headers: { 'x-csrf-token': csrf },
  });

  return secret;
}

export function generateTotp(secret: string): string {
  return authenticator.generate(secret);
}

async function disableMfaWithActiveSession(
  page: Page,
  secret: string,
): Promise<boolean> {
  try {
    const csrf = await fetchCsrf(page);
    const disableRes = await page.request.post('/api/backend/auth/mfa/disable', {
      headers: { 'x-csrf-token': csrf, 'Content-Type': 'application/json' },
      data: { code: generateTotp(secret) },
    });
    if (!disableRes.ok()) {
      return false;
    }
    await page.request.post('/api/auth/logout', {
      headers: { 'x-csrf-token': csrf },
    });
    return true;
  } catch {
    return false;
  }
}

async function signInThroughMfaIfNeeded(
  page: Page,
  secret: string,
  email: string,
  password: string,
): Promise<void> {
  await page.context().clearCookies();
  await page.goto('/sign-in');
  const form = page.locator('form').first();
  await expect(form.getByLabel('Email')).toBeVisible();
  await form.getByLabel('Email').fill(email);
  await form.getByLabel('Password').fill(password);
  await form.getByRole('button', { name: /^(Sign in|Нэвтрэх)$/, exact: true }).click();

  const mfaPrompt = page.getByText(/Enter the 6-digit code/i);
  if (await mfaPrompt.isVisible({ timeout: 10_000 }).catch(() => false)) {
    await page.getByPlaceholder('000000').fill(generateTotp(secret));
    await page.getByRole('button', { name: 'Verify code' }).click();
  }

  await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
}

/** Restores admin to password-only login after MFA E2E (avoids breaking later specs). */
export async function disableAdminMfa(
  page: Page,
  secret: string,
  email: string = adminEmail,
  password: string = adminPassword,
): Promise<void> {
  if (page.url().includes('/dashboard')) {
    if (await disableMfaWithActiveSession(page, secret)) {
      return;
    }
  }

  await signInThroughMfaIfNeeded(page, secret, email, password);
  const disabled = await disableMfaWithActiveSession(page, secret);
  expect(disabled).toBeTruthy();
}
