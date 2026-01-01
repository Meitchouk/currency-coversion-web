# Application Architecture

**Back to README**: [README.md](./README.md)

## Project Structure

```text
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── convert/              # Currency conversion endpoint
│   │   ├── currencies/           # Available currencies endpoint
│   │   ├── history/              # Historical data endpoint
│   │   └── rates/                # Exchange rates endpoint
│   ├── api-docs/                 # Swagger API documentation
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Main application page
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── robots.ts                 # Robots.txt configuration
│   └── manifest.ts               # PWA manifest
│
├── components/                   # React Components
│   ├── features/                 # Feature-based components
│   │   ├── conversion/           # Currency conversion feature
│   │   │   ├── AmountInput.tsx
│   │   │   ├── ConversionForm.tsx
│   │   │   ├── ConversionFormSkeleton.tsx
│   │   │   ├── ConversionResult.tsx
│   │   │   ├── CurrencySelect.tsx
│   │   │   └── index.ts          # Barrel export
│   │   └── history/              # Historical data feature
│   │       ├── HistoryChart.tsx
│   │       ├── HistoryRangeSelector.tsx
│   │       └── index.ts
│   │
│   ├── layout/                   # Layout components
│   │   ├── Footer.tsx
│   │   ├── HeaderSection.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── index.ts
│   │
│   ├── shared/                   # Shared utility components
│   │   ├── InfoTooltip.tsx
│   │   └── index.ts
│   │
│   └── ui/                       # Reusable UI components
│       ├── ErrorAlert.tsx
│       ├── FooterText.tsx
│       ├── InfoAlert.tsx
│       ├── RefreshButton.tsx
│       └── index.ts
│
├── hooks/                        # Custom React Hooks
│   ├── index.ts
│   ├── useConversion.ts          # Currency conversion logic
│   ├── useCurrencies.ts          # Currency list management
│   ├── useHistoricalData.ts      # Historical data fetching
│   └── useMounted.ts             # Client-side mount detection
│
├── lib/                          # Business logic and utilities
│   ├── exchange/                 # Exchange API integration
│   │   ├── cache.ts              # In-memory caching system
│   │   ├── frankfurter.ts        # Frankfurter API client
│   │   └── types.ts              # Type definitions
│   ├── constants.ts              # Application constants
│   ├── locale-context.tsx        # Internationalization context
│   ├── metadata.ts               # SEO metadata configuration
│   ├── openapi-spec.ts           # OpenAPI specification
│   ├── page-translations.ts      # Translation helpers
│   ├── seo.ts                    # SEO utilities
│   └── utils.ts                  # Utility functions
│
├── messages/                     # Internationalization
│   ├── en.json                   # English translations
│   └── es.json                   # Spanish translations
│
├── styles/                       # Global styles
│   └── theme.ts                  # Mantine theme configuration
│
└── types/                        # TypeScript type definitions
    └── currency.ts               # Currency-related types
```

## Architecture Principles

### Feature-Based Organization

Components are organized by feature rather than by type, improving code cohesion and making it easier to understand related functionality. Each feature module is self-contained with its own components and exports.

### Atomic Component Design

Components follow a hierarchical structure:

- **UI Components**: Basic, reusable building blocks (buttons, alerts, inputs)
- **Shared Components**: Utilities used across multiple features (tooltips, icons)
- **Layout Components**: Structural elements (header, footer, navigation)
- **Feature Components**: Business logic-specific components (conversion form, history chart)

### Barrel Exports

Each component directory includes an `index.ts` file that exports all public components, enabling clean imports and better encapsulation.

```typescript
// Clean import using barrel export
import { ThemeToggle, Footer } from '@/components/layout';

// Instead of
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Footer } from '@/components/layout/Footer';
```

### Custom Hooks Pattern

Business logic and side effects are extracted into custom hooks, separating concerns and improving reusability and testability.

### Strong TypeScript Typing

All code is written in TypeScript with strict mode enabled. Interfaces and types are well-defined, improving code quality and developer experience.

## Naming Conventions

- **Components**: PascalCase (e.g., `ConversionForm.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useConversion.ts`)
- **Utilities**: camelCase (e.g., `formatCurrency`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_CURRENCY`)
- **Types/Interfaces**: PascalCase (e.g., `CurrencyOption`)

## Caching System

The application implements a sophisticated in-memory caching system:

- Time-to-Live (TTL) per resource type
- Stale-while-revalidate pattern for resilience
- Automatic cache invalidation
- No external cache dependencies

## API Integration

The Frankfurter API integration is abstracted through a clean interface:

- Type-safe API responses
- Error handling and retries
- Automatic caching
- Rate limiting awareness

## State Management

State is managed through a combination of:

- React hooks for local component state
- Context API for global state (theme, locale)
- Custom hooks for shared business logic
- No external state management library needed

## Internationalization

Multi-language support is implemented using next-intl:

- English and Spanish translations
- Dynamic locale switching
- Type-safe translation keys
- Server and client components support

## SEO Strategy

Comprehensive SEO implementation:

- Complete metadata in `lib/metadata.ts`
- Structured data (JSON-LD) for WebApplication and FAQ
- Dynamic sitemap and robots.txt
- Open Graph and Twitter Cards
- PWA manifest for installability

## Performance Optimizations

- Server Components by default
- Client Components only where necessary
- Dynamic imports for code splitting
- Image optimization
- Bundle size optimization with package imports
- HTTP caching headers on API routes

---

**Back to README**: [README.md](./README.md)
