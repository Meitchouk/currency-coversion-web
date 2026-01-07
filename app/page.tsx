'use client';

import { useEffect, useState } from 'react';
import { Container, Stack, Box, Grid, Paper, Text } from '@mantine/core';
import { SettingsMenu, HeaderSection } from '@/components/layout';
import { InfoAlert, ErrorAlert, RefreshButton, FooterText, CustomLoader } from '@/components/ui';
import { ConversionFormSkeleton, ConversionForm, ConversionResult, QuickConversionTable, MultiCurrencyComparator } from '@/components/features/conversion';
import { HistoryRangeSelector, HistoryChart, HistoryStatistics } from '@/components/features/history';
import { useCurrencies, useConversion, useHistoricalData, useMounted } from '@/hooks';
import { DEFAULTS } from '@/lib/constants';
import { useLocale } from '@/lib/locale-context';
import { safeJsonParse } from '@/lib/utils';
import {
  getConversionFormTranslations,
  getRefreshButtonTranslations,
  getHistoryRangeSelectorTranslations
} from '@/lib/page-translations';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

const messages = { en, es };
const STORAGE_KEY = 'currency-conversion:form-state';

type StoredFormState = {
  fromCurrency?: string | null;
  toCurrency?: string | null;
  amount?: number | string;
  historyDays?: number;
};

