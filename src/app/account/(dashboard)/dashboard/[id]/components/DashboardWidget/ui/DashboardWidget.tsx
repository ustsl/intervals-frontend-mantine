'use client';

import { useEffect, useState } from 'react';
import {
    Select,
    Title,
    Grid,
    Stack,
    Button,
} from '@mantine/core';
import { ObjectHeaderFeature } from '@/components/features/ObjectHeaderFeature';
import { ObjectSaverFeature } from '@/components/features/ObjectSaverFeature';
import { ObjectWrapper } from '@/components/shared/ObjectWrapper';
import { useLoadData } from '@/hooks/useLoadData';
import { ChartItemRelation, DashboardResponse, WidgetItemRelation } from '@/types/dashboard';
import { DashboardItem } from './components/DashboardItem';
import { useDebounce } from '@/hooks/useDebounce';
import { deleteItem, fetchOptions } from './func';



export const DashboardWidget = ({ id }: { id: string }) => {
    // Загрузка данных дашборда
    const { data, loading, error } = useLoadData<DashboardResponse>(`https://api.intervals.ru/dashboard/${id}`);
    const [editedTitle, setEditedTitle] = useState<string>('');

    // Локальные состояния для графиков и виджетов
    const [charts, setCharts] = useState<ChartItemRelation[]>([]);
    const [widgets, setWidgets] = useState<WidgetItemRelation[]>([]);

    // Состояния для добавления нового графика
    const [isAddingChart, setIsAddingChart] = useState<boolean>(false);
    const [newChartSearchTerm, setNewChartSearchTerm] = useState<string>('');
    const [newChartOptions, setNewChartOptions] = useState<{ value: string; label: string }[]>([]);
    const debouncedChartSearchTerm = useDebounce(newChartSearchTerm, 500);

    // Состояния для добавления нового виджета
    const [isAddingWidget, setIsAddingWidget] = useState<boolean>(false);
    const [newWidgetSearchTerm, setNewWidgetSearchTerm] = useState<string>('');
    const [newWidgetOptions, setNewWidgetOptions] = useState<{ value: string; label: string }[]>([]);
    const debouncedWidgetSearchTerm = useDebounce(newWidgetSearchTerm, 500);

    // При загрузке данных сразу устанавливаем существующие графики и виджеты
    useEffect(() => {
        if (data) {
            setEditedTitle(data.title);
            setCharts(
                data.charts?.map((chart) => ({
                    title: chart.title,
                    object_id: chart.id,
                    ordering: chart.ordering,
                })) ?? []
            );
            setWidgets(
                data.widgets?.map((widget) => ({
                    title: widget.title,
                    object_id: widget.id,
                    ordering: widget.ordering,
                })) ?? []
            );
        }
    }, [data]);

    // Запрос опций для нового графика при изменении поискового запроса с дебаунсом
    useEffect(() => {
        if (debouncedChartSearchTerm) {
            fetchOptions('chart', debouncedChartSearchTerm).then(setNewChartOptions);
        } else {
            setNewChartOptions([]);
        }
    }, [debouncedChartSearchTerm]);

    // Запрос опций для нового виджета при изменении поискового запроса с дебаунсом
    useEffect(() => {
        if (debouncedWidgetSearchTerm) {
            fetchOptions('widget', debouncedWidgetSearchTerm).then(setNewWidgetOptions);
        } else {
            setNewWidgetOptions([]);
        }
    }, [debouncedWidgetSearchTerm]);

    // Универсальная функция добавления элемента (графика или виджета)
    const handleAddItem = (
        type: 'chart' | 'widget',
        option: { value: string; label: string } | null
    ) => {
        if (!option) return;
        if (type === 'chart') {
            const newChart: ChartItemRelation = {
                title: option.label,
                object_id: option.value,
                ordering: charts.length + 1,
            };
            setCharts((prev) => [...prev, newChart]);
            setIsAddingChart(false);
            setNewChartSearchTerm('');
            setNewChartOptions([]);
        } else {
            const newWidget: WidgetItemRelation = {
                title: option.label,
                object_id: option.value,
                ordering: widgets.length + 1,
            };
            setWidgets((prev) => [...prev, newWidget]);
            setIsAddingWidget(false);
            setNewWidgetSearchTerm('');
            setNewWidgetOptions([]);
        }
    };

    return (
        <ObjectWrapper error={error} loading={loading}>
            {data && (
                <ObjectHeaderFeature
                    editedTitle={editedTitle}
                    setEditedTitle={setEditedTitle}
                    timeUpdate={data.time_update}
                />
            )}

            <Grid mt="md">
                <Grid.Col span={6}>
                    <Title order={4}>Графики</Title>
                    {charts.map((chart, index) => (
                        <DashboardItem
                            key={chart.object_id}
                            item={chart}
                            onDelete={() => deleteItem(setCharts, index)}
                        />
                    ))}

                    {isAddingChart ? (
                        <Stack gap="xs">
                            <Select
                                label="Выберите элемент"
                                placeholder="Нажмите для выбора"
                                data={newChartOptions}
                                searchable
                                nothingFoundMessage="Ничего не найдено"
                                clearable
                                onSearchChange={setNewChartSearchTerm}
                                onChange={(value, option) => handleAddItem('chart', option)}
                            />
                            <Button size="xs" onClick={() => setIsAddingChart(false)}>
                                Отмена
                            </Button>
                        </Stack>
                    ) : (
                        <Button size="xs" onClick={() => setIsAddingChart(true)}>
                            Добавить
                        </Button>
                    )}
                </Grid.Col>

                <Grid.Col span={6}>
                    <Title order={4} mb="xs">
                        Виджеты
                    </Title>
                    {widgets.map((widget, index) => (
                        <DashboardItem
                            key={widget.object_id}
                            item={widget}
                            onDelete={() => deleteItem(setWidgets, index)}
                        />
                    ))}

                    {isAddingWidget ? (
                        <Stack gap="xs">
                            <Select
                                label="Выберите элемент"
                                placeholder="Нажмите для выбора"
                                data={newWidgetOptions}
                                searchable
                                nothingFoundMessage="Ничего не найдено"
                                clearable
                                onSearchChange={setNewWidgetSearchTerm}
                                onChange={(_value, option) => handleAddItem('widget', option)}
                            />
                            <Button size="xs" onClick={() => setIsAddingWidget(false)}>
                                Отмена
                            </Button>
                        </Stack>
                    ) : (
                        <Button size="xs" onClick={() => setIsAddingWidget(true)}>
                            Добавить
                        </Button>
                    )}
                </Grid.Col>
            </Grid>

            {/* Сохранение дашборда */}
            <ObjectSaverFeature
                url={`https://api.intervals.ru/dashboard/${id}`}
                body={{
                    title: editedTitle,
                    charts,
                    widgets,
                }}
            />
        </ObjectWrapper>
    );
};
