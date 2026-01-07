'use client';

import { Grid, Button, Tooltip, Transition } from '@mantine/core';
import { IconArrowsLeftRight } from '@tabler/icons-react';
import { CurrencySelect } from './CurrencySelect';
import { AmountInput } from './AmountInput';
import { InfoTooltip } from '@/components/shared';
import { CurrencyOption } from '@/types/currency';
import { ANIMATION_DURATION, TRANSITIONS } from '@/lib/constants';
import { isValidAmount } from '@/lib/utils';

interface ConversionFormProps {
  fromCurrency: string | null;
  toCurrency: string | null;
  amount: number | string;
  currencies: CurrencyOption[];
  translations: {
    from: string;
    to: string;
    amount: string;
    swap: string;
    convert: string;
    selectCurrency: string;
    enterAmount: string;
    swapTooltip: string;
  };
  mounted: boolean;
  disabled?: boolean;
  onFromCurrencyChange: (value: string | null) => void;
  onToCurrencyChange: (value: string | null) => void;
  onAmountChange: (value: number | string) => void;
  onSwap: () => void;
  onConvert?: () => void;
}

export function ConversionForm({
  fromCurrency,
  toCurrency,
  amount,
  currencies,
  translations,
  mounted,
  disabled = false,
  onFromCurrencyChange,
  onToCurrencyChange,
  onAmountChange,
  onSwap,
  onConvert,
}: ConversionFormProps) {
  return (
    <Transition 
      mounted={mounted} 
      transition={TRANSITIONS.SLIDE_UP} 
      duration={ANIMATION_DURATION.HEADER} 
      timingFunction="ease"
    >
      {(styles) => (
        <Grid gutter="md" style={styles}>
          <Grid.Col span={{ base: 12, sm: 5 }}>
            <CurrencySelect
              value={fromCurrency}
              onChange={onFromCurrencyChange}
              currencies={currencies}
              label={
                <>
                  <InfoTooltip translationKey="tooltips.fromCurrency" />
                  {translations.from}
                </>
              }
              placeholder={translations.selectCurrency}
              disabled={disabled}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 2 }} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <Tooltip 
              label={translations.swapTooltip} 
              multiline 
              w={280}
              withArrow
              transitionProps={{ duration: 200 }}
              position="top"
            >
              <Button
                variant="default"
                onClick={onSwap}
                fullWidth
                leftSection={<IconArrowsLeftRight size={18} />}
                disabled={!fromCurrency || !toCurrency || disabled}
                style={{ transition: 'all 0.2s ease' }}
              >
                {translations.swap}
              </Button>
            </Tooltip>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 5 }}>
            <CurrencySelect
              value={toCurrency}
              onChange={onToCurrencyChange}
              currencies={currencies}
              label={
                <>
                  <InfoTooltip translationKey="tooltips.toCurrency" />
                  {translations.to}
                </>
              }
              placeholder={translations.selectCurrency}
              disabled={disabled}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <AmountInput
              value={amount}
              onChange={onAmountChange}
              label={
                <>
                  <InfoTooltip translationKey="tooltips.amount" />
                  {translations.amount}
                </>
              }
              placeholder={translations.enterAmount}
              disabled={disabled}
            />
          </Grid.Col>
          {onConvert && (
            <Grid.Col span={12}>
              <Button
                onClick={onConvert}
                fullWidth
                disabled={disabled || !fromCurrency || !toCurrency || !isValidAmount(amount)}
              >
                {translations.convert}
              </Button>
            </Grid.Col>
          )}
        </Grid>
      )}
    </Transition>
  );
}
