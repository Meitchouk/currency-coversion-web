'use client';

import { Paper, Text, Table, Stack, Grid, Badge } from '@mantine/core';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import { useLocale } from '@/lib/locale-context';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

const messages = { en, es };
// Helper to get period label based on days
function getPeriodKey(days: number): string {
  switch(days) {
    case 7: return 'last7Days';
    case 30: return 'last30Days';
    case 90: return 'last90Days';
    case 180: return 'last6Months';
    case 365: return 'last1Year';
    default: return 'lastNDays';
  }
}

function getDescriptionKey(days: number): string {
  switch(days) {
    case 7: return 'description7';
    case 30: return 'description30';
    case 90: return 'description90';
    case 180: return 'description180';
    case 365: return 'description365';
    default: return 'descriptionN';
  }
}
interface HistoryStatisticsProps {
  from: string;
  to: string;
  data: Array<{ date: string; rate: number }>;
  days: number;
}

interface Stats {
  max: number;
  min: number;
  avg: number;
  fluctuation: string;
  fluctuationValue: number;
  trend: 'up' | 'down' | 'stable';
}

function calculateStats(data: Array<{ date: string; rate: number }>): Stats {
  if (data.length === 0) {
    return { max: 0, min: 0, avg: 0, fluctuation: '0.00%', fluctuationValue: 0, trend: 'stable' };
  }

  const rates = data.map(d => d.rate);
  const max = Math.max(...rates);
  const min = Math.min(...rates);
  const avg = rates.reduce((a, b) => a + b, 0) / rates.length;
  const fluctuationValue = ((max - min) / min) * 100;
  
  // Determinar tendencia: comparar primera mitad vs segunda mitad
  const midPoint = Math.floor(rates.length / 2);
  const firstHalfAvg = rates.slice(0, midPoint).reduce((a, b) => a + b, 0) / midPoint;
  const secondHalfAvg = rates.slice(midPoint).reduce((a, b) => a + b, 0) / (rates.length - midPoint);
  
  let trend: 'up' | 'down' | 'stable' = 'stable';
  const trendDiff = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
  if (Math.abs(trendDiff) > 0.5) {
    trend = trendDiff > 0 ? 'up' : 'down';
  }

  return {
    max,
    min,
    avg,
    fluctuation: `${fluctuationValue.toFixed(2)}%`,
    fluctuationValue,
    trend
  };
}

export function HistoryStatistics({ from, to, data, days }: HistoryStatisticsProps) {
  const { locale } = useLocale();
  const t = messages[locale];
  
  const stats = calculateStats(data);
  
  const periodKey = getPeriodKey(days);
  const descriptionKey = getDescriptionKey(days);

  const title = t.statistics.title
    .replace('{from}', from)
    .replace('{to}', to);

  const description = (t.statistics as Record<string, string>)[descriptionKey] || t.statistics.descriptionN;

  const formattedDescription = description
    .replace('{from}', from)
    .replace('{to}', to)
    .replace('{days}', days.toString())
    .replace('{max}', `${stats.max.toFixed(4)} ${to}`)
    .replace('{min}', `${stats.min.toFixed(4)} ${to}`)
    .replace('{avg}', `${stats.avg.toFixed(4)} ${to}`)
    .replace('{fluctuation}', stats.fluctuation);

  const period = (t.statistics as Record<string, string>)[periodKey] || t.statistics.lastNDays.replace('{days}', days.toString());

  if (data.length === 0) {
    return null;
  }

  const getTrendBadge = () => {
    if (stats.trend === 'up') {
      return (
        <Badge color="blue" variant="light" leftSection={<IconTrendingUp size={14} />}>
          {t.statistics.trending} {t.statistics.up}
        </Badge>
      );
    } else if (stats.trend === 'down') {
      return (
        <Badge color="orange" variant="light" leftSection={<IconTrendingDown size={14} />}>
          {t.statistics.trending} {t.statistics.down}
        </Badge>
      );
    }
    return (
      <Badge color="gray" variant="light">
        {t.statistics.stable}
      </Badge>
    );
  };

  return (
    <Paper shadow="sm" p={{ base: 'sm', sm: 'md' }} radius="md" withBorder>
      <Stack gap="md">
        <Stack gap={4}>
          <Text size="lg" fw={700}>
            {title}
          </Text>
          {getTrendBadge()}
        </Stack>

        <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Table withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th colSpan={2} style={{ textAlign: 'center', fontWeight: 700 }}>
                    {period}
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td fw={500}>
                    {t.statistics.maximum}
                  </Table.Td>
                  <Table.Td>
                    <Text span c="dimmed" size="sm">1.00 {from} = </Text>
                    <Text span fw={700} c="blue" size="md">{stats.max.toFixed(4)} {to}</Text>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>
                    {t.statistics.minimum}
                  </Table.Td>
                  <Table.Td>
                    <Text span c="dimmed" size="sm">1.00 {from} = </Text>
                    <Text span fw={700} c="blue" size="md">{stats.min.toFixed(4)} {to}</Text>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>
                    {t.statistics.average}
                  </Table.Td>
                  <Table.Td>
                    <Text span c="dimmed" size="sm">1.00 {from} = </Text>
                    <Text span fw={700} c="blue" size="md">{stats.avg.toFixed(4)} {to}</Text>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>
                    {t.statistics.fluctuation}
                  </Table.Td>
                  <Table.Td>
                    <Text fw={600} c={stats.fluctuationValue > 5 ? "orange" : "gray"}>
                      {stats.fluctuation}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Paper p="md" radius="md" withBorder style={{ height: '100%' }}>
              <Text size="sm" c="dimmed">
                {formattedDescription}
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}
