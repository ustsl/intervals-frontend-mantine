import { useState, useEffect, useCallback } from 'react';
import { fetchWithAuth } from '@/api/fetchWithAuth';

export function useLoadData<T>(url: string): {
    data: T | null;
    loading: boolean;
    error: string | null;
    refresh: () => void;
} {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshIndex, setRefreshIndex] = useState(0);

    const refresh = useCallback(() => {
        setLoading(true);
        setRefreshIndex(prev => prev + 1);
    }, []);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetchWithAuth(url);
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
                }
                const json = await response.json();
                setData(json);
                setError(null);
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
    }, [url, refreshIndex]);

    return { data, loading, error, refresh };
}
