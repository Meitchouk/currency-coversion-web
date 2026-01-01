import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  // Detect locale from browser or use default
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Parse accept-language header
  const browserLang = acceptLanguage.split(',')[0]?.split('-')[0] || defaultLocale;
  const locale = locales.includes(browserLang as Locale) ? browserLang : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
