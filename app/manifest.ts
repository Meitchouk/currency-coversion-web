import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Currency Converter - Real-time Exchange Rates',
    short_name: 'Currency Converter',
    description: 'Free currency converter with real-time exchange rates and historical data',
    start_url: '/',
    display: 'standalone',
    background_color: '#1A1B1E',
    theme_color: '#1A1B1E',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['finance', 'utilities'],
    lang: 'en',
    dir: 'ltr',
  };
}
