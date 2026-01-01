'use client';

import { Paper, Stack, Text, SegmentedControl, Transition } from '@mantine/core';
import { InfoTooltip } from '@/components/shared';
import { ANIMATION_DURATION, TRANSITIONS } from '@/lib/constants';

interface HistoryRangeSelectorProps {
  value: number;
  translations: {
    label: string;
    '7days': string;
    '30days': string;
    '90days': string;
    '6months': string;
    '1year': string;
  };
  mounted: boolean;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export function HistoryRangeSelector({
  value,
  translations,
  mounted,
  disabled = false,
  onChange,
}: HistoryRangeSelectorProps) {
  return (
    <Transition 
      mounted={mounted} 
      transition={TRANSITIONS.FADE} 
      duration={ANIMATION_DURATION.NORMAL} 
      timingFunction="ease"
    >
      {(styles) => (
        <Paper shadow="sm" p="md" radius="md" withBorder style={styles}>
          <Stack gap="xs">
            <Text size="sm" fw={500} style={{ color: 'var(--mantine-color-gray-6)' }}>
              <InfoTooltip translationKey="tooltips.historyRange" />
              {translations.label}
            </Text>
            <SegmentedControl
              value={value.toString()}
              onChange={(val) => onChange(Number(val))}
              data={[
                { label: translations['7days'], value: '7' },
                { label: translations['30days'], value: '30' },
                { label: translations['90days'], value: '90' },
                { label: translations['6months'], value: '180' },
                { label: translations['1year'], value: '365' },
              ]}
              fullWidth
              disabled={disabled}
            />
          </Stack>
        </Paper>
      )}
    </Transition>
  );
}
