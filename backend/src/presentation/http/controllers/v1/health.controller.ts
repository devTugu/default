import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorFunction,
} from '@nestjs/terminus';
import { isRedisEnabled } from '@infrastructure/config/redis.config';
import { RedisHealthIndicator } from '@infrastructure/cache/redis/redis.health';
import { DrizzleHealthIndicator } from '@infrastructure/database/drizzle/drizzle.health';
import { Public } from '../../decorators/public.decorator';

@ApiTags('Health v1')
@Controller({ path: 'health', version: '1' })
export class HealthV1Controller {
  constructor(
    private readonly health: HealthCheckService,
    private readonly config: ConfigService,
    private readonly db: DrizzleHealthIndicator,
    private readonly redis: RedisHealthIndicator,
  ) {}

  @Public()
  @Get('live')
  @HealthCheck()
  @ApiOperation({ summary: 'Liveness probe' })
  live() {
    return this.health.check([]);
  }

  @Public()
  @Get('ready')
  @HealthCheck()
  @ApiOperation({
    summary: 'Readiness probe (database; Redis when REDIS_ENABLED=true)',
  })
  ready() {
    const checks: HealthIndicatorFunction[] = [
      () => this.db.pingCheck('database'),
    ];
    if (isRedisEnabled(this.config)) {
      checks.push(() => this.redis.pingCheck('redis'));
    }
    return this.health.check(checks);
  }
}
