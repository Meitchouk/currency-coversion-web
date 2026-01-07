'use client';

import { useState, useEffect, useCallback } from 'react';
import { Alert, Button, Paper, Text, Table, Select, MultiSelect, NumberInput, Stack, Group, Badge, Card, Divider, Skeleton } from '@mantine/core';
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
  const [error, setError] = useState<string | null>(null);

  const currencyOptions = currencies.map((currency) => ({
    value: currency.code,
    label: `${currency.code} - ${currency.name}`,
  }));

  const fetchRates = useCallback(async () => {
    if (!selectedBase || selectedTargets.length === 0) {
      setRates({});
      setError(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const targetCodes = selectedTargets.join(',');
      const response = await fetch(`/api/rates?from=${selectedBase}&to=${targetCodes}`);
      
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      
      if (data.rates) {
        setRates(data.rates);
      } else {
        setRates({});
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
      setRates({});
      setError('No se pudieron cargar las tasas. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }, [selectedBase, selectedTargets]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const availableTargets = selectedTargets.filter(code => rates[code]);

  const rows = availableTargets.map((code) => {
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
          isMobile ? (
            // Mobile skeleton
            <Stack gap="xs">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} p="xs" radius="md" withBorder>
                  <Stack gap="xs">
                    <Group justify="space-between" align="center">
                      <Skeleton height={24} width={100} radius="md" />
                      <Skeleton height={24} width={100} radius="md" />
                    </Group>
                    <Divider my={0} />
                    <Group justify="space-between" align="center">
                      <Skeleton height={20} width={80} radius="md" />
                      <Skeleton height={20} width={120} radius="md" />
                    </Group>
                  </Stack>
                </Card>
              ))}
            </Stack>
          ) : (
            // Desktop skeleton
            <Table striped withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th><Skeleton height={20} radius="md" /></Table.Th>
                  <Table.Th><Skeleton height={20} radius="md" /></Table.Th>
                  <Table.Th><Skeleton height={20} radius="md" /></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Table.Tr key={i}>
                    <Table.Td><Skeleton height={24} radius="md" /></Table.Td>
                    <Table.Td><Skeleton height={24} radius="md" /></Table.Td>
                    <Table.Td><Skeleton height={24} radius="md" /></Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )
        ) : (
          <>
            {error && (
              <Alert color="red" title="Error" withCloseButton={false}>
                <Stack gap="sm">
                  <Text size="sm">{error}</Text>
                  <Button size="xs" variant="light" onClick={fetchRates}>
                    Reintentar
                  </Button>
                </Stack>
              </Alert>
            )}
            <Text size="sm" fw={500} style={{ color: 'var(--mantine-color-gray-6)' }}>
              {t.multiComparator.showing
                .replace('{amount}', formatCurrency(amount))
                .replace('{currency}', selectedBase)
                .replace('{count}', rows.length.toString())}
            </Text>

            {!error && selectedTargets.length > 0 && availableTargets.length === 0 && (
              <Text size="sm" fw={500} style={{ color: 'var(--mantine-color-gray-6)' }}>
                Sin resultados
              </Text>
            )}

            {isMobile ? (
              // Mobile: Cards layout
              <Stack gap="sm">
                {availableTargets.map((code) => {
                  const rate = rates[code];
                  
                  const result = amount * rate;
                  const currency = currencies.find(c => c.code === code);
                  
                  return (
                    <Card key={code} p="sm" radius="md" withBorder>
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
