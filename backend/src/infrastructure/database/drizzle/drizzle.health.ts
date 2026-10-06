import { Inject, Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { sql } from 'drizzle-orm';
import { DRIZZLE, type DrizzleDatabase } from './drizzle.tokens';

@Injectable()
export class DrizzleHealthIndicator extends HealthIndicator {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDatabase) {
    super();
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    await this.db.execute(sql`SELECT 1`);
    return this.getStatus(key, true);
  }
}
