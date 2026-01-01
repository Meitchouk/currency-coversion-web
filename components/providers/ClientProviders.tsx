'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import { theme as baseTheme } from '@/styles/theme';
import { RingLoader } from '@/components/ui/RingLoader';

interface ClientProvidersProps {
  children: React.ReactNode;
}

// Extend the base theme with the custom loader
const extendedTheme = createTheme({
  ...baseTheme,
  components: {
    ...baseTheme.components,
    Loader: {
      defaultProps: {
        loaders: { ring: RingLoader },
        type: 'ring',
      },
    },
  },
});

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <MantineProvider theme={extendedTheme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
}
