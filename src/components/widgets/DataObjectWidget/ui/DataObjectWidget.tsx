'use client';

import { useState, useEffect } from 'react';
import { Table, Text, Input, Textarea } from '@mantine/core';
import { ObjectHeaderFeature } from '@/components/features/ObjectHeaderFeature';
import { ObjectSaverFeature } from '@/components/features/ObjectSaverFeature';
import { useLoadData } from '@/hooks/useLoadData';
import { DataContainerRow, DataResponse } from '@/types/data';
import { ObjectWrapper } from '@/components/shared/ObjectWrapper';

export const DataObjectWidget = ({ id }: { id: string }) => {
    const { data, loading, error } = useLoadData<DataResponse>(`https://api.intervals.ru/data/${id}`);

    // Локальное состояние для редактирования
    const [editedTitle, setEditedTitle] = useState<string>('');
    const [editedContainer, setEditedContainer] = useState<DataContainerRow[]>([]);
    const [editedInfo, setEditedInfo] = useState<string>('');

    // useEffect для установки состояния при загрузке данных
    useEffect(() => {
        if (data) {
            setEditedTitle(data.title);
            setEditedContainer(data.container || []);
            setEditedInfo(data.info || '');
        }
    }, [data]);

    const handleCellChange = (rowIndex: number, col: string, value: string) => {
        setEditedContainer((prev) => {
            const newContainer = [...prev];
            newContainer[rowIndex] = { ...newContainer[rowIndex], [col]: value };
            return newContainer;
        });
    };

    if (!data) {
        return <Text>Нет данных</Text>;
    }

    if (!data.container || data.container.length === 0) {
        return <Text>Нет данных для отображения</Text>;
    }

    // Получаем названия столбцов из первой строки контейнера
    const columns = Object.keys(data.container[0]);

    const headerRow = (
        <Table.Tr>
            {columns.map((col) => (
                <Table.Th key={col}>{col}</Table.Th>
            ))}
        </Table.Tr>
    );

    const rows = editedContainer.map((item, rowIndex) => (
        <Table.Tr key={rowIndex}>
            {columns.map((col) => (
                <Table.Td key={col}>
                    <Input
                        value={String(item[col])}
                        onChange={(e) => handleCellChange(rowIndex, col, e.target.value)}
                    />
                </Table.Td>
            ))}
        </Table.Tr>
    ));

    return (
        <ObjectWrapper error={error} loading={loading}>
            <ObjectHeaderFeature
                editedTitle={editedTitle}
                setEditedTitle={setEditedTitle}
                timeUpdate={data.time_update}
            />

            <Table stickyHeader stickyHeaderOffset={60}>
                <Table.Thead>{headerRow}</Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            <Textarea
                mt="md"
                label="Информация"
                value={editedInfo}
                onChange={(e) => setEditedInfo(e.currentTarget.value)}
                placeholder="Введите информацию"
            />

            <ObjectSaverFeature
                url={`https://api.intervals.ru/data/${id}`}
                body={{
                    title: editedTitle,
                    container: editedContainer,
                    info: editedInfo
                }}
            />
        </ObjectWrapper>
    );
};
