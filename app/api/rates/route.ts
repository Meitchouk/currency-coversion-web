import { NextRequest, NextResponse } from 'next/server';
import { exchangeProvider } from '@/lib/exchange/provider';

/**
 * GET /api/rates?from=USD&to=EUR,GBP,JPY
 * Get current exchange rates from one currency to one or multiple currencies
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    // Validate parameters
    if (!from || !to) {
      return NextResponse.json(
        { error: 'Missing required parameters: from, to' },
        { status: 400 }
      );
    }

    const fromCurrency = from.toUpperCase();
    const toCurrencies = to.toUpperCase().split(',').map(c => c.trim());

    // If single currency, return single rate (backward compatibility)
    if (toCurrencies.length === 1) {
      const rate = await exchangeProvider.getCurrentRate(fromCurrency, toCurrencies[0]);
      return NextResponse.json(rate, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }

    // Multiple currencies: fetch all rates
    const ratesPromises = toCurrencies.map(async (toCurrency) => {
      try {
        const rate = await exchangeProvider.getCurrentRate(fromCurrency, toCurrency);
        return { currency: toCurrency, rate: rate.rate };
      } catch (error) {
        console.error(`Error fetching rate for ${toCurrency}:`, error);
        return { currency: toCurrency, rate: null };
      }
    });

    const ratesResults = await Promise.all(ratesPromises);
    
    // Convert to object format: { EUR: 0.85, GBP: 0.73, ... }
    const rates: Record<string, number> = {};
    ratesResults.forEach(result => {
      if (result.rate !== null) {
        rates[result.currency] = result.rate;
      }
    });

    return NextResponse.json(
      { 
        from: fromCurrency,
        rates,
        timestamp: new Date().toISOString()
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exchange rate' },
      { status: 500 }
    );
  }
}
