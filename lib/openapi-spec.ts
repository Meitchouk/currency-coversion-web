type Locale = 'en' | 'es';

const translations = {
  en: {
    title: 'Currency Converter API',
    description: 'Free and open API for real-time currency conversion and historical exchange rates. Powered by Frankfurter API.',
    tags: {
      conversion: { name: 'Conversion', description: 'Currency conversion operations' },
      currencies: { name: 'Currencies', description: 'Available currencies information' },
      historical: { name: 'Historical', description: 'Historical exchange rates data' },
      rates: { name: 'Rates', description: 'Current exchange rates' },
    },
    currencies: {
      summary: 'Get available currencies',
      description: 'Returns a list of all available currencies with their codes and names.',
      responses: {
        200: 'Successful response',
        500: 'Server error',
      },
      example: [
        { value: 'USD', label: 'USD - United States Dollar' },
        { value: 'EUR', label: 'EUR - Euro' },
        { value: 'GBP', label: 'GBP - British Pound Sterling' },
      ],
    },
    convert: {
      summary: 'Convert currency',
      description: 'Converts an amount from one currency to another using real-time exchange rates.',
      params: {
        from: 'Source currency code (ISO 4217)',
        to: 'Target currency code (ISO 4217)',
        amount: 'Amount to convert',
      },
      responses: {
        200: 'Successful conversion',
        400: 'Invalid parameters',
        500: 'Conversion error',
      },
      properties: {
        from: 'Source currency code',
        to: 'Target currency code',
        amount: 'Original amount',
        result: 'Converted amount',
        rate: 'Exchange rate used',
        timestamp: 'Time of conversion',
      },
    },
    history: {
      summary: 'Get historical exchange rates',
      description: 'Returns historical exchange rates between two currencies for a specified number of days.',
      params: {
        from: 'Source currency code (ISO 4217)',
        to: 'Target currency code (ISO 4217)',
        days: 'Number of days of historical data (default: 90, max: 365)',
      },
      responses: {
        200: 'Successful response',
        400: 'Invalid parameters',
        500: 'Server error',
      },
      properties: {
        date: 'Date of the rate',
        rate: 'Exchange rate for that date',
      },
    },
    rates: {
      summary: 'Get current exchange rates',
      description: 'Returns current exchange rates from a base currency to all other currencies.',
      params: {
        base: 'Base currency code (ISO 4217). Defaults to EUR.',
      },
      responses: {
        200: 'Successful response',
        500: 'Server error',
      },
      properties: {
        base: 'Base currency code',
        date: 'Date of the rates',
        rates: 'Exchange rates for all currencies',
      },
    },
    errors: {
      missingParams: 'Missing required parameters',
      fetchCurrencies: 'Failed to fetch currencies',
      convertCurrency: 'Failed to convert currency',
      fetchHistory: 'Failed to fetch historical rates',
      fetchRates: 'Failed to fetch current rates',
    },
  },
  es: {
    title: 'API del Conversor de Divisas',
    description: 'API gratuita y abierta para conversión de divisas en tiempo real y tasas de cambio históricas. Desarrollada con Frankfurter API.',
    tags: {
      conversion: { name: 'Conversión', description: 'Operaciones de conversión de divisas' },
      currencies: { name: 'Monedas', description: 'Información de monedas disponibles' },
      historical: { name: 'Histórico', description: 'Datos históricos de tasas de cambio' },
      rates: { name: 'Tasas', description: 'Tasas de cambio actuales' },
    },
    currencies: {
      summary: 'Obtener monedas disponibles',
      description: 'Retorna una lista de todas las monedas disponibles con sus códigos y nombres.',
      responses: {
        200: 'Respuesta exitosa',
        500: 'Error del servidor',
      },
      example: [
        { value: 'USD', label: 'USD - Dólar Estadounidense' },
        { value: 'EUR', label: 'EUR - Euro' },
        { value: 'GBP', label: 'GBP - Libra Esterlina' },
      ],
    },
    convert: {
      summary: 'Convertir moneda',
      description: 'Convierte una cantidad de una moneda a otra usando tasas de cambio en tiempo real.',
      params: {
        from: 'Código de moneda origen (ISO 4217)',
        to: 'Código de moneda destino (ISO 4217)',
        amount: 'Cantidad a convertir',
      },
      responses: {
        200: 'Conversión exitosa',
        400: 'Parámetros inválidos',
        500: 'Error de conversión',
      },
      properties: {
        from: 'Código de moneda origen',
        to: 'Código de moneda destino',
        amount: 'Cantidad original',
        result: 'Cantidad convertida',
        rate: 'Tasa de cambio utilizada',
        timestamp: 'Hora de conversión',
      },
    },
    history: {
      summary: 'Obtener tasas de cambio históricas',
      description: 'Retorna tasas de cambio históricas entre dos monedas para un número específico de días.',
      params: {
        from: 'Código de moneda origen (ISO 4217)',
        to: 'Código de moneda destino (ISO 4217)',
        days: 'Número de días de datos históricos (predeterminado: 90, máximo: 365)',
      },
      responses: {
        200: 'Respuesta exitosa',
        400: 'Parámetros inválidos',
        500: 'Error del servidor',
      },
      properties: {
        date: 'Fecha de la tasa',
        rate: 'Tasa de cambio para esa fecha',
      },
    },
    rates: {
      summary: 'Obtener tasas de cambio actuales',
      description: 'Retorna tasas de cambio actuales desde una moneda base a todas las demás monedas.',
      params: {
        base: 'Código de moneda base (ISO 4217). Predeterminado: EUR.',
      },
      responses: {
        200: 'Respuesta exitosa',
        500: 'Error del servidor',
      },
      properties: {
        base: 'Código de moneda base',
        date: 'Fecha de las tasas',
        rates: 'Tasas de cambio para todas las monedas',
      },
    },
    errors: {
      missingParams: 'Faltan parámetros requeridos',
      fetchCurrencies: 'Error al cargar las monedas',
      convertCurrency: 'Error al convertir moneda',
      fetchHistory: 'Error al cargar tasas históricas',
      fetchRates: 'Error al cargar tasas actuales',
    },
  },
};

