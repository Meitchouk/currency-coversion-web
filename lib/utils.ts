import { DEFAULTS } from '@/lib/constants';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';

/**
 * Formats a number as currency with locale settings
 */
export function formatCurrency(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });
}

/**
 * Formats a date using dayjs format string with locale support
 */
export function formatDate(date: Date | string, format = 'MMM D, YYYY [at] h:mm A', locale: 'en' | 'es' = 'en'): string {
  return dayjs(date).locale(locale).format(format);
}

/**
 * Validates if a number is valid for conversion
 */
export function isValidAmount(amount: number | string): boolean {
  const num = Number(amount);
  return !isNaN(num) && num > 0;
}

/**
 * Builds a query string from an object
 */
export function buildQueryString(params: Record<string, string | number>): string {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return query ? `?${query}` : '';
}

/**
 * Calculates date range for historical data
 */
export function getDateRange(days: number = DEFAULTS.HISTORY_DAYS): { startDate: string; endDate: string } {
  const endDate = dayjs().format('YYYY-MM-DD');
  const startDate = dayjs().subtract(days, 'day').format('YYYY-MM-DD');
  return { startDate, endDate };
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Delays execution for the specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounces a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
