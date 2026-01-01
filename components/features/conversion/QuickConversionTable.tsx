'use client';

import { Paper, Text, Table, Stack, Card, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { formatCurrency } from '@/lib/utils';
import { useLocale } from '@/lib/locale-context';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

const messages = { en, es };

interface QuickConversionTableProps {
  from: string;
  to: string;
  rate: number;
  reverse?: boolean;
}

// Valores predefinidos para la tabla
const PRESET_VALUES = [1, 5, 10, 20, 50, 100, 250, 500, 1000, 2000, 5000, 10000];
const MOBILE_PRESET_VALUES = [10, 20, 50, 100, 250];

export function QuickConversionTable({ from, to, rate, reverse = false }: QuickConversionTableProps) {
  const { locale } = useLocale();
  const t = messages[locale];
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Si es reverso, intercambiamos las monedas y el rate
  const sourceCurrency = reverse ? to : from;
  const targetCurrency = reverse ? from : to;
  const conversionRate = reverse ? (1 / rate) : rate;

  const rows = PRESET_VALUES.map((value) => {
    const result = value * conversionRate;
    return (
      <Table.Tr key={value}>
        <Table.Td>
          <Text fw={500}>
            {formatCurrency(value)} {sourceCurrency}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text c="blue" fw={600}>
            {formatCurrency(result)} {targetCurrency}
          </Text>
        </Table.Td>
      </Table.Tr>
    );
  });

  const title = reverse 
    ? t.quickConversion.titleReverse.replace('{from}', targetCurrency).replace('{to}', sourceCurrency)
    : t.quickConversion.title.replace('{from}', sourceCurrency).replace('{to}', targetCurrency);

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={700} ta="center">
          {title}
        </Text>
        {isMobile ? (
          // Mobile: Grid layout with limited values
          <Stack gap="xs">
            {MOBILE_PRESET_VALUES.map((value) => {
              const result = value * conversionRate;
              return (
                <Card key={value} p="xs" radius="md" withBorder>
                  <Group justify="space-between" align="center">
                    <Text fw={500} size="sm">
                      {formatCurrency(value)} {sourceCurrency}
                    </Text>
                    <Text c="blue" fw={600} size="sm">
                      {formatCurrency(result)} {targetCurrency}
                    </Text>
                  </Group>
                </Card>
              );
            })}
          </Stack>
        ) : (
          // Desktop: Table layout
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{sourceCurrency}</Table.Th>
                <Table.Th>{targetCurrency}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Stack>
    </Paper>
  );
}
