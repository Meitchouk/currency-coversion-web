import { FrankfurterProvider } from './frankfurter';
import { ExchangeRate, HistoricalData, ExchangeRateProvider } from './types';
import { cache, CACHE_TTL } from './cache';

/**
 * Main provider with caching and fallback logic
 * Implements stale-while-revalidate pattern
 */
class CachedExchangeProvider implements ExchangeRateProvider {
  private provider: ExchangeRateProvider;

  constructor(provider: ExchangeRateProvider) {
    this.provider = provider;
  }

  /**
   * Get current rate with cache support and stale-while-revalidate
   */
  async getCurrentRate(from: string, to: string): Promise<ExchangeRate> {
    const cacheKey = `rate:${from}:${to}`;
    
    // Check if we have fresh cached data
    if (cache.isFresh(cacheKey)) {
      const cached = cache.get<ExchangeRate>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Try to fetch fresh data
    try {
      const rate = await this.provider.getCurrentRate(from, to);
      cache.set(cacheKey, rate, CACHE_TTL.RATES);
      return rate;
    } catch (error) {
      // If fetch fails, try to return stale cache
      const stale = cache.get<ExchangeRate>(cacheKey);
      if (stale) {
        console.warn('Returning stale cache due to API error:', error);
        return stale;
      }
      
      // No cache available, throw error
      throw error;
    }
  }

  /**
   * Get historical rates with cache support
   */
  async getHistoricalRates(
    from: string,
    to: string,
    startDate: string,
    endDate: string
  ): Promise<HistoricalData> {
    const cacheKey = `history:${from}:${to}:${startDate}:${endDate}`;
    
    // Check if we have fresh cached data
    if (cache.isFresh(cacheKey)) {
      const cached = cache.get<HistoricalData>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Try to fetch fresh data
    try {
      const history = await this.provider.getHistoricalRates(from, to, startDate, endDate);
      cache.set(cacheKey, history, CACHE_TTL.HISTORY);
      return history;
    } catch (error) {
      // If fetch fails, try to return stale cache
      const stale = cache.get<HistoricalData>(cacheKey);
      if (stale) {
        console.warn('Returning stale historical cache due to API error:', error);
        return stale;
      }
      
      // No cache available, throw error
      throw error;
    }
  }

  /**
   * Get supported currencies with cache support
   */
  async getSupportedCurrencies(): Promise<string[]> {
    const cacheKey = 'currencies:supported';
    
    // Check if we have fresh cached data
    if (cache.isFresh(cacheKey)) {
      const cached = cache.get<string[]>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Try to fetch fresh data
    try {
      const currencies = await this.provider.getSupportedCurrencies();
      cache.set(cacheKey, currencies, CACHE_TTL.CURRENCIES);
      return currencies;
    } catch (error) {
      // If fetch fails, try to return stale cache
      const stale = cache.get<string[]>(cacheKey);
      if (stale) {
        console.warn('Returning stale currencies cache due to API error:', error);
        return stale;
      }
      
      // No cache available, throw error
      throw error;
    }
  }
}

// Singleton instance using Frankfurter as the default provider
export const exchangeProvider = new CachedExchangeProvider(new FrankfurterProvider());
