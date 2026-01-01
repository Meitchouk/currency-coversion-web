'use client';

import { Tooltip, ActionIcon } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useLocale } from '@/lib/locale-context';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

const messages = { en, es };

interface InfoTooltipProps {
  translationKey: string;
  size?: number;
  position?: 'left' | 'right';
}

export function InfoTooltip({ 
  translationKey, 
  size = 14,
  position = 'left'
}: InfoTooltipProps) {
  const { locale } = useLocale();
  const t = messages[locale];
  
  // Navigate nested keys (e.g., "tooltips.amount")
  const getNestedValue = (obj: Record<string, unknown>, path: string): string => {
    return path.split('.').reduce((acc: unknown, part: string) => {
      return (acc as Record<string, unknown>)?.[part];
    }, obj as unknown) as string || '';
  };

  const tooltipText = getNestedValue(t as Record<string, unknown>, translationKey);

  return (
    <Tooltip 
      label={tooltipText}
      multiline 
      w={280}
      withArrow
      transitionProps={{ duration: 200 }}
      position="top"
    >
      <ActionIcon 
        variant="subtle" 
        color="gray" 
        size="xs"
        style={{ 
          display: 'inline-flex',
          verticalAlign: 'super',
          marginLeft: position === 'right' ? 4 : 0,
          marginRight: position === 'left' ? 4 : 0,
          cursor: 'help'
        }}
      >
        <IconInfoCircle size={size} />
      </ActionIcon>
    </Tooltip>
  );
}
