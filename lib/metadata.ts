import { Metadata } from 'next';

const SITE_URL = 'https://currency-coversion-web.vercel.app';
const SITE_NAME = 'Currency Converter';
const SITE_DESCRIPTION = 'Free currency converter with real-time exchange rates powered by the European Central Bank. Convert between 30+ currencies instantly, view historical data, and analyze trends with interactive charts. Updated daily.';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Real-time Exchange Rates & Historical Data`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'currency converter',
    'exchange rates',
    'real-time rates',
    'forex',
    'currency exchange',
    'historical exchange rates',
    'EUR USD',
    'currency charts',
    'ECB rates',
    'free currency converter',
    'money converter',
    'foreign exchange',
    'fx rates',
  ],
  authors: [{ name: 'Meitchouk', url: 'https://github.com/Meitchouk' }],
  creator: 'Meitchouk',
  publisher: 'Meitchouk',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'es': '/es',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
    url: '/',
    title: `${SITE_NAME} - Real-time Exchange Rates & Historical Data`,
    description: 'Free currency converter with real-time exchange rates. Convert between 30+ currencies, view historical data and trends. Powered by European Central Bank data.',
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Real-time Exchange Rates`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Real-time Exchange Rates`,
    description: 'Free currency converter with real-time exchange rates. Convert between 30+ currencies instantly.',
    creator: '@Meitchouk',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Agregar verification tokens cuando tengas Google Search Console, Bing, etc.
    // google: 'google-verification-token',
    // yandex: 'yandex-verification-token',
  },
  category: 'finance',
};

export const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Person',
    name: 'Meitchouk',
    url: 'https://github.com/Meitchouk',
  },
  featureList: [
    'Real-time exchange rates',
    'Historical data visualization',
    'Support for 30+ currencies',
    'Interactive charts',
    'Free to use',
  ],
};

export const SITE_CONFIG = {
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
};
