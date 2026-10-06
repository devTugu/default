import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';
import { IOrganizationContext } from '@application/ports/organization-context.port';
import {
  DRIZZLE,
  type DrizzleDatabase,
} from '../database/drizzle/drizzle.tokens';
import { organizations } from '../database/drizzle/schema';

/**
 * Returns the seeded default organization id (cached).
 * Multi-org UI is out of scope — this keeps single-tenant behavior.
 */
@Injectable()
export class DefaultOrganizationContext implements IOrganizationContext {
  private cachedId: number | null | undefined;

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDatabase,
    private readonly config: ConfigService,
  ) {}

  async getCurrentOrganizationId(): Promise<number | null> {
    if (this.cachedId !== undefined) {
      return this.cachedId;
    }

    const slug = this.config.get<string>(
      'ORGANIZATION_DEFAULT_SLUG',
      'default',
    );
    const org = await this.db.query.organizations.findFirst({
      where: eq(organizations.slug, slug),
    });
    this.cachedId = org?.id ?? null;
    return this.cachedId;
  }
}
