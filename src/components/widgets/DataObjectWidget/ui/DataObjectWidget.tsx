'use client';

import styles from './dataObjectWidget.module.css'

import { useState, useEffect } from 'react';
import {
    Table,
    Loader,
    Text,
    Stack,
    Flex,
    Badge,
    Input,
    Button,
} from '@mantine/core';
import { DataResponse } from '@/types/data';
import { fetchWithAuth } from '@/api/fetchWithAuth';
import { dateFormatter } from '@/functions/date';
import { notifications } from '@mantine/notifications';


type ContainerRow = Record<string, unknown>;

export const DataObjectWidget = ({ id }: { id: string }) => {
    const [data, setData] = useState<DataResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [editedTitle, setEditedTitle] = useState<string>('');
    const [editedContainer, setEditedContainer] = useState<ContainerRow[]>([]);
    const [saving, setSaving] = useState<boolean>(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    // Загружаем данные
    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetchWithAuth(`https://api.intervals.ru/data/${id}`);
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
                }
                const json: DataResponse = await response.json();
                setData(json);
                setEditedTitle(json.title);
                setEditedContainer(json.container || []);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Неизвестная ошибка');
                }
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id]);


    // Обработчик изменения ячейки таблицы
    const handleCellChange = (rowIndex: number, col: string, value: string) => {
        setEditedContainer((prev) => {
            const newContainer = [...prev];
            newContainer[rowIndex] = { ...newContainer[rowIndex], [col]: value };
            return newContainer;
        });
    };


    // Отправка изменений на сохранение через PATCH-запрос
    const handleSave = async () => {
        setSaving(true);
        setSaveError(null);
        try {
            const response = await fetchWithAuth(
                'https://api.intervals.ru/data/f215df3f-0359-4f10-ad11-d9423cf8e9c9',
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: editedTitle,
                        container: editedContainer,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error(`Ошибка сохранения: ${response.statusText}`);
            } else {
                notifications.show({
                    title: 'Успешно сохранено',
                    message: 'Контейнер успешно отредактирован',
                    color: 'green'
                });
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                setSaveError(err.message);

            } else {
                setSaveError('Неизвестная ошибка');

            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <Loader color="cyan" size="xl" type="dots" />;
    }

    if (error) {
        return <Text c="red">{error}</Text>;
    }

    if (!data) {
        return <Text>Нет данных</Text>;
    }

    // Если container отсутствует или пустой, выводим сообщение
    if (!data.container || data.container.length === 0) {
        return <Text>Нет данных для отображения</Text>;
    }

    // Получаем имена столбцов из ключей первого объекта
    const columns = Object.keys(data.container[0]);

    // Формируем строку заголовков таблицы
    const headerRow = (
        <Table.Tr>
            {columns.map((col) => (
                <Table.Th key={col}>{col}</Table.Th>
            ))}
        </Table.Tr>
    );

    // Формируем строки таблицы с возможностью редактирования
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
        <Stack>
            <Flex justify="space-between" align="center">
                <Input
                    className={styles.input}
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    size="xl"
                />
                <Badge color="pink">{dateFormatter(data.time_update)}</Badge>
            </Flex>
            <Table stickyHeader stickyHeaderOffset={60}>
                <Table.Thead>{headerRow}</Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            {saveError && <Text color="red">{saveError}</Text>}


            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                }}
            >
                <Button onClick={handleSave} loading={saving} fullWidth>
                    Сохранить
                </Button>
            </div>

        </Stack>
    );
};
