import { Injectable } from '@nestjs/common';
import { ThrottlerStorage } from '@nestjs/throttler';
import { RedisClient } from './redis.client';

@Injectable()
export class RedisThrottlerStorage implements ThrottlerStorage {
  constructor(private readonly redis: RedisClient) {}

  async increment(
    key: string,
    ttl: number,
  ): Promise<{
    totalHits: number;
    timeToExpire: number;
    isBlocked: boolean;
    timeToBlockExpire: number;
  }> {
    await this.redis.connect();
    const client = this.redis.client;
    const totalHits = await client.incr(key);
    if (totalHits === 1) {
      await client.pexpire(key, ttl);
    }
    const timeToExpire = await client.pttl(key);
    return {
      totalHits,
      timeToExpire: timeToExpire > 0 ? timeToExpire : ttl,
      isBlocked: false,
      timeToBlockExpire: 0,
    };
  }
}
