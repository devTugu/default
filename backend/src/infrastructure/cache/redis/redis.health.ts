import { Injectable, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { isRedisEnabled } from '@infrastructure/config/redis.config';
import { RedisClient } from './redis.client';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(
    private readonly config: ConfigService,
    @Optional() private readonly redis?: RedisClient,
  ) {
    super();
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    if (!isRedisEnabled(this.config)) {
      return this.getStatus(key, true, {
        message: 'Redis disabled (in-memory cache)',
      });
    }
    if (!this.redis) {
      return this.getStatus(key, false, {
        message: 'Redis client not configured',
      });
    }
    await this.redis.connect();
    const pong = await this.redis.client.ping();
    const isHealthy = pong === 'PONG';
    return this.getStatus(key, isHealthy);
  }
}
