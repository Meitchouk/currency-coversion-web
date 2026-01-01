import type { Metadata } from "next";
import { MantineProvider } from '@mantine/core';
import { LocaleProvider } from '@/lib/locale-context';
import { theme } from '@/styles/theme';
import '@mantine/core/styles.css';
import './swagger-override.css';

export const metadata: Metadata = {
  title: "API Documentation",
  description: "RESTful API documentation for Currency Converter. Access real-time exchange rates, historical data, and currency information programmatically. Free API with OpenAPI/Swagger specification.",
  keywords: [
    'currency API',
    'exchange rates API',
    'forex API',
    'REST API',
    'currency converter API',
    'free currency API',
    'OpenAPI',
    'Swagger',
    'API documentation',
  ],
  openGraph: {
    title: 'API Documentation - Currency Converter',
    description: 'RESTful API documentation for accessing real-time exchange rates and historical currency data.',
    type: 'website',
  },
};

export default function ApiDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider theme={theme}>
      <LocaleProvider>
        {children}
      </LocaleProvider>
    </MantineProvider>
  );
}
