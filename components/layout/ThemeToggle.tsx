'use client';

import { useEffect, useState } from 'react';
import { ActionIcon, useMantineColorScheme, Tooltip } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useLocale } from '@/lib/locale-context';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

const messages = { en, es };

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { locale } = useLocale();
  const t = messages[locale];
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount on client
  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const isDark = colorScheme === 'dark';

  // Render placeholder during SSR/hydration to match server HTML
  if (!mounted) {
    return (
      <ActionIcon
        variant="default"
        size="lg"
        aria-label="Theme toggle"
        style={{ 
          transition: 'all 0.3s ease',
          transform: 'scale(1)',
          opacity: 0.5,
        }}
      >
        <div style={{ 
          transition: 'transform 0.3s ease',
        }}>
          <IconSun size={20} />
        </div>
      </ActionIcon>
    );
  }

  return (
    <Tooltip 
      label={isDark ? t.theme.light : t.theme.dark} 
      position="bottom"
      withArrow
      transitionProps={{ duration: 200 }}
    >
      <ActionIcon
        variant="default"
        size="lg"
        onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
        aria-label={isDark ? t.theme.lightMode : t.theme.darkMode}
        styles={{
          root: {
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }
        }}
      >
        <div style={{ 
          transition: 'transform 0.3s ease',
          transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
        }}>
          {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
        </div>
      </ActionIcon>
    </Tooltip>
  );
}
