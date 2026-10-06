import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { authenticator } from 'otplib';
import { IMfaVerifier } from '@application/ports/identity.port';

@Injectable()
export class TotpMfaAdapter implements IMfaVerifier {
  constructor(private readonly config: ConfigService) {}

  generateSecret(email: string): { secret: string; otpauthUrl: string } {
    const secret = authenticator.generateSecret();
    const issuer = this.config.get<string>(
      'MFA_ISSUER',
      'Website Template Admin',
    );
    const otpauthUrl = authenticator.keyuri(email, issuer, secret);
    return { secret, otpauthUrl };
  }

  encryptSecret(secret: string): string {
    const key = this.getEncryptionKey();
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([
      cipher.update(secret, 'utf8'),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, encrypted]).toString('base64');
  }

  decryptSecret(encrypted: string): string {
    const key = this.getEncryptionKey();
    const data = Buffer.from(encrypted, 'base64');
    const iv = data.subarray(0, 12);
    const tag = data.subarray(12, 28);
    const payload = data.subarray(28);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(payload), decipher.final()]).toString(
      'utf8',
    );
  }

  verifyToken(secret: string, token: string): boolean {
    return authenticator.verify({ token, secret });
  }

  private getEncryptionKey(): Buffer {
    const raw = this.config.get<string>('MFA_ENCRYPTION_KEY');
    if (!raw || raw.length < 32) {
      throw new Error('MFA_ENCRYPTION_KEY must be at least 32 characters');
    }
    return crypto.createHash('sha256').update(raw).digest();
  }
}
