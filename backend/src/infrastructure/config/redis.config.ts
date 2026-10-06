import { ConfigService } from '@nestjs/config';

export function isRedisEnabled(config: ConfigService): boolean {
  return config.get<string>('REDIS_ENABLED', 'true') === 'true';
}
