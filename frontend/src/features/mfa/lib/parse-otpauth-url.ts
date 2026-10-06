export interface OtpAuthDetails {
  account: string;
  issuer: string;
  secret: string;
}

export function parseOtpAuthUrl(otpauthUrl: string): OtpAuthDetails {
  const url = new URL(otpauthUrl);
  const pathAccount = url.pathname.replace(/^\//, '');
  const account = decodeURIComponent(pathAccount.includes(':')
    ? pathAccount.split(':').slice(1).join(':')
    : pathAccount);

  const secret = url.searchParams.get('secret') ?? '';
  const issuer =
    url.searchParams.get('issuer') ??
    (pathAccount.includes(':') ? decodeURIComponent(pathAccount.split(':')[0]) : '');

  return { account, issuer, secret };
}
