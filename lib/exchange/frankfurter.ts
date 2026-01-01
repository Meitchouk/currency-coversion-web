import { ExchangeRate, ExchangeRateProvider, HistoricalData } from './types';

/**
 * Frankfurter API - Free and open-source currency exchange rate API
 * https://www.frankfurter.app/
 * 
 * Features:
 * - No API key required
 * - Current and historical rates
 * - Updated daily
 * - Supports 30+ currencies
 */
export class FrankfurterProvider implements ExchangeRateProvider {
  private readonly baseUrl = 'https://api.frankfurter.app';

  /**
   * Get current exchange rate between two currencies
   */
  async getCurrentRate(from: string, to: string): Promise<ExchangeRate> {
    try {
      const url = `${this.baseUrl}/latest?from=${from}&to=${to}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Frankfurter API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        from,
        to,
        rate: data.rates[to],
        timestamp: new Date(data.date),
      };
    } catch (error) {
      throw new Error(`Failed to fetch current rate: ${error}`);
    }
  }

  /**
   * Get historical exchange rates between two currencies
   */
  async getHistoricalRates(
    from: string,
    to: string,
    startDate: string,
    endDate: string
  ): Promise<HistoricalData> {
    try {
      const url = `${this.baseUrl}/${startDate}..${endDate}?from=${from}&to=${to}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Frankfurter API error: ${response.status}`);
      }

      const data = await response.json();

      const rates = Object.entries(data.rates as Record<string, Record<string, number>>).map(([date, rateData]) => ({
        date,
        rate: rateData[to],
      }));

      return {
        from,
        to,
        rates,
        startDate: data.start_date,
        endDate: data.end_date,
      };
    } catch (error) {
      throw new Error(`Failed to fetch historical rates: ${error}`);
    }
  }

  /**
   * Get list of supported currencies
   */
  async getSupportedCurrencies(): Promise<string[]> {
    try {
      const url = `${this.baseUrl}/currencies`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Frankfurter API error: ${response.status}`);
      }

      const data = await response.json();
      return Object.keys(data);
    } catch (error) {
      throw new Error(`Failed to fetch supported currencies: ${error}`);
    }
  }
}
