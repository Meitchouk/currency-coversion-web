'use client';

import { Paper, Text, Group, Stack, Badge, Skeleton, Transition } from '@mantine/core';
import { IconArrowRight, IconClock } from '@tabler/icons-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ANIMATION_DURATION } from '@/lib/constants';
import { useLocale } from '@/lib/locale-context';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

const messages = { en, es };

interface ConversionResultProps {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  timestamp?: Date | string;
  loading?: boolean;
}

export function ConversionResult({
  from,
  to,
  amount,
  result,
  rate,
  timestamp,
  loading = false,
}: ConversionResultProps) {
  const { locale } = useLocale();
  const t = messages[locale];

  if (loading) {
    return (
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Stack gap="md">
          <Skeleton height={32} width="60%" />
          <Skeleton height={24} width="80%" />
          <Skeleton height={20} width="40%" />
        </Stack>
      </Paper>
    );
  }

  const formattedTimestamp = timestamp ? formatDate(timestamp) : 'N/A';

  return (
    <Transition mounted={!loading} transition="fade" duration={ANIMATION_DURATION.SLOW} timingFunction="ease">
      {(styles) => (
        <Paper shadow="sm" p="lg" radius="md" withBorder style={styles}>
          <Stack gap="md">
            <Text size="sm" c="dimmed" mb={-8}>
              {t.conversion.result.replace('{amount}', formatCurrency(amount)).replace('{from}', from)}
            </Text>
            <Group gap="xs" align="center">
              <IconArrowRight size={24} style={{ transition: 'transform 0.3s ease' }} />
              <Text size="xl" fw={700} c="blue" style={{ transition: 'all 0.3s ease' }}>
                {formatCurrency(result)} {to}
              </Text>
            </Group>

            <Group gap="xs">
              <Badge variant="light" size="lg" style={{ transition: 'all 0.3s ease' }}>
                {t.conversion.rate.replace('{from}', from).replace('{rate}', rate.toFixed(6)).replace('{to}', to)}
              </Badge>
            </Group>

            <Group gap="xs">
              <IconClock size={16} style={{ opacity: 0.6 }} />
              <Text size="xs" c="dimmed">
                {t.conversion.lastUpdated.replace('{date}', formattedTimestamp)}
              </Text>
            </Group>
          </Stack>
        </Paper>
      )}
    </Transition>
  );
}
