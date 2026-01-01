'use client';

import { useState } from 'react';
import { Container, Stack, Box, Grid } from '@mantine/core';
import { SettingsMenu, HeaderSection } from '@/components/layout';
import { InfoAlert, ErrorAlert, RefreshButton, FooterText, CustomLoader } from '@/components/ui';
import { ConversionFormSkeleton, ConversionForm, ConversionResult, QuickConversionTable, MultiCurrencyComparator } from '@/components/features/conversion';
import { HistoryRangeSelector, HistoryChart } from '@/components/features/history';
import { useCurrencies, useConversion, useHistoricalData, useMounted } from '@/hooks';
import { DEFAULTS } from '@/lib/constants';
import { useLocale } from '@/lib/locale-context';
import { 
  getConversionFormTranslations, 
  getRefreshButtonTranslations, 
  getHistoryRangeSelectorTranslations 
} from '@/lib/page-translations';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

const messages = { en, es };

export default function HomePage() {
  const { locale } = useLocale();
  const t = messages[locale];
  
  // State management
  const [fromCurrency, setFromCurrency] = useState<string | null>(DEFAULTS.FROM_CURRENCY);
  const [toCurrency, setToCurrency] = useState<string | null>(DEFAULTS.TO_CURRENCY);
  const [amount, setAmount] = useState<number | string>(DEFAULTS.AMOUNT);
  const [historyDays, setHistoryDays] = useState<number>(DEFAULTS.HISTORY_DAYS);

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
    autoFetch: true,
  });

  const { 
    data: historicalData, 
    loading: historyLoading,
    refetch: refetchHistory 
  } = useHistoricalData({
    fromCurrency,
    toCurrency,
    days: historyDays,
    autoFetch: true,
  });

  // Animation state
  const mounted = useMounted();

  // Handlers
  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleRefresh = () => {
    convert();
    refetchHistory();
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

        {/* Conversion Form */}
        {currenciesLoading ? (
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

        {/* Quick Conversion Tables */}
        {conversion && conversion.rate && fromCurrency && toCurrency && (
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
        )}

        {/* Multi-Currency Comparator */}
        {currencies.length > 0 && (
          <MultiCurrencyComparator
            currencies={currencies}
            baseCurrency={fromCurrency || 'USD'}
            targetCurrencies={['EUR', 'GBP', 'JPY', 'CAD', 'AUD']}
            defaultAmount={100}
          />
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
          <>
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
          </>
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
