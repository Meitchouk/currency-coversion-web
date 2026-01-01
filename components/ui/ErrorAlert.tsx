'use client';

import { Alert, Transition } from '@mantine/core';
import { ANIMATION_DURATION, TRANSITIONS } from '@/lib/constants';

interface ErrorAlertProps {
  error: string | null;
  errorTitle: string;
  onClose?: () => void;
}

export function ErrorAlert({ error, errorTitle, onClose }: ErrorAlertProps) {
  return (
    <Transition 
      mounted={!!error} 
      transition={TRANSITIONS.SLIDE_DOWN} 
      duration={ANIMATION_DURATION.NORMAL} 
      timingFunction="ease"
    >
      {(styles) => (
        <Alert 
          color="red" 
          title={errorTitle} 
          onClose={onClose || (() => {})} 
          withCloseButton 
          style={styles}
        >
          {error}
        </Alert>
      )}
    </Transition>
  );
}
