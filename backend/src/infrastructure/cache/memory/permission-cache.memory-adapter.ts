import { Injectable } from '@nestjs/common';
import {
  IPermissionCache,
  UserAuthContext,
} from '@application/ports/permission-cache.port';

interface CacheEntry {
  context: UserAuthContext;
  expiresAt: number;
}

@Injectable()
export class PermissionCacheMemoryAdapter implements IPermissionCache {
  private readonly entries = new Map<number, CacheEntry>();

  async get(userId: number): Promise<UserAuthContext | null> {
    const entry = this.entries.get(userId);
    if (!entry) {
      await Promise.resolve();
      return null;
    }
    if (Date.now() >= entry.expiresAt) {
      this.entries.delete(userId);
      await Promise.resolve();
      return null;
    }
    await Promise.resolve();
    return entry.context;
  }

  async set(
    userId: number,
    context: UserAuthContext,
    ttlSec: number,
  ): Promise<void> {
    this.entries.set(userId, {
      context,
      expiresAt: Date.now() + ttlSec * 1000,
    });
    await Promise.resolve();
  }

  async invalidate(userId: number): Promise<void> {
    this.entries.delete(userId);
    await Promise.resolve();
  }
}
