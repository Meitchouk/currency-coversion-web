/**
 * API Configuration Constants
 */
export const API_ENDPOINTS = {
  CURRENCIES: '/api/currencies',
  RATES: '/api/rates',
  CONVERT: '/api/convert',
  HISTORY: '/api/history',
} as const;

/**
 * Default values for the application
 */
export const DEFAULTS = {
  FROM_CURRENCY: 'USD',
  TO_CURRENCY: 'EUR',
  AMOUNT: 100,
  HISTORY_DAYS: 90,
} as const;

/**
 * Available history day ranges
 */
export const HISTORY_RANGES = [
  { label: '7 Days', value: 7 },
  { label: '30 Days', value: 30 },
  { label: '90 Days', value: 90 },
  { label: '6 Months', value: 180 },
  { label: '1 Year', value: 365 },
] as const;

/**
 * Animation durations in milliseconds
 */
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 400,
  HEADER: 600,
  CHART: 700,
  FOOTER: 1000,
} as const;

/**
 * Transition types for Mantine components
 */
export const TRANSITIONS = {
  FADE: 'fade',
  SLIDE_DOWN: 'slide-down',
  SLIDE_UP: 'slide-up',
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  LOAD_CURRENCIES: 'Failed to load currencies. Please refresh the page.',
  CONVERSION: 'Failed to perform conversion. Please try again.',
  HISTORY: 'Failed to load historical rates.',
} as const;

/**
 * Success messages
 */
export const INFO_MESSAGES = {
  CACHE_INFO: 'Rates are updated automatically and cached for optimal performance. Historical data shows the last 3 months.',
} as const;
