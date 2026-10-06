import { authenticator } from 'otplib';
import type { Page } from '@playwright/test';
import { fetchCsrf, loginAsAdmin } from './auth';

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
