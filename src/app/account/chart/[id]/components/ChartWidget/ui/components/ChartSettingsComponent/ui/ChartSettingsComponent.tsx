'use client';

import React from 'react';
import { Title, Select, Button, Stack, Flex, ActionIcon } from '@mantine/core';
import { IconLibraryPlus, IconBackspace } from '@tabler/icons-react';
import { AxisY, ChartSettings } from '@/types/chart';

interface ChartSettingsProps {
    availableFields: { value: string; label: string }[];
    editedSettings: ChartSettings;
    handleAxisXChange: (value: string) => void;
    handleAxisYChange: (index: number, key: keyof AxisY, value: string) => void;
    addAxisY: () => void;
    deleteAxisY: (index: number) => void;
}

export const ChartSettingsComponent: React.FC<ChartSettingsProps> = ({
    availableFields,
    editedSettings,
    handleAxisXChange,
    handleAxisYChange,
    addAxisY,
    deleteAxisY,
}) => {
    return (
        <Stack mt="md">
            <Title order={4}>Настройки диаграммы</Title>
            <Title order={5}>Ось X</Title>
            <Select
                placeholder="Ось X"
                value={editedSettings.axisX || ''}
                data={availableFields}
                onChange={value => handleAxisXChange(value || '')}
            />
            <Title order={5}>Оси Y</Title>
            {editedSettings.axisY &&
                editedSettings.axisY.map((axis, index) => (
                    <Flex key={index} align="flex-end" gap="xs">
                        <Select
                            placeholder="Поле"
                            label="Поле"
                            value={axis.field}
                            data={availableFields}
                            onChange={value => handleAxisYChange(index, 'field', value || '')}
                        />
                        <Select
                            label="Сторона"
                            placeholder="Сторона"
                            value={axis.side}
                            data={[
                                { value: 'left', label: 'Left' },
                                { value: 'right', label: 'Right' },
                            ]}
                            onChange={value => handleAxisYChange(index, 'side', value || 'left')}
                        />
                        <Select
                            label="Тип"
                            placeholder="Тип"
                            value={axis.type}
                            data={[
                                { value: 'bar', label: 'Bar' },
                                { value: 'line', label: 'Line' },
                                { value: 'area', label: 'Area' },
                            ]}
                            onChange={value => handleAxisYChange(index, 'type', value || 'bar')}
                        />
                        <ActionIcon size={35} color="red" onClick={() => deleteAxisY(index)}>
                            <IconBackspace size={20} />
                        </ActionIcon>
                    </Flex>
                ))}
            <Button leftSection={<IconLibraryPlus />} onClick={addAxisY}>
                Добавить ось Y
            </Button>
        </Stack>
    );
};
