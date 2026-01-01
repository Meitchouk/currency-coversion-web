export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: Date;
}

export interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: Date;
}

export interface HistoricalRate {
  date: string;
  rate: number;
}

export interface HistoricalData {
  from: string;
  to: string;
  rates: HistoricalRate[];
  startDate: string;
  endDate: string;
}

export interface ExchangeRateProvider {
  getCurrentRate(from: string, to: string): Promise<ExchangeRate>;
  getHistoricalRates(from: string, to: string, startDate: string, endDate: string): Promise<HistoricalData>;
  getSupportedCurrencies(): Promise<string[]>;
}
