import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create({ key, value, ttl }) {
    await this.cacheManager.set(key, value, { ttl });
  }

  async fetch({ key }) {
    return await this.cacheManager.get(key);
  }
}
