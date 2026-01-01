/**
 * SEO utilities for the application
 */

import { SITE_CONFIG } from './metadata';

export interface CurrencyPageSEO {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
}

/**
 * Generate structured data for currency conversion
 */
export function generateCurrencyStructuredData(from?: string, to?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${from || 'Currency'} to ${to || 'Currency'} Converter`,
    description: `Convert ${from || 'currencies'} to ${to || 'other currencies'} with real-time exchange rates`,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    category: 'Finance',
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How often are exchange rates updated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Exchange rates are updated daily from the European Central Bank (ECB). The rates reflect the official reference rates published by the ECB.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this currency converter free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, this currency converter is completely free to use with no registration required. You can access real-time exchange rates and historical data at no cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'What currencies are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support 30+ major world currencies including USD, EUR, GBP, JPY, CHF, CAD, AUD, and many more. All rates are based on European Central Bank data.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see historical exchange rates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can view historical exchange rates with interactive charts showing data for the last 7 days, 30 days, 90 days, 6 months, or 1 year.',
        },
      },
    ],
  };
}

/**
 * Generate canonical URL
 */
export function generateCanonicalURL(path: string = ''): string {
  return `${SITE_CONFIG.url}${path}`;
}

/**
 * Generate page title with template
 */
export function generatePageTitle(title?: string): string {
  const base = SITE_CONFIG.name;
  return title ? `${title} | ${base}` : `${base} - Real-time Exchange Rates & Historical Data`;
}
