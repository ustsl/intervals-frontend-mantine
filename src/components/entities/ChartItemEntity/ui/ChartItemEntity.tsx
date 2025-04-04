'use client';

import { Badge, Flex, Stack, Text, Title } from '@mantine/core';
import { CompositeChart } from '@mantine/charts';
import { ChartResponse, } from '@/types/chart';
import { dateFormatter } from '@/functions/date';




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
    9: 'red.6'
};

export const ChartItemEntity = ({ chart }: { chart: ChartResponse }) => {

    const data = chart.container
    const settings = chart.settings

    if (!data) {
        return
    }

    // Определяем доступные поля из данных (ключи первого элемента)
    const availableFields = data && (data).length > 0 ? Object.keys(data[0]) : [];

    // Проверка: выбрана ось X и для каждой оси Y выбранное поле присутствует в данных
    const canRenderChart =
        settings &&
        settings.axisX &&
        settings.axisY &&
        settings.axisY.length > 0 &&
        availableFields.includes(settings.axisX) &&
        settings?.axisY &&
        settings.axisY.every(axis => availableFields.includes(axis.field));

    if (!canRenderChart) {
        return (
            <Stack align="center" justify="center" style={{ height: '100%' }}>
                <Text size="lg" c="dimmed">
                    Нет данных для графика или запрошенные поля отсутствуют
                </Text>
            </Stack>
        );
    }

    // Преобразуем данные: для каждого элемента создаём объект с ключом 'x' для оси X и значениями для осей Y
    const processedChartData = data.map(item => {
        const xValue = item[settings.axisX as string];
        const seriesValues = settings.axisY && settings.axisY.reduce<Record<string, number>>((acc, axis) => {
            acc[axis.field] = Number(item[axis.field]) || 0;
            return acc;
        }, {});
        return { x: xValue, ...seriesValues };
    });

    // Формируем серию для графика
    const series = settings.axisY && settings.axisY.map((axis, index) => ({
        type: axis.type,         // 'bar', 'line' или 'area'
        dataKey: axis.field,
        name: axis.field,
        color: colorMapping[index % 10],
        yAxisId: axis.side
    }));

    return (
        <>
            {series &&
                <Stack gap={'sm'}>
                    <Flex justify={'space-between'}>
                        <Title order={4}>{chart.title}</Title>
                        <Badge size="sm" color="pink">{dateFormatter(chart.time_update)}</Badge>
                    </Flex>

                    <CompositeChart
                        data={processedChartData}
                        dataKey={"x"}
                        series={series}
                        h={300}
                    />
                    {chart.info && <Text c="dark" size='sm'>{chart.info}</Text>}
                </Stack >
            }
        </>

    );
};
