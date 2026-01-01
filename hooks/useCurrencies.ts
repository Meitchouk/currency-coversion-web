import { useState, useCallback, useEffect } from 'react';
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/lib/constants';
import type { CurrencyOption } from '@/types/currency';

interface UseCurrenciesReturn {
  currencies: CurrencyOption[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage currencies
 */
export function useCurrencies(): UseCurrenciesReturn {
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrencies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.CURRENCIES);
      if (!response.ok) {
        throw new Error('Failed to load currencies');
      }
      const data = await response.json();
      setCurrencies(data);
    } catch (err) {
      console.error('Error loading currencies:', err);
      setError(ERROR_MESSAGES.LOAD_CURRENCIES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  return {
    currencies,
    loading,
    error,
    refetch: fetchCurrencies,
  };
}
