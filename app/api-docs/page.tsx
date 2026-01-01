'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Container, Title, Text, Stack, Group, Button, Paper, Grid } from '@mantine/core';
import { IconArrowLeft, IconBrandGithub } from '@tabler/icons-react';
import { useLocale } from '@/lib/locale-context';
import { LanguageToggle, ThemeToggle } from '@/components/layout';
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

const messages = { en, es };

// Suppress React lifecycle warnings from swagger-ui-react
const originalError = console.error;
if (typeof window !== 'undefined') {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('UNSAFE_componentWillReceiveProps')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
}

export default function ApiDocsPage() {
  const { locale } = useLocale();
  const t = messages[locale].apiDocs;
  const [spec, setSpec] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    import('@/lib/openapi-spec').then((module) => {
      setSpec(module.getOpenApiSpec(locale as 'en' | 'es'));
    });
  }, [locale]);

  if (!spec) {
    return (
      <Container size="xl" py="xl" style={{ textAlign: 'center', minHeight: '100vh' }}>
        <Text c="dimmed">{t.loading}</Text>
      </Container>
    );
  }

  return (
    <Container size="xl" py="md">
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between" align="flex-start" mb="xs">
          <div>
            <Title order={2} size="h3" mb={4}>{t.pageTitle}</Title>
            <Text c="dimmed" size="sm">{t.pageSubtitle}</Text>
          </div>
          
          <Group gap="xs">
            <ThemeToggle />
            <LanguageToggle />
            <Button
              component="a"
              href="/"
              variant="default"
              size="sm"
              leftSection={<IconArrowLeft size={16} />}
            >
              {t.backToApp}
            </Button>
            <Button
              component="a"
              href="https://github.com/Meitchouk/currency-coversion-web"
              target="_blank"
              rel="noopener noreferrer"
              variant="filled"
              color="dark"
              size="sm"
              leftSection={<IconBrandGithub size={16} />}
            >
              {t.github}
            </Button>
          </Group>
        </Group>

        {/* Info Cards */}
        <Grid gutter="sm">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper p="sm" withBorder radius="md" h="100%">
              <Group gap="xs" mb={4}>
                <Text size="sm" fw={600}>{t.aboutTitle}</Text>
              </Group>
              <Text size="xs" c="dimmed" style={{ lineHeight: 1.5 }}>{t.aboutText}</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper p="sm" withBorder radius="md" h="100%">
              <Group gap="xs" mb={4}>
                <Text size="sm" fw={600}>{t.rateLimitsTitle}</Text>
              </Group>
              <Text size="xs" c="dimmed" style={{ lineHeight: 1.5 }}>{t.rateLimitsText}</Text>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Swagger UI */}
        <Paper withBorder radius="md" p={0} mt="xs" className="swagger-container">
          <SwaggerUI spec={spec} />
        </Paper>
      </Stack>
    </Container>
  );
}
