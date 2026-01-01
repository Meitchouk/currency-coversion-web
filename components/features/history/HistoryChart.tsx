'use client';

import { useState } from 'react';
import { Paper, Text, Stack, Skeleton, Box, Transition, Group, Button, SegmentedControl, Tooltip } from '@mantine/core';
import { LineChart } from '@mantine/charts';
import { IconZoomIn, IconZoomOut, IconZoomReset } from '@tabler/icons-react';
import { formatDate } from '@/lib/utils';
import { ANIMATION_DURATION } from '@/lib/constants';
import { useLocale } from '@/lib/locale-context';
import { InfoTooltip } from '@/components/shared';
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import type { HistoricalRate } from '@/types/exchange';

const messages = { en, es };

interface HistoryChartProps {
  from: string;
  to: string;
  data: HistoricalRate[];
  loading?: boolean;
  days?: number;
}

export function HistoryChart({ from, to, data, loading = false, days = 90 }: HistoryChartProps) {
  const { locale } = useLocale();
  const t = messages[locale];
  const [chartHeight, setChartHeight] = useState(300);
  const [yAxisScale, setYAxisScale] = useState<'auto' | 'custom'>('custom');

  const handleZoomIn = () => setChartHeight(prev => Math.min(prev + 50, 600));
  const handleZoomOut = () => setChartHeight(prev => Math.max(prev - 50, 200));
  const handleZoomReset = () => {
    setChartHeight(300);
    setYAxisScale('custom');
  };

  if (loading) {
    return (
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Stack gap="md">
          <Skeleton height={28} width="50%" />
          <Skeleton height={40} width="100%" />
          <Box>
            <Skeleton height={300} />
          </Box>
          <Skeleton height={16} width="60%" mx="auto" />
        </Stack>
      </Paper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Text c="dimmed" ta="center">
          {t.chart.noData}
        </Text>
      </Paper>
    );
  }

  // Format data for chart
  const chartData = data.map(item => ({
    date: formatDate(item.date, 'MMM D'),
    rate: parseFloat(item.rate.toFixed(6)),
  }));

  // Calculate Y-axis domain for custom scale
  const rates = chartData.map(d => d.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const padding = (maxRate - minRate) * 0.1;
  const yDomain = yAxisScale === 'custom' 
    ? [minRate - padding, maxRate + padding] 
    : undefined;

  return (
    <Transition mounted={!loading} transition="slide-up" duration={ANIMATION_DURATION.CHART} timingFunction="ease">
      {(styles) => (
        <Paper shadow="sm" p="lg" radius="md" withBorder style={styles}>
          <Stack gap="md">
            <Group justify="space-between" wrap="wrap">
              <Text size="lg" fw={600} style={{ transition: 'all 0.3s ease' }}>
                {t.chart.title.replace('{from}', from).replace('{to}', to)}
              </Text>
              
              <Group gap="xs">
                <Tooltip label={t.tooltips.chartZoomOut} withArrow position="top">
                  <Button
                    size="xs"
                    variant="light"
                    onClick={handleZoomOut}
                    leftSection={<IconZoomOut size={16} />}
                    disabled={chartHeight <= 200}
                  >
                    {t.chart.zoomOut}
                  </Button>
                </Tooltip>
                {chartHeight !== 300 && (
                  <Tooltip label={t.tooltips.chartReset} withArrow position="top">
                    <Button
                      size="xs"
                      variant="light"
                      onClick={handleZoomReset}
                      leftSection={<IconZoomReset size={16} />}
                    >
                      {t.chart.reset}
                    </Button>
                  </Tooltip>
                )}
                <Tooltip label={t.tooltips.chartZoomIn} withArrow position="top">
                  <Button
                    size="xs"
                    variant="light"
                    onClick={handleZoomIn}
                    leftSection={<IconZoomIn size={16} />}
                    disabled={chartHeight >= 600}
                  >
                    {t.chart.zoomIn}
                  </Button>
                </Tooltip>
              </Group>
            </Group>

            {/* Y-Axis Scale Control */}
            <Group gap="xs" align="center">
              <Text size="xs" fw={500} c="dimmed">
                <InfoTooltip translationKey="tooltips.chartScale" size={12} />
                {t.chart.yAxisScale}
              </Text>
              <SegmentedControl
                size="xs"
                value={yAxisScale}
                onChange={(value) => setYAxisScale(value as 'auto' | 'custom')}
                data={[
                  { label: t.chart.scaleAuto, value: 'auto' },
                  { label: t.chart.scaleFit, value: 'custom' },
                ]}
              />
            </Group>
            
            <Box style={{ transition: 'height 0.3s ease' }}>
              <LineChart
                h={chartHeight}
                data={chartData}
                dataKey="date"
                series={[
                  { name: 'rate', color: 'blue.6', label: `${from} to ${to}` },
                ]}
                yAxisProps={yDomain ? { domain: yDomain } : undefined}
                curveType="monotone"
                withLegend
                withDots={data.length <= 30}
                gridAxis="xy"
                tickLine="xy"
                tooltipAnimationDuration={200}
                valueFormatter={(value) => value.toFixed(6)}
              />
            </Box>

            <Text size="xs" c="dimmed" ta="center">
              {t.chart.showing.replace('{days}', days.toString())}
            </Text>
          </Stack>
        </Paper>
      )}
    </Transition>
  );
}
