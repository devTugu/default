import { describe, expect, it } from 'vitest';
import { parseOtpAuthUrl } from './parse-otpauth-url';

describe('parseOtpAuthUrl', () => {
  it('extracts account, issuer, and secret from a standard otpauth URL', () => {
    const url =
      'otpauth://totp/Website%20Admin:admin%40example.com?secret=ABCD1234&issuer=Website%20Admin';

    expect(parseOtpAuthUrl(url)).toEqual({
      account: 'admin@example.com',
      issuer: 'Website Admin',
      secret: 'ABCD1234',
    });
  });
});
