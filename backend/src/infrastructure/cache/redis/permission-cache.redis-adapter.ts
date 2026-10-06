import { Injectable } from '@nestjs/common';
import {
  IPermissionCache,
  UserAuthContext,
} from '@application/ports/permission-cache.port';
import { RedisClient } from './redis.client';

@Injectable()
export class PermissionCacheRedisAdapter implements IPermissionCache {
  private readonly prefix = 'perm:user:';

  constructor(private readonly redis: RedisClient) {}

  async get(userId: number): Promise<UserAuthContext | null> {
    await this.redis.connect();
    const raw = await this.redis.client.get(`${this.prefix}${userId}`);
    if (!raw) return null;
    return JSON.parse(raw) as UserAuthContext;
  }

  async set(
    userId: number,
    context: UserAuthContext,
    ttlSec: number,
  ): Promise<void> {
    await this.redis.connect();
    await this.redis.client.setex(
      `${this.prefix}${userId}`,
      ttlSec,
      JSON.stringify(context),
    );
  }

  async invalidate(userId: number): Promise<void> {
    await this.redis.connect();
    await this.redis.client.del(`${this.prefix}${userId}`);
  }
}
