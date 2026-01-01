'use client';

import { useState, useEffect } from 'react';
import { Paper, Text, Table, Select, MultiSelect, NumberInput, Stack, Group, Badge, Loader, Card, Divider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconWorld } from '@tabler/icons-react';
import { formatCurrency } from '@/lib/utils';
import { useLocale } from '@/lib/locale-context';
import { Currency } from '@/types/currency';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

const messages = { en, es };

interface MultiCurrencyComparatorProps {
  currencies: Currency[];
  baseCurrency?: string;
  targetCurrencies?: string[];
  defaultAmount?: number;
}

// Monedas populares por defecto
const DEFAULT_TARGET_CURRENCIES = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

export function MultiCurrencyComparator({ 
  currencies, 
  baseCurrency = 'USD',
  targetCurrencies = DEFAULT_TARGET_CURRENCIES,
  defaultAmount = 100 
}: MultiCurrencyComparatorProps) {
  const { locale } = useLocale();
  const t = messages[locale];
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [selectedBase, setSelectedBase] = useState(baseCurrency);
  const [amount, setAmount] = useState(defaultAmount);
  const [selectedTargets, setSelectedTargets] = useState<string[]>(targetCurrencies);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  const currencyOptions = currencies.map((currency) => ({
    value: currency.code,
    label: `${currency.code} - ${currency.name}`,
  }));

  useEffect(() => {
    const fetchRates = async () => {
      if (!selectedBase || selectedTargets.length === 0) {
        setRates({});
        return;
      }
      
      setLoading(true);
      try {
        const targetCodes = selectedTargets.join(',');
        const response = await fetch(`/api/rates?from=${selectedBase}&to=${targetCodes}`);
        const data = await response.json();
        
        if (data.rates) {
          setRates(data.rates);
        }
      } catch (error) {
        console.error('Error fetching rates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBase, selectedTargets.join(',')]); // Use join to compare array values

  const rows = selectedTargets
    .filter(code => rates[code]) // Solo mostrar monedas con tasa disponible
    .map((code) => {
      const rate = rates[code];
      const result = amount * rate;
      const currency = currencies.find(c => c.code === code);
      
      return (
        <Table.Tr key={code}>
          <Table.Td>
            <Group gap="sm">
              <Badge variant="light" color="blue" size="lg" w={65} ta="center" fw={600} style={{ fontSize: '0.875rem' }}>
                {code}
              </Badge>
              <Text size="sm" fw={500}>{currency?.name || code}</Text>
            </Group>
          </Table.Td>
          <Table.Td>
            <Text fw={600} c="blue" size="md" ta="left">
              {formatCurrency(amount)} {selectedBase} = {formatCurrency(result)} {code}
            </Text>
          </Table.Td>
          <Table.Td>
            <Text size="sm" fw={500} style={{ color: 'var(--mantine-color-gray-6)' }}>
              1 {selectedBase} = {rate.toFixed(4)} {code}
            </Text>
          </Table.Td>
        </Table.Tr>
      );
    });

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Group gap="xs">
            <IconWorld size={24} />
            <Text size="lg" fw={700}>
              {t.multiComparator.title}
            </Text>
          </Group>
        </Group>

        <Group gap="md" grow>
          <Select
            label={t.multiComparator.baseCurrency}
            placeholder={t.form.selectCurrency}
            data={currencyOptions}
            value={selectedBase}
            onChange={(value) => value && setSelectedBase(value)}
            searchable
            maxDropdownHeight={300}
          />
          <NumberInput
            label={t.multiComparator.amount}
            placeholder={t.form.enterAmount}
            value={amount}
            onChange={(value) => setAmount(Number(value) || 0)}
            min={0}
            decimalScale={2}
            thousandSeparator=","
            hideControls
          />
        </Group>

        <MultiSelect
          label={t.multiComparator.targetCurrencies}
          placeholder={t.multiComparator.selectTargets}
          data={currencyOptions.filter(opt => opt.value !== selectedBase)}
          value={selectedTargets}
          onChange={setSelectedTargets}
          searchable
          maxDropdownHeight={300}
          clearable
        />

        {loading ? (
          <Group justify="center" py="xl">
            <Loader size="md" />
          </Group>
        ) : (
          <>
            <Text size="sm" fw={500} style={{ color: 'var(--mantine-color-gray-6)' }}>
              {t.multiComparator.showing
                .replace('{amount}', formatCurrency(amount))
                .replace('{currency}', selectedBase)
                .replace('{count}', rows.length.toString())}
            </Text>
            
            {isMobile ? (
              // Mobile: Cards layout
              <Stack gap="sm">
                {selectedTargets.map((code) => {
                  const rate = rates[code];
                  if (!rate) return null;
                  
                  const result = amount * rate;
                  const currency = currencies.find(c => c.code === code);
                  
                  return (
                    <Card key={code} p="sm" radius="md" withBorder style={{ backgroundColor: 'var(--mantine-color-dark-7)' }}>
                      <Stack gap="xs">
                        <Group justify="space-between" align="center">
                          <Group gap="xs">
                            <Badge variant="light" color="blue" size="lg" w={65} ta="center" fw={600} style={{ fontSize: '0.875rem' }}>
                              {code}
                            </Badge>
                            <Text size="sm" fw={500}>{currency?.name || code}</Text>
                          </Group>
                        </Group>
                        
                        <Divider my={0} />
                        
                        <Stack gap={6}>
                          <Group justify="space-between" align="center">
                            <Text size="xs" fw={500} style={{ color: 'var(--mantine-color-gray-6)' }}>
                              {t.multiComparator.equivalence}:
                            </Text>
                            <Text fw={600} c="blue" size="sm">
                              {formatCurrency(amount)} {selectedBase} = {formatCurrency(result)} {code}
                            </Text>
                          </Group>
                          
                          <Group justify="space-between" align="center">
                            <Text size="xs" fw={500} style={{ color: 'var(--mantine-color-gray-6)' }}>
                              {t.multiComparator.rate}:
                            </Text>
                            <Text size="xs" fw={500} style={{ color: 'var(--mantine-color-gray-6)' }}>
                              1 {selectedBase} = {rate.toFixed(4)} {code}
                            </Text>
                          </Group>
                        </Stack>
                      </Stack>
                    </Card>
                  );
                })}
              </Stack>
            ) : (
              // Desktop: Table layout
              <Table striped highlightOnHover withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t.multiComparator.currency}</Table.Th>
                    <Table.Th>{t.multiComparator.equivalence}</Table.Th>
                    <Table.Th>{t.multiComparator.rate}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            )}
          </>
        )}
      </Stack>
    </Paper>
  );
}
