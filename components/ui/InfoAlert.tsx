'use client';

import { Alert, Transition } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { ANIMATION_DURATION, TRANSITIONS } from '@/lib/constants';

interface InfoAlertProps {
  title: string;
  message: string;
  mounted: boolean;
}

export function InfoAlert({ title, message, mounted }: InfoAlertProps) {
  return (
    <Transition 
      mounted={mounted} 
      transition={TRANSITIONS.SLIDE_DOWN} 
      duration={ANIMATION_DURATION.HEADER} 
      timingFunction="ease"
    >
      {(styles) => (
        <Alert 
          icon={<IconInfoCircle size={20} />} 
          title={title} 
          color="blue" 
          variant="light" 
          style={styles}
        >
          {message}
        </Alert>
      )}
    </Transition>
  );
}
