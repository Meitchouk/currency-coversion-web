'use client';

import { Box, Title, Text, Transition } from '@mantine/core';
import { ANIMATION_DURATION, TRANSITIONS } from '@/lib/constants';

interface HeaderSectionProps {
  title: string;
  subtitle: string;
  mounted: boolean;
}

export function HeaderSection({ title, subtitle, mounted }: HeaderSectionProps) {
  return (
    <Transition 
      mounted={mounted} 
      transition={TRANSITIONS.FADE} 
      duration={ANIMATION_DURATION.HEADER} 
      timingFunction="ease"
    >
      {(styles) => (
        <Box ta="center" style={styles}>
          <Title order={1} size="h1" mb="xs">
            {title}
          </Title>
          <Text c="dimmed" size="lg">
            {subtitle}
          </Text>
        </Box>
      )}
    </Transition>
  );
}
