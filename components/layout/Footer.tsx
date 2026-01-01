'use client';

import { Container, Group, Text, Anchor, Divider, Stack, ActionIcon, Tooltip, Grid, Paper } from '@mantine/core';
import { IconBrandGithub, IconMail, IconBook, IconApi, IconInfoCircle, IconChartLine, IconWorld } from '@tabler/icons-react';
import Link from 'next/link';
import { useLocale } from '@/lib/locale-context';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

const messages = { en, es };

export function Footer() {
  const { locale } = useLocale();
  const t = messages[locale];

  const footerLinks = {
    developer: {
      label: locale === 'en' ? 'Developer' : 'Desarrollador',
      links: [
        { label: 'GitHub', href: 'https://github.com/Meitchouk', icon: IconBrandGithub },
        { label: 'Email', href: 'mailto:dev.lanzamarat@gmail.com', icon: IconMail },
      ],
    },
    project: {
      label: locale === 'en' ? 'Project' : 'Proyecto',
      links: [
        { label: locale === 'en' ? 'Repository' : 'Repositorio', href: 'https://github.com/Meitchouk/currency-coversion-web', icon: IconBrandGithub },
        { label: locale === 'en' ? 'API Documentation' : 'Documentación API', href: '/api-docs', icon: IconBook },
      ],
    },
    resources: {
      label: locale === 'en' ? 'Data Sources' : 'Fuentes de Datos',
      links: [
        { label: 'Frankfurter API', href: 'https://www.frankfurter.app/', icon: IconApi },
        { label: locale === 'en' ? 'European Central Bank' : 'Banco Central Europeo', href: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html', icon: IconWorld },
      ],
    },
    about: {
      label: locale === 'en' ? 'About' : 'Acerca de',
      links: [
        { label: locale === 'en' ? 'About This App' : 'Sobre esta App', icon: IconInfoCircle },
        { label: locale === 'en' ? 'Exchange Rates Info' : 'Info Tasas de Cambio', icon: IconChartLine },
      ],
    },
  };

  return (
    <footer style={{ marginTop: 'auto', borderTop: '1px solid var(--mantine-color-gray-3)', backgroundColor: 'var(--mantine-color-body)' }}>
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Main Footer Content */}
          <Grid gutter="xl">
            {/* About Section */}
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Stack gap="md">
                <Group gap="xs">
                  <IconInfoCircle size={20} style={{ opacity: 0.8 }} />
                  <Text size="sm" fw={700}>{footerLinks.about.label}</Text>
                </Group>
                <Text size="xs" c="dimmed" style={{ lineHeight: 1.6 }}>
                  {locale === 'en'
                    ? 'Free currency converter with real-time exchange rates and historical data. Powered by reliable financial data sources.'
                    : 'Conversor de divisas gratuito con tasas de cambio en tiempo real y datos históricos. Impulsado por fuentes de datos financieros confiables.'}
                </Text>
              </Stack>
            </Grid.Col>

            {/* Developer Info */}
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Stack gap="sm">
                <Text size="sm" fw={700} mb={4}>{footerLinks.developer.label}</Text>
                <Stack gap="xs">
                  {footerLinks.developer.links.map((link) => (
                    <Group key={link.label} gap="xs">
                      <link.icon size={16} style={{ opacity: 0.6 }} />
                      <Anchor
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="sm"
                        c="dimmed"
                        style={{ fontWeight: 500 }}
                      >
                        {link.label}
                      </Anchor>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </Grid.Col>

            {/* Project Info */}
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Stack gap="sm">
                <Text size="sm" fw={700} mb={4}>{footerLinks.project.label}</Text>
                <Stack gap="xs">
                  {footerLinks.project.links.map((link) => (
                    <Group key={link.label} gap="xs">
                      <link.icon size={16} style={{ opacity: 0.6 }} />
                      {link.href.startsWith('/') ? (
                        <Anchor
                          component={Link}
                          href={link.href}
                          size="sm"
                          c="dimmed"
                          style={{ fontWeight: 500 }}
                        >
                          {link.label}
                        </Anchor>
                      ) : (
                        <Anchor
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="sm"
                          c="dimmed"
                          style={{ fontWeight: 500 }}
                        >
                          {link.label}
                        </Anchor>
                      )}
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </Grid.Col>

            {/* Resources Info */}
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Stack gap="sm">
                <Text size="sm" fw={700} mb={4}>{footerLinks.resources.label}</Text>
                <Stack gap="xs">
                  {footerLinks.resources.links.map((link) => (
                    <Group key={link.label} gap="xs">
                      <link.icon size={16} style={{ opacity: 0.6 }} />
                      <Anchor
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="sm"
                        c="dimmed"
                        style={{ fontWeight: 500 }}
                      >
                        {link.label}
                      </Anchor>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </Grid.Col>
          </Grid>

          {/* Info Box */}
          <Paper p="md" radius="md" withBorder>
            <Group gap="xs" mb="xs">
              <IconChartLine size={18} style={{ opacity: 0.7 }} />
              <Text size="sm" fw={600}>
                {locale === 'en' ? 'About Exchange Rates' : 'Sobre las Tasas de Cambio'}
              </Text>
            </Group>
            <Text size="xs" c="dimmed" style={{ lineHeight: 1.6 }}>
              {locale === 'en'
                ? 'Exchange rates are updated daily and sourced from the European Central Bank. Historical data is available for analysis and comparison. Rates may vary slightly from those offered by banks and exchange services due to fees and margins.'
                : 'Las tasas de cambio se actualizan diariamente y provienen del Banco Central Europeo. Los datos históricos están disponibles para análisis y comparación. Las tasas pueden variar ligeramente de las ofrecidas por bancos y servicios de cambio debido a tarifas y márgenes.'}
            </Text>
          </Paper>

          <Divider />

          {/* Bottom Bar */}
          <Group justify="space-between" align="center" wrap="wrap">
            <Text size="xs" c="dimmed">
              © {new Date().getFullYear()} {t.app.title} • {locale === 'en' ? 'Built with' : 'Desarrollado con'} Next.js & Mantine
            </Text>
            <Group gap="xs">
              <Tooltip label="GitHub Profile" withArrow>
                <ActionIcon
                  component="a"
                  href="https://github.com/Meitchouk"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  color="gray"
                  size="lg"
                >
                  <IconBrandGithub size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Email" withArrow>
                <ActionIcon
                  component="a"
                  href="mailto:dev.lanzamarat@gmail.com"
                  variant="light"
                  color="gray"
                  size="lg"
                >
                  <IconMail size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label={locale === 'en' ? 'API Documentation' : 'Documentación API'} withArrow>
                <ActionIcon
                  component={Link}
                  href="/api-docs"
                  variant="light"
                  color="blue"
                  size="lg"
                >
                  <IconBook size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Stack>
      </Container>
    </footer>
  );
}
