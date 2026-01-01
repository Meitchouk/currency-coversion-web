import { useState, useCallback, useEffect } from 'react';
import { API_ENDPOINTS, DEFAULTS } from '@/lib/constants';
import { buildQueryString } from '@/lib/utils';
import type { HistoricalData } from '@/types/exchange';

interface UseHistoricalDataParams {
  fromCurrency: string | null;
  toCurrency: string | null;
  days?: number;
  autoFetch?: boolean;
}

interface UseHistoricalDataReturn {
  data: HistoricalData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch historical exchange rate data
 */
export function useHistoricalData({
  fromCurrency,
  toCurrency,
  days = DEFAULTS.HISTORY_DAYS,
  autoFetch = true,
}: UseHistoricalDataParams): UseHistoricalDataReturn {
  const [data, setData] = useState<HistoricalData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!fromCurrency || !toCurrency) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const query = buildQueryString({
        from: fromCurrency,
        to: toCurrency,
        days,
      });

      const response = await fetch(`${API_ENDPOINTS.HISTORY}${query}`);
      
      if (!response.ok) {
        throw new Error('Failed to load history');
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error loading history:', err);
      setError('Failed to load historical data');
    } finally {
      setLoading(false);
    }
  }, [fromCurrency, toCurrency, days]);

  useEffect(() => {
    if (autoFetch && fromCurrency && toCurrency) {
      fetchData();
    }
  }, [autoFetch, fromCurrency, toCurrency, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
