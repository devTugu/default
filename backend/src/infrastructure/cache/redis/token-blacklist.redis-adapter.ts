import { Injectable } from '@nestjs/common';
import { ITokenBlacklist } from '@application/ports/token-blacklist.port';
import { RedisClient } from './redis.client';

@Injectable()
export class TokenBlacklistRedisAdapter implements ITokenBlacklist {
  private readonly prefix = 'bl:jti:';

  constructor(private readonly redis: RedisClient) {}

  async revoke(jti: string, expiresAtUnix: number): Promise<void> {
    await this.redis.connect();
    const ttl = Math.max(expiresAtUnix - Math.floor(Date.now() / 1000), 1);
    await this.redis.client.setex(`${this.prefix}${jti}`, ttl, '1');
  }

  async isRevoked(jti: string): Promise<boolean> {
    await this.redis.connect();
    const value = await this.redis.client.get(`${this.prefix}${jti}`);
    return value === '1';
  }
}
