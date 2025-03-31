import { useState } from 'react';
import { ChartSettings, AxisY } from '@/types/chart';

export const useChartSettings = (initialSettings: ChartSettings) => {
    const [settings, setSettings] = useState<ChartSettings>(initialSettings);

    const handleAxisXChange = (value: string) => {
        setSettings(prev => ({ ...prev, axisX: value }));
    };

    const handleAxisYChange = (index: number, key: keyof AxisY, value: string) => {
        setSettings(prev => {
            const updatedAxisY = prev.axisY ? [...prev.axisY] : [];
            updatedAxisY[index] = { ...updatedAxisY[index], [key]: value } as AxisY;
            return { ...prev, axisY: updatedAxisY };
        });
    };

    const addAxisY = () => {
        setSettings(prev => ({
            ...prev,
            axisY: prev.axisY
                ? [...prev.axisY, { field: '', side: 'left', type: 'bar' }]
                : [{ field: '', side: 'left', type: 'bar' }],
        }));
    };

    const deleteAxisY = (index: number) => {
        setSettings(prev => {
            const updatedAxisY = prev.axisY ? [...prev.axisY] : [];
            updatedAxisY.splice(index, 1);
            return { ...prev, axisY: updatedAxisY };
        });
    };

    return {
        settings,
        handleAxisXChange,
        handleAxisYChange,
        addAxisY,
        deleteAxisY,
        setSettings
    };
};
