import type { Metadata } from "next";
import { ColorSchemeScript } from '@mantine/core';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ClientProviders } from '@/components/providers';
import { LocaleProvider } from '@/lib/locale-context';
import { Footer } from '@/components/layout';
import { generateFAQStructuredData } from '@/lib/seo';
import { metadata as siteMetadata, webAppJsonLd } from '@/lib/metadata';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faqJsonLd = generateFAQStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1A1B1E" />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ClientProviders>
          <LocaleProvider>
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </LocaleProvider>
        </ClientProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