export default function HomePage() {
  const { locale } = useLocale();
  const t = messages[locale];

  // State management
  const [fromCurrency, setFromCurrency] = useState<string | null>(DEFAULTS.FROM_CURRENCY);
  const [toCurrency, setToCurrency] = useState<string | null>(DEFAULTS.TO_CURRENCY);
  const [amount, setAmount] = useState<number | string>(DEFAULTS.AMOUNT);
  const [historyDays, setHistoryDays] = useState<number>(DEFAULTS.HISTORY_DAYS);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [hasRestored, setHasRestored] = useState(false);

  // Custom hooks for data fetching
  const { currencies, loading: currenciesLoading, error: currenciesError } = useCurrencies();

  const {
    conversion,
    loading: conversionLoading,
    error: conversionError,
    convert
  } = useConversion({
    fromCurrency,
    toCurrency,
    amount,
    autoFetch: hasRestored,
  });

  const {
    data: historicalData,
    loading: historyLoading,
    refetch: refetchHistory
  } = useHistoricalData({
    fromCurrency,
    toCurrency,
    days: historyDays,
    autoFetch: hasRestored,
  });

  // Animation state
  const mounted = useMounted();

  useEffect(() => {
    if (hasRestored || currenciesLoading) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    if (!currencies.length) {
      setHasRestored(true);
      return;
    }

    const storedRaw = window.localStorage.getItem(STORAGE_KEY);
    if (!storedRaw) {
      setHasRestored(true);
      return;
    }

    const stored = safeJsonParse<StoredFormState>(storedRaw, {});
    const isValidCurrency = (code: string) =>
      currencies.some(currency => currency.code === code || currency.value === code);

    if (stored.fromCurrency && isValidCurrency(stored.fromCurrency)) {
      setFromCurrency(stored.fromCurrency);
    }

    if (stored.toCurrency && isValidCurrency(stored.toCurrency)) {
      setToCurrency(stored.toCurrency);
    }

    if (stored.amount !== undefined) {
      setAmount(stored.amount);
    }

    if (typeof stored.historyDays === 'number' && stored.historyDays > 0) {
      setHistoryDays(stored.historyDays);
    }

    setHasRestored(true);
  }, [currencies, currenciesLoading, hasRestored]);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasRestored) {
      return;
    }

    const payload: StoredFormState = {
      fromCurrency,
      toCurrency,
      amount,
      historyDays,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [amount, fromCurrency, historyDays, hasRestored, toCurrency]);

  // Handlers
  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleRefresh = () => {
    convert();
    refetchHistory();
    setRefreshKey(prev => prev + 1);
  };

  // Combined states
  const error = currenciesError || conversionError;
  const isLoading = conversionLoading || historyLoading;
  const hasActiveCurrencies = fromCurrency && toCurrency;

  // Translations
  const conversionFormTranslations = getConversionFormTranslations(t);
  const refreshButtonTranslations = getRefreshButtonTranslations(t);
  const historyRangeSelectorTranslations = getHistoryRangeSelectorTranslations(t);

  // Show full-page loader on initial load
  if (currenciesLoading && !currencies.length) {
    return (
      <Container size="lg" py="xl" pt={{ base: 80, sm: 'xl' }}>
        <Box pos="fixed" top={20} right={20} style={{ zIndex: 1000 }}>
          <SettingsMenu />
        </Box>

        <CustomLoader />
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl" pt={{ base: 80, sm: 'xl' }}>
      {/* Settings Toggle */}
      <Box pos="fixed" top={20} right={20} style={{ zIndex: 1000 }}>
        <SettingsMenu />
      </Box>

      <Stack gap="xl">
        {/* Header */}
        <HeaderSection
          title={t.app.title}
          subtitle={t.app.subtitle}
          mounted={mounted}
        />

        {/* Info Alert */}
        <InfoAlert
          title={t.alert.freeRealtime}
          message={t.alert.cacheInfo}
          mounted={mounted}
        />

        {/* Error Alert */}
        <ErrorAlert
          error={error}
          errorTitle={t.errors.generic}
        />

        {/* Main Conversion Section */}
        <Paper p="md" radius="md" >
          <Stack gap="md">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                {t.sections.conversion.title}
              </h2>
              <Text size="sm" c="dimmed">
                {t.sections.conversion.description}
              </Text>
            </div>
            {/* Conversion Form */}
            {currenciesLoading || !hasRestored ? (
              <ConversionFormSkeleton mounted={mounted} />
            ) : (
              <ConversionForm
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                amount={amount}
                currencies={currencies}
                translations={conversionFormTranslations}
                mounted={mounted}
                disabled={currenciesLoading}
                onFromCurrencyChange={setFromCurrency}
                onToCurrencyChange={setToCurrency}
                onAmountChange={setAmount}
                onSwap={swapCurrencies}
              />
            )}

            {/* Conversion Result */}
            {conversion && (
              <ConversionResult
                from={conversion.from}
                to={conversion.to}
                amount={conversion.amount}
                result={conversion.result}
                rate={conversion.rate}
                timestamp={conversion.timestamp}
                loading={conversionLoading}
              />
            )}
          </Stack>
        </Paper>

        {/* Quick Conversion Tables Section */}
        {conversion && conversion.rate && fromCurrency && toCurrency && (
          <Paper p="md" radius="md" >
            <Stack gap="md">
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {t.sections.quickRates.title}
                </h2>
                <Text size="sm" c="dimmed">
                  {t.sections.quickRates.description}
                </Text>
              </div>
              <Grid gutter="md">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <QuickConversionTable
                    from={fromCurrency}
                    to={toCurrency}
                    rate={conversion.rate}
                    reverse={false}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <QuickConversionTable
                    from={fromCurrency}
                    to={toCurrency}
                    rate={conversion.rate}
                    reverse={true}
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        )}

        {/* Refresh Button */}
        <RefreshButton
          translations={refreshButtonTranslations}
          mounted={mounted}
          loading={isLoading}
          disabled={!hasActiveCurrencies || currenciesLoading}
          onClick={handleRefresh}
        />

        {/* Historical Data Section */}
        {hasActiveCurrencies && (
          <Paper p="md" radius="md" >
            <Stack gap="md">
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {t.sections.history.title}
                </h2>
                <Text size="sm" c="dimmed">
                  {t.sections.history.description}
                </Text>
              </div>
              <HistoryRangeSelector
                value={historyDays}
                translations={historyRangeSelectorTranslations}
                mounted={mounted}
                disabled={historyLoading || currenciesLoading}
                onChange={setHistoryDays}
              />

              <HistoryChart
                from={fromCurrency}
                to={toCurrency}
                data={historicalData?.rates || []}
                loading={historyLoading}
                days={historyDays}
              />

              {/* Statistics */}
              {historicalData && historicalData.rates && historicalData.rates.length > 0 && (
                <HistoryStatistics
                  from={fromCurrency || ''}
                  to={toCurrency || ''}
                  data={historicalData.rates}
                  days={historyDays}
                />
              )}
            </Stack>
          </Paper>
        )}

        {/* Multi-Currency Comparator Section */}
        {currencies.length > 0 && (
          <Paper p="md" radius="md">
            <Stack gap="md">
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {t.sections.multiComparator.title}
                </h2>
                <Text size="sm" c="dimmed">
                  {t.sections.multiComparator.description}
                </Text>
              </div>
              <MultiCurrencyComparator
                key={refreshKey}
                currencies={currencies}
                baseCurrency={fromCurrency || 'USD'}
                targetCurrencies={['EUR', 'GBP', 'JPY', 'CAD', 'AUD']}
                defaultAmount={100}
              />
            </Stack>
          </Paper>
        )}

        {/* Footer Text */}
        <FooterText
          text={t.app.poweredBy}
          mounted={mounted}
        />
      </Stack>
    </Container>
  );
}
