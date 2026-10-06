import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { createMysqlPoolOptions } from '@infrastructure/config/drizzle.config';
import { DRIZZLE, type DrizzleDatabase } from './drizzle.tokens';
import { schema } from './schema';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): DrizzleDatabase => {
        const pool = mysql.createPool(createMysqlPoolOptions(configService));
        return drizzle(pool, { schema, mode: 'default' });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
