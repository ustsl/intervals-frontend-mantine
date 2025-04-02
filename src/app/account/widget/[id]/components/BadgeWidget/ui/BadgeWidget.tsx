'use client';

import { useEffect, useState } from 'react';
import { Grid, TextInput, NumberInput } from '@mantine/core';
import { ItemsEntitySelect } from '@/components/entities/ItemsEntity';
import { ObjectHeaderFeature } from '@/components/features/ObjectHeaderFeature';
import { ObjectSaverFeature, saveObject } from '@/components/features/ObjectSaverFeature';
import { ObjectWrapper } from '@/components/shared/ObjectWrapper';
import { useLoadData } from '@/hooks/useLoadData';

import { IItems } from '@/components/shared/CardList';

import { WidgetResponse } from '@/types/widget';
import { WidgetItemEntity } from '@/components/entities/WidgetItemEntity';

export const BadgeWidget = ({ id }: { id: string }) => {
    const { data, loading, error, refresh } = useLoadData<WidgetResponse>(`https://api.intervals.ru/widget/${id}`);

    const [selectedDataItem, setSelectedDataItem] = useState<null | IItems>(null);
    const [dataIsChanged, setDataIsChanged] = useState(false);
    const [editedTitle, setEditedTitle] = useState<string>('');
    const [dataColumn, setDataColumn] = useState<string>('');
    const [offsetForComparison, setOffsetForComparison] = useState<number>(0);

    // При загрузке данных устанавливаем заголовок и настройки
    useEffect(() => {
        if (data) {
            setEditedTitle(data.title);
            setDataColumn(data.data_column || '');
            setOffsetForComparison(data.offset_for_comparison || 0);
        }
    }, [data]);

    useEffect(() => {
        if (dataIsChanged) {
            const saveData = async () => {
                try {
                    await saveObject(`https://api.intervals.ru/widget/${id}`, {
                        data: selectedDataItem ? selectedDataItem.id : null,
                        data_column: dataColumn,
                        offset_for_comparison: offsetForComparison,
                    });
                } catch (err) {
                    console.error('Ошибка сохранения:', err);
                } finally {
                    setDataIsChanged(false);
                    refresh();
                }
            };

            saveData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataIsChanged, id, refresh, selectedDataItem]);

    if (!data) {
        return <></>;
    }

    return (
        <ObjectWrapper error={error} loading={loading}>
            <ObjectHeaderFeature
                editedTitle={editedTitle}
                setEditedTitle={setEditedTitle}
                timeUpdate={data.time_update}
            />

            <ItemsEntitySelect
                anchor="data"
                onClick={setSelectedDataItem}
                defaultId={data.data}
                setIsChanged={setDataIsChanged}
            />

            <Grid>
                {/* Левая колонка – настройки */}
                <Grid.Col span={5}>
                    <TextInput
                        label="Data Column"
                        value={dataColumn}
                        onChange={(e) => {
                            setDataColumn(e.currentTarget.value);
                        }}
                        placeholder="Введите имя столбца"
                    />
                    <NumberInput
                        mt="md"
                        label="Offset for Comparison"
                        value={offsetForComparison}
                        onChange={(value) => {
                            setOffsetForComparison(value as number || 0);
                        }}
                        placeholder="Введите оффсет"
                    />
                </Grid.Col>

                {/* Правая колонка – отображение графика */}
                <Grid.Col span={7}>
                    <WidgetItemEntity item={data} />
                </Grid.Col>
            </Grid>

            <ObjectSaverFeature
                url={`https://api.intervals.ru/widget/${id}`}
                body={{
                    title: editedTitle,
                    data: selectedDataItem ? selectedDataItem.id : null,
                    data_column: dataColumn,
                    offset_for_comparison: offsetForComparison,
                }}
            />
        </ObjectWrapper>
    );
};
