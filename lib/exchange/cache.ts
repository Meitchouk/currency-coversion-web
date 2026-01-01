interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class InMemoryCache {
  private cache: Map<string, CacheEntry<unknown>>;

  constructor() {
    this.cache = new Map();
  }

  /**
   * Get data from cache if valid, otherwise return null
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    const age = now - entry.timestamp;

    // If within TTL, return cached data
    if (age < entry.ttl) {
      return entry.data as T;
    }

    // Data is stale, but can be returned while revalidating
    // Caller should handle revalidation
    return entry.data as T;
  }

  /**
   * Check if cached data is fresh (within TTL)
   */
  isFresh(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    const now = Date.now();
    const age = now - entry.timestamp;

    return age < entry.ttl;
  }

  /**
   * Set data in cache with TTL in milliseconds
   */
  set<T>(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Clear specific key from cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }
}

// Singleton instance
export const cache = new InMemoryCache();

// Cache TTL constants (in milliseconds)
export const CACHE_TTL = {
  RATES: 5 * 60 * 1000,      // 5 minutes for current rates
  HISTORY: 60 * 60 * 1000,   // 1 hour for historical data
  CURRENCIES: 24 * 60 * 60 * 1000, // 24 hours for supported currencies list
};
