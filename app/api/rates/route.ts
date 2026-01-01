import { NextRequest, NextResponse } from 'next/server';
import { exchangeProvider } from '@/lib/exchange/provider';

/**
 * GET /api/rates?from=USD&to=EUR
 * Get current exchange rate between two currencies
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

    // Get rate from provider (with caching)
    const rate = await exchangeProvider.getCurrentRate(from.toUpperCase(), to.toUpperCase());

    return NextResponse.json(rate, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exchange rate' },
      { status: 500 }
    );
  }
}
