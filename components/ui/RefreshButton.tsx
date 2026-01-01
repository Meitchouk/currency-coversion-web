'use client';

import { Group, Button, Tooltip, Transition, Loader } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { TRANSITIONS } from '@/lib/constants';

interface RefreshButtonProps {
  translations: {
    refresh: string;
    refreshing: string;
    tooltip: string;
  };
  mounted: boolean;
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function RefreshButton({
  translations,
  mounted,
  loading,
  disabled = false,
  onClick,
}: RefreshButtonProps) {
  return (
    <Transition 
      mounted={mounted} 
      transition={TRANSITIONS.FADE} 
      duration={800} 
      timingFunction="ease"
    >
      {(styles) => (
        <Group justify="center" style={styles}>
          <Tooltip 
            label={translations.tooltip} 
            multiline 
            w={280}
            withArrow
            transitionProps={{ duration: 200 }}
            position="top"
          >
            <Button
              variant="light"
              leftSection={loading ? <Loader size={18} /> : <IconRefresh size={18} />}
              onClick={onClick}
              disabled={disabled || loading}
              style={{ transition: 'all 0.2s ease' }}
            >
              {loading ? translations.refreshing : translations.refresh}
            </Button>
          </Tooltip>
        </Group>
      )}
    </Transition>
  );
}
