'use client';

import { Grid, Paper, Skeleton, Stack, Transition } from '@mantine/core';
import { ANIMATION_DURATION, TRANSITIONS } from '@/lib/constants';

interface ConversionFormSkeletonProps {
  mounted: boolean;
}

export function ConversionFormSkeleton({ mounted }: ConversionFormSkeletonProps) {
  return (
    <Transition 
      mounted={mounted} 
      transition={TRANSITIONS.SLIDE_UP} 
      duration={ANIMATION_DURATION.HEADER} 
      timingFunction="ease"
    >
      {(styles) => (
        <Paper shadow="sm" p="lg" radius="md" withBorder style={styles}>
          <Stack gap="md">
            <Grid gutter="md">
              <Grid.Col span={{ base: 12, sm: 5 }}>
                <Skeleton height={36} width="100%" mb={5} />
                <Skeleton height={48} width="100%" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 2 }}>
                <Skeleton height={84} width="100%" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 5 }}>
                <Skeleton height={36} width="100%" mb={5} />
                <Skeleton height={48} width="100%" />
              </Grid.Col>
              <Grid.Col span={12}>
                <Skeleton height={36} width="100%" mb={5} />
                <Skeleton height={48} width="100%" />
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>
      )}
    </Transition>
  );
}
