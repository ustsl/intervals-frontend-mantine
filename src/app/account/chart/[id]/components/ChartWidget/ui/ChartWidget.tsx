'use client';

import { useEffect, useState } from 'react';
import { Grid } from '@mantine/core';
import { ItemsEntitySelect } from '@/components/entities/ItemsEntity';
import { ObjectHeaderFeature } from '@/components/features/ObjectHeaderFeature';
import { ObjectSaverFeature, saveObject } from '@/components/features/ObjectSaverFeature';
import { ObjectWrapper } from '@/components/shared/ObjectWrapper';
import { useLoadData } from '@/hooks/useLoadData';

import { IItems } from '@/components/shared/CardList';
import { ChartItemEntity } from '@/components/entities/ChartItemEntity';
import { ChartResponse } from '@/types/chart';
import { ChartSettingsComponent, useChartSettings } from './components/ChartSettingsComponent';


export const ChartWidget = ({ id }: { id: string }) => {
    const { data, loading, error, refresh } = useLoadData<ChartResponse>(`https://api.intervals.ru/chart/${id}`);

    const [selectedDataItem, setSelectedDataItem] = useState<null | IItems>(null);
    const [dataIsChanged, setDataIsChanged] = useState(false);
    const [editedTitle, setEditedTitle] = useState<string>('');

    const {
        settings: editedSettings,
        handleAxisXChange,
        handleAxisYChange,
        addAxisY,
        deleteAxisY,
        setSettings,
    } = useChartSettings({
        axisX: null,
        axisY: [],
    });

    // При загрузке данных устанавливаем заголовок и настройки
    useEffect(() => {
        if (data) {
            setEditedTitle(data.title);
            setSettings({
                axisX: data.settings?.axisX || '',
                axisY: data.settings?.axisY || [],
            });
        }
    }, [data, setSettings]);


    useEffect(() => {
        if (dataIsChanged) {
            const saveData = async () => {
                try {
                    await saveObject(`https://api.intervals.ru/chart/${id}`, {
                        title: editedTitle,
                        data: selectedDataItem ? selectedDataItem.id : null,
                        settings: editedSettings,
                    });
                } catch (err) {
                    console.error('Ошибка сохранения:', err);
                } finally {
                    setDataIsChanged(false);
                    refresh()
                }
            };

            saveData();
        }
    }, [dataIsChanged, id, editedTitle, selectedDataItem, editedSettings, refresh]);

    // Доступные поля из data_relation, если они есть
    const availableFields =
        data && data?.container && data.container.length > 0
            ? Object.keys(data.container[0]).map(key => ({ value: key, label: key }))
            : [];



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

            <ItemsEntitySelect anchor="data"
                onClick={setSelectedDataItem}
                defaultId={data.data}
                setIsChanged={setDataIsChanged} />

            <Grid>
                {/* Левая колонка – настройки */}
                <Grid.Col span={5}>
                    <ChartSettingsComponent
                        availableFields={availableFields}
                        editedSettings={editedSettings}
                        handleAxisXChange={handleAxisXChange}
                        handleAxisYChange={handleAxisYChange}
                        addAxisY={addAxisY}
                        deleteAxisY={deleteAxisY}
                    />
                </Grid.Col>

                {/* Правая колонка – отображение графика */}
                <Grid.Col span={7}>
                    <ChartItemEntity
                        chart={{ ...data, title: editedTitle, settings: editedSettings }}
                    />
                </Grid.Col>
            </Grid>

            <ObjectSaverFeature
                url={`https://api.intervals.ru/chart/${id}`}
                body={{
                    title: editedTitle,
                    data: selectedDataItem ? selectedDataItem.id : null,
                    settings: editedSettings,
                }}
            />
        </ObjectWrapper>
    );
};
