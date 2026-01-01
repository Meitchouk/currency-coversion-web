'use client';

import { useEffect, useState } from 'react';
import { ActionIcon, Menu, Tooltip, Box } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { useLocale } from '@/lib/locale-context';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

const messages = { en, es };

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const [mounted, setMounted] = useState(false);
  const [opened, setOpened] = useState(false);
  const t = messages[locale];

  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Render placeholder during SSR/hydration
  if (!mounted) {
    return (
      <ActionIcon
        variant="default"
        size="lg"
        aria-label="Change language"
        style={{ 
          transition: 'all 0.3s ease',
          opacity: 0.5,
        }}
      >
        <IconLanguage size={20} />
      </ActionIcon>
    );
  }

  return (
    <Menu 
      shadow="md" 
      width={200} 
      position="bottom-end" 
      withArrow
      opened={opened}
      onChange={setOpened}
    >
      <Tooltip 
        label={t.language.label} 
        position="bottom"
        withArrow
        disabled={opened}
        transitionProps={{ duration: 200 }}
      >
        <Box>
          <Menu.Target>
            <ActionIcon
              variant="default"
              size="lg"
              aria-label={t.language.label}
              styles={{
                root: {
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }
              }}
            >
              <IconLanguage size={20} />
            </ActionIcon>
          </Menu.Target>
        </Box>
      </Tooltip>

      <Menu.Dropdown>
        <Menu.Label>{t.language.label}</Menu.Label>
        <Menu.Item
          onClick={() => setLocale('en')}
          style={{
            fontWeight: locale === 'en' ? 'bold' : 'normal',
            backgroundColor: locale === 'en' ? 'var(--mantine-color-blue-light)' : 'transparent',
          }}
        >
          🇺🇸 {t.language.english}
        </Menu.Item>
        <Menu.Item
          onClick={() => setLocale('es')}
          style={{
            fontWeight: locale === 'es' ? 'bold' : 'normal',
            backgroundColor: locale === 'es' ? 'var(--mantine-color-blue-light)' : 'transparent',
          }}
        >
          🇪🇸 {t.language.spanish}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
