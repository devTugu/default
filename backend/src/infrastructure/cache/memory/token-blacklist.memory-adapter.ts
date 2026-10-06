import { Injectable } from '@nestjs/common';
import { ITokenBlacklist } from '@application/ports/token-blacklist.port';

interface BlacklistEntry {
  expiresAtUnix: number;
}

@Injectable()
export class TokenBlacklistMemoryAdapter implements ITokenBlacklist {
  private readonly entries = new Map<string, BlacklistEntry>();

  async revoke(jti: string, expiresAtUnix: number): Promise<void> {
    this.entries.set(jti, { expiresAtUnix });
    this.pruneExpired();
    await Promise.resolve();
  }

  async isRevoked(jti: string): Promise<boolean> {
    this.pruneExpired();
    const entry = this.entries.get(jti);
    if (!entry) {
      await Promise.resolve();
      return false;
    }
    const now = Math.floor(Date.now() / 1000);
    if (entry.expiresAtUnix <= now) {
      this.entries.delete(jti);
      await Promise.resolve();
      return false;
    }
    await Promise.resolve();
    return true;
  }

  private pruneExpired(): void {
    const now = Math.floor(Date.now() / 1000);
    for (const [jti, entry] of this.entries) {
      if (entry.expiresAtUnix <= now) {
        this.entries.delete(jti);
      }
    }
  }
}
