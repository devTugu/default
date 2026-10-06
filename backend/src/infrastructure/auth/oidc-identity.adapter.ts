import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as openid from 'openid-client';
import {
  IOAuthIdentityProvider,
  OAuthUserInfo,
} from '@application/ports/identity.port';

function readClaimString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  return undefined;
}

@Injectable()
export class OidcIdentityAdapter implements IOAuthIdentityProvider {
  private configPromise: Promise<openid.Configuration> | null = null;

  constructor(private readonly config: ConfigService) {}

  isEnabled(): boolean {
    return this.config.get<string>('OAUTH_ENABLED', 'false') === 'true';
  }

  async getAuthorizationUrl(state: string): Promise<string> {
    const oidcConfig = await this.getConfig();
    const url = openid.buildAuthorizationUrl(oidcConfig, {
      redirect_uri: this.config.getOrThrow<string>('OAUTH_CALLBACK_URL'),
      scope: 'openid email profile',
      state,
    });
    return url.href;
  }

  async exchangeCode(callbackUrl: string): Promise<OAuthUserInfo> {
    const oidcConfig = await this.getConfig();
    const tokens = await openid.authorizationCodeGrant(
      oidcConfig,
      new URL(callbackUrl),
    );
    const claims = tokens.claims();
    const email = readClaimString(claims?.email);
    if (!claims?.sub || !email) {
      throw new Error('OIDC claims missing sub or email');
    }
    return {
      provider: 'oidc',
      subject: String(claims.sub),
      email,
      name: readClaimString(claims.name),
    };
  }

  private getConfig(): Promise<openid.Configuration> {
    if (!this.configPromise) {
      this.configPromise = openid.discovery(
        new URL(this.config.getOrThrow<string>('OAUTH_ISSUER')),
        this.config.getOrThrow<string>('OAUTH_CLIENT_ID'),
        this.config.getOrThrow<string>('OAUTH_CLIENT_SECRET'),
      );
    }
    return this.configPromise;
  }
}
