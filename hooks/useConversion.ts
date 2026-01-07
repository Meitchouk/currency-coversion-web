import { useState, useCallback, useEffect } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/lib/constants';
import { buildQueryString, isValidAmount } from '@/lib/utils';
import type { ConversionResult } from '@/types/exchange';

interface UseConversionParams {
  fromCurrency: string | null;
  toCurrency: string | null;
  amount: number | string;
  autoFetch?: boolean;
}

interface UseConversionReturn {
  conversion: ConversionResult | null;
  loading: boolean;
  error: string | null;
  convert: () => Promise<void>;
}

/**
 * Custom hook to handle currency conversion
 */
export function useConversion({
  fromCurrency,
  toCurrency,
  amount,
  autoFetch = true,
}: UseConversionParams): UseConversionReturn {
  const [debouncedAmount] = useDebouncedValue(amount, 300);
  const [conversion, setConversion] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(async () => {
    if (!fromCurrency || !toCurrency || !isValidAmount(debouncedAmount)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const query = buildQueryString({
        from: fromCurrency,
        to: toCurrency,
        amount: debouncedAmount,
      });

      const response = await fetch(`${API_ENDPOINTS.CONVERT}${query}`);
      
      if (!response.ok) {
        throw new Error('Failed to convert');
      }
      
      const data = await response.json();
      setConversion(data);
    } catch (err) {
      console.error('Error converting:', err);
      setError(ERROR_MESSAGES.CONVERSION);
    } finally {
      setLoading(false);
    }
  }, [fromCurrency, toCurrency, debouncedAmount]);

  useEffect(() => {
    if (autoFetch && fromCurrency && toCurrency && isValidAmount(debouncedAmount)) {
      convert();
    }
  }, [autoFetch, fromCurrency, toCurrency, debouncedAmount, convert]);

  return {
    conversion,
    loading,
    error,
    convert,
  };
}
