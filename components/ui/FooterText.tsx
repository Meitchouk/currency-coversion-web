'use client';

import { Box, Text, Transition } from '@mantine/core';
import { ANIMATION_DURATION, TRANSITIONS } from '@/lib/constants';

interface FooterTextProps {
  text: string;
  mounted: boolean;
}

export function FooterText({ text, mounted }: FooterTextProps) {
  return (
    <Transition 
      mounted={mounted} 
      transition={TRANSITIONS.FADE} 
      duration={ANIMATION_DURATION.FOOTER} 
      timingFunction="ease"
    >
      {(styles) => (
        <Box ta="center" mt="xl" style={styles}>
          <Text size="sm" c="dimmed">
            {text}
          </Text>
        </Box>
      )}
    </Transition>
  );
}
