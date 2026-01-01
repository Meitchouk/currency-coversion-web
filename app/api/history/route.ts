import { NextRequest, NextResponse } from 'next/server';
import { exchangeProvider } from '@/lib/exchange/provider';
import dayjs from 'dayjs';

/**
 * GET /api/history?from=USD&to=EUR&days=30
 * Get historical exchange rates between two currencies
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const daysParam = searchParams.get('days') || '90';

    // Validate parameters
    if (!from || !to) {
      return NextResponse.json(
        { error: 'Missing required parameters: from, to' },
        { status: 400 }
      );
    }

    const days = parseInt(daysParam);
    if (isNaN(days) || days <= 0 || days > 365) {
      return NextResponse.json(
        { error: 'Invalid days parameter. Must be between 1 and 365.' },
        { status: 400 }
      );
    }

    // Calculate date range
    const endDate = dayjs().format('YYYY-MM-DD');
    const startDate = dayjs().subtract(days, 'day').format('YYYY-MM-DD');

    // Get historical data from provider (with caching)
    const history = await exchangeProvider.getHistoricalRates(
      from.toUpperCase(),
      to.toUpperCase(),
      startDate,
      endDate
    );

    return NextResponse.json(history, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error fetching historical rates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historical rates' },
      { status: 500 }
    );
  }
}
