import { NextResponse } from 'next/server';
import { exchangeProvider } from '@/lib/exchange/provider';

/**
 * GET /api/currencies
 * Get list of supported currencies
 */
export async function GET() {
  try {
    // Get currencies from provider (with caching)
    const currencies = await exchangeProvider.getSupportedCurrencies();

    // Currency names mapping
    const currencyNames: Record<string, string> = {
      AUD: 'Australian Dollar',
      BGN: 'Bulgarian Lev',
      BRL: 'Brazilian Real',
      CAD: 'Canadian Dollar',
      CHF: 'Swiss Franc',
      CNY: 'Chinese Yuan',
      CZK: 'Czech Koruna',
      DKK: 'Danish Krone',
      EUR: 'Euro',
      GBP: 'British Pound',
      HKD: 'Hong Kong Dollar',
      HUF: 'Hungarian Forint',
      IDR: 'Indonesian Rupiah',
      ILS: 'Israeli Shekel',
      INR: 'Indian Rupee',
      ISK: 'Icelandic Króna',
      JPY: 'Japanese Yen',
      KRW: 'South Korean Won',
      MXN: 'Mexican Peso',
      MYR: 'Malaysian Ringgit',
      NOK: 'Norwegian Krone',
      NZD: 'New Zealand Dollar',
      PHP: 'Philippine Peso',
      PLN: 'Polish Zloty',
      RON: 'Romanian Leu',
      SEK: 'Swedish Krona',
      SGD: 'Singapore Dollar',
      THB: 'Thai Baht',
      TRY: 'Turkish Lira',
      USD: 'US Dollar',
      ZAR: 'South African Rand',
    };

    const formattedCurrencies = currencies.map(code => ({
      code,
      name: currencyNames[code] || code,
      value: code,
      label: `${code} - ${currencyNames[code] || code}`,
    }));

    return NextResponse.json(formattedCurrencies, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
      },
    });
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch currencies' },
      { status: 500 }
    );
  }
}
