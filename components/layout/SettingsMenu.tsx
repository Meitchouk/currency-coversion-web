'use client';

import { ActionIcon, Group, Menu } from '@mantine/core';
import { IconSettings, IconLanguage, IconSun, IconMoon } from '@tabler/icons-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useMediaQuery } from '@mantine/hooks';
import { useLocale } from '@/lib/locale-context';
import { useMantineColorScheme } from '@mantine/core';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

const messages = { en, es };

export function SettingsMenu() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { locale, setLocale } = useLocale();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const t = messages[locale];

  // On desktop, show buttons inline
  if (!isMobile) {
    return (
      <Group gap="xs">
        <LanguageToggle />
        <ThemeToggle />
      </Group>
    );
  }

  const isDark = colorScheme === 'dark';
  const isEnglish = locale === 'en';

  // On mobile, show collapsible menu
  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="default" size="lg" aria-label="Settings">
          <IconSettings size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t.settings.menu}</Menu.Label>
        
        <Menu.Item
          leftSection={<IconLanguage size={16} />}
          rightSection={<span style={{ fontSize: '0.85em', opacity: 0.7 }}>{isEnglish ? 'EN' : 'ES'}</span>}
          onClick={() => setLocale(isEnglish ? 'es' : 'en')}
        >
          {t.settings.language}
        </Menu.Item>
        
        <Menu.Item
          leftSection={isDark ? <IconMoon size={16} /> : <IconSun size={16} />}
          rightSection={<span style={{ fontSize: '0.85em', opacity: 0.7 }}>{isDark ? t.theme.darkMode : t.theme.lightMode}</span>}
          onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
        >
          {t.settings.theme}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