export const getOpenApiSpec = (locale: Locale = 'en') => {
  const t = translations[locale];

  return {
    openapi: '3.0.0',
    info: {
      title: t.title,
      version: '1.0.0',
      description: t.description,
      contact: {
        name: 'API Support',
        url: 'https://github.com/Meitchouk/currency-coversion-web',
      },
    },
    servers: [
      {
        url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        description: locale === 'en' ? 'Current server' : 'Servidor actual',
      },
    ],
    tags: [
      { name: t.tags.conversion.name, description: t.tags.conversion.description },
      { name: t.tags.currencies.name, description: t.tags.currencies.description },
      { name: t.tags.historical.name, description: t.tags.historical.description },
      { name: t.tags.rates.name, description: t.tags.rates.description },
    ],
    paths: {
      '/api/currencies': {
        get: {
          tags: [t.tags.currencies.name],
          summary: t.currencies.summary,
          description: t.currencies.description,
          responses: {
            '200': {
              description: t.currencies.responses['200'],
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        value: {
                          type: 'string',
                          description: locale === 'en' ? 'Currency code (ISO 4217)' : 'Código de moneda (ISO 4217)',
                          example: 'USD',
                        },
                        label: {
                          type: 'string',
                          description: locale === 'en' ? 'Currency code and name' : 'Código y nombre de moneda',
                          example: locale === 'en' ? 'USD - United States Dollar' : 'USD - Dólar Estadounidense',
                        },
                      },
                    },
                  },
                  example: t.currencies.example,
                },
              },
            },
            '500': {
              description: t.currencies.responses['500'],
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: { type: 'string', example: t.errors.fetchCurrencies },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/convert': {
        get: {
          tags: [t.tags.conversion.name],
          summary: t.convert.summary,
          description: t.convert.description,
          parameters: [
            {
              name: 'from',
              in: 'query',
              required: true,
              description: t.convert.params.from,
              schema: { type: 'string', example: 'USD' },
            },
            {
              name: 'to',
              in: 'query',
              required: true,
              description: t.convert.params.to,
              schema: { type: 'string', example: 'EUR' },
            },
            {
              name: 'amount',
              in: 'query',
              required: true,
              description: t.convert.params.amount,
              schema: { type: 'number', minimum: 0, example: 100 },
            },
          ],
          responses: {
            '200': {
              description: t.convert.responses['200'],
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      from: { type: 'string', description: t.convert.properties.from, example: 'USD' },
                      to: { type: 'string', description: t.convert.properties.to, example: 'EUR' },
                      amount: { type: 'number', description: t.convert.properties.amount, example: 100 },
                      result: { type: 'number', description: t.convert.properties.result, example: 92.5 },
                      rate: { type: 'number', description: t.convert.properties.rate, example: 0.925 },
                      timestamp: { type: 'string', format: 'date-time', description: t.convert.properties.timestamp, example: '2025-12-31T12:00:00Z' },
                    },
                  },
                },
              },
            },
            '400': {
              description: t.convert.responses['400'],
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { error: { type: 'string', example: t.errors.missingParams } },
                  },
                },
              },
            },
            '500': {
              description: t.convert.responses['500'],
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { error: { type: 'string', example: t.errors.convertCurrency } },
                  },
                },
              },
            },
          },
        },
      },
      '/api/history': {
        get: {
          tags: [t.tags.historical.name],
          summary: t.history.summary,
          description: t.history.description,
          parameters: [
            {
              name: 'from',
              in: 'query',
              required: true,
              description: t.history.params.from,
              schema: { type: 'string', example: 'USD' },
            },
            {
              name: 'to',
              in: 'query',
              required: true,
              description: t.history.params.to,
              schema: { type: 'string', example: 'EUR' },
            },
            {
              name: 'days',
              in: 'query',
              required: false,
              description: t.history.params.days,
              schema: { type: 'number', minimum: 1, maximum: 365, default: 90, example: 30 },
            },
          ],
          responses: {
            '200': {
              description: t.history.responses['200'],
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        date: { type: 'string', format: 'date', description: t.history.properties.date, example: '2025-12-31' },
                        rate: { type: 'number', description: t.history.properties.rate, example: 0.925 },
                      },
                    },
                  },
                  example: [
                    { date: '2025-12-31', rate: 0.925 },
                    { date: '2025-12-30', rate: 0.923 },
                    { date: '2025-12-29', rate: 0.928 },
                  ],
                },
              },
            },
            '400': {
              description: t.history.responses['400'],
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { error: { type: 'string', example: t.errors.missingParams } },
                  },
                },
              },
            },
            '500': {
              description: t.history.responses['500'],
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { error: { type: 'string', example: t.errors.fetchHistory } },
                  },
                },
              },
            },
          },
        },
      },
      '/api/rates': {
        get: {
          tags: [t.tags.rates.name],
          summary: t.rates.summary,
          description: t.rates.description,
          parameters: [
            {
              name: 'base',
              in: 'query',
              required: false,
              description: t.rates.params.base,
              schema: { type: 'string', default: 'EUR', example: 'USD' },
            },
          ],
          responses: {
            '200': {
              description: t.rates.responses['200'],
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      base: { type: 'string', description: t.rates.properties.base, example: 'USD' },
                      date: { type: 'string', format: 'date', description: t.rates.properties.date, example: '2025-12-31' },
                      rates: {
                        type: 'object',
                        description: t.rates.properties.rates,
                        additionalProperties: { type: 'number' },
                        example: { EUR: 0.925, GBP: 0.795, JPY: 149.23 },
                      },
                    },
                  },
                },
              },
            },
            '500': {
              description: t.rates.responses['500'],
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { error: { type: 'string', example: t.errors.fetchRates } },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Currency: {
          type: 'object',
          properties: {
            value: { type: 'string', description: locale === 'en' ? 'Currency code (ISO 4217)' : 'Código de moneda (ISO 4217)' },
            label: { type: 'string', description: locale === 'en' ? 'Currency code and name' : 'Código y nombre de moneda' },
          },
        },
        ConversionResult: {
          type: 'object',
          properties: {
            from: { type: 'string', description: t.convert.properties.from },
            to: { type: 'string', description: t.convert.properties.to },
            amount: { type: 'number', description: t.convert.properties.amount },
            result: { type: 'number', description: t.convert.properties.result },
            rate: { type: 'number', description: t.convert.properties.rate },
            timestamp: { type: 'string', format: 'date-time', description: t.convert.properties.timestamp },
          },
        },
        HistoricalRate: {
          type: 'object',
          properties: {
            date: { type: 'string', format: 'date', description: t.history.properties.date },
            rate: { type: 'number', description: t.history.properties.rate },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', description: locale === 'en' ? 'Error message' : 'Mensaje de error' },
          },
        },
      },
    },
  };
};
