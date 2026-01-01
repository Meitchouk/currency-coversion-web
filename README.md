# Currency Converter

A free, public web application for real-time currency conversion with automatic exchange rate updates and historical data visualization.

**Live Demo**: [https://currency-coversion-web.vercel.app](https://currency-coversion-web.vercel.app)

**Architecture Documentation**: [ARCHITECTURE.md](./ARCHITECTURE.md)

## Overview

This application provides real-time currency conversion between 30+ currencies with historical data visualization. Built with Next.js 16 and powered by the Frankfurter API, it features intelligent caching, dark/light themes, and a fully responsive interface. No authentication or database required.

## Key Features

- Real-time currency conversion with 30+ supported currencies
- Historical exchange rate visualization (7 days to 1 year)
- Automatic rate updates with intelligent caching system
- Dark and light theme support
- Fully responsive design for mobile and desktop
- Accessible interface with keyboard navigation
- Interactive charts with zoom and scale controls
- Serverless architecture deployed on Vercel

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **UI Library**: Mantine v7
- **Charts**: Recharts via @mantine/charts
- **Icons**: Tabler Icons React
- **Internationalization**: next-intl (English/Spanish)
- **API Source**: [Frankfurter API](https://www.frankfurter.app/)
- **Deployment**: Vercel

## Installation and Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

## Build and Production

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting, type-check, and build
npm run check
```

## Deployment

Deployed on Vercel with automatic deployment from the main branch. No environment variables or additional configuration required.

## Caching Strategy

Intelligent in-memory caching system with TTL:

- Current exchange rates: 5 minutes TTL
- Historical data: 1 hour TTL
- Currency list: 24 hours TTL
- Stale-while-revalidate pattern for resilience

## API Endpoints

### GET /api/currencies

Returns list of all supported currencies.

### GET /api/rates

Parameters: `from`, `to`

Returns current exchange rate between two currencies.

### GET /api/convert

Parameters: `from`, `to`, `amount`

Converts an amount from one currency to another.

### GET /api/history

Parameters: `from`, `to`, `days`

Returns historical exchange rates (1-365 days).

## Data Source

Powered by [Frankfurter API](https://www.frankfurter.app/) - A free, open-source API for current and historical foreign exchange rates published by the European Central Bank.

**Frankfurter API Features:**

- No authentication required
- Daily rate updates from ECB
- 30+ currencies supported
- Historical data since 1999
- No rate limits

**Credits**: Thanks to [Haim Grosman](https://github.com/hakanensari) for creating and maintaining the Frankfurter API.

## Performance Optimizations

- Server Components by default
- Client Components only where needed
- HTTP caching on API routes
- Optimized bundle size with package imports
- Efficient rendering with React 19
- Image optimization with Next.js
- Compression enabled

## SEO and Metadata

- Complete Open Graph and Twitter Cards
- Structured data with JSON-LD (WebApplication, FAQ schemas)
- Automatic sitemap generation
- Robots.txt configuration
- PWA manifest for installability
- Security headers

## License

MIT License - Open source and free to use.

See [LICENSE](./LICENSE) file for full license text.

---

**Developer**: [Meitchouk](https://github.com/Meitchouk) | **Repository**: [currency-coversion-web](https://github.com/Meitchouk/currency-coversion-web)
