import { NextRequest, NextResponse } from 'next/server';
import { exchangeProvider } from '@/lib/exchange/provider';

/**
 * GET /api/convert?from=USD&to=EUR&amount=100
 * Convert amount from one currency to another
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const amountParam = searchParams.get('amount');

    // Validate parameters
    if (!from || !to || !amountParam) {
      return NextResponse.json(
        { error: 'Missing required parameters: from, to, amount' },
        { status: 400 }
      );
    }

    const amount = parseFloat(amountParam);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be a positive number.' },
        { status: 400 }
      );
    }

    // Get rate from provider (with caching)
    const rateData = await exchangeProvider.getCurrentRate(from.toUpperCase(), to.toUpperCase());

    // Calculate conversion
    const result = amount * rateData.rate;

    const conversion = {
      from: rateData.from,
      to: rateData.to,
      amount,
      result: parseFloat(result.toFixed(2)),
      rate: rateData.rate,
      timestamp: rateData.timestamp,
    };

    return NextResponse.json(conversion, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error performing conversion:', error);
    return NextResponse.json(
      { error: 'Failed to perform conversion' },
      { status: 500 }
    );
  }
}
