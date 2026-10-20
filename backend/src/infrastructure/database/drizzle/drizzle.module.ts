import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { createPostgresPoolConfig } from '@infrastructure/config/drizzle.config';
import { DRIZZLE, type DrizzleDatabase } from './drizzle.tokens';
import { schema } from './schema';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): DrizzleDatabase => {
        const pool = new Pool(createPostgresPoolConfig(configService));
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
