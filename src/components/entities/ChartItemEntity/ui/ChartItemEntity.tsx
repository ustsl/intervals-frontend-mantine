'use client';

import { Badge, Flex, Stack, Text, Title } from '@mantine/core';
import { CompositeChart } from '@mantine/charts';
import { ChartResponse } from '@/types/chart';
import { dateFormatter } from '@/functions/date';
import { SimpleTable } from '@/components/shared/SimpleTable';

const colorMapping: Record<number, string> = {
  0: 'blue.6',
  1: 'violet.6',
  2: 'teal.6',
  3: 'orange.6',
  4: 'cyan.6',
  5: 'pink.6',
  6: 'gray.6',
  7: 'indigo.6',
  8: 'grape.6',
  9: 'red.6',
};

export const ChartItemEntity = ({ chart }: { chart: ChartResponse }) => {
  const data = chart.container;
  const settings = chart.settings;

  if (!data) return null;

  // Определяем список доступных полей из первой строки данных
  const availableFields = data.length > 0 ? Object.keys(data[0]) : [];

  // Проверяем, что выбраны ось X и для каждой оси Y выбранное поле присутствует в данных
  const canRenderChart =
    settings?.axisX &&
    settings?.axisY &&
    availableFields.includes(settings.axisX) &&
    settings.axisY.every((axis) => availableFields.includes(axis.field));

  if (!canRenderChart) {
    return (
      <Stack align="center" justify="center" style={{ height: '100%' }}>
        <Text size="lg" color="dimmed">
          Нет данных для графика или запрошенные поля отсутствуют
        </Text>
      </Stack>
    );
  }

  // Обрабатываем данные для CompositeChart
  const processedChartData = data.map((item) => {
    const xValue = item[settings.axisX as string];
    const seriesValues = settings.axisY
      ? settings.axisY.reduce<Record<string, number>>((acc, axis) => {
        acc[axis.field] = Number(item[axis.field]) || 0;
        return acc;
      }, {})
      : {};
    return { x: xValue, ...seriesValues };
  });

  const series = settings.axisY ? settings.axisY.map((axis, index) => ({
    type: axis.type,
    dataKey: axis.field,
    name: axis.field,
    color: colorMapping[index % 10],
    yAxisId: axis.side,
  })) : [];

  return (
    <Stack gap="sm">
      <Flex justify="space-between">
        <Title order={4}>{chart.title}</Title>
        <Badge size="sm" color="pink">
          {dateFormatter(chart.time_update)}
        </Badge>
      </Flex>
      {(!settings?.axisY || settings.axisY.length === 0) ?
        <SimpleTable data={data} /> :
        <CompositeChart data={processedChartData} dataKey="x" series={series} h={300} />
      }

      {chart.info && <Text color="dark" size="sm">{chart.info}</Text>}
    </Stack>
  );
};
