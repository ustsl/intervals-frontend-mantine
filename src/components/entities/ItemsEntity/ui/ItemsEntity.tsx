'use client';

import React, { useEffect, useState } from "react";
import { CardList, IItems } from "@/components/shared/CardList";
import { fetchWithAuth } from "@/api/fetchWithAuth";
import { baseEntities } from "@/types/base";
import { Loader } from "@mantine/core";

interface ItemsResponse {
    total: number;
    offset: number;
    containers: IItems[];
}

interface IItemsEntity {
    getQuery: string;
    anchor: baseEntities;
}

export const ItemsEntity = ({ getQuery, anchor }: IItemsEntity) => {
    const [items, setItems] = useState<IItems[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const limit = 50;

    useEffect(() => {
        const loadDashboards = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchWithAuth(
                    `${getQuery}?limit=${limit}`
                );


                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.message || `Ошибка ${response.status}`);
                }
                const data: ItemsResponse = await response.json();
                setItems(data.containers);
            } catch (err: unknown) {
                if (err && typeof err === 'object' && 'message' in err) {
                    setError((err as { message?: string }).message || "Произошла неизвестная ошибка");
                } else {
                    setError("Произошла неизвестная ошибка");
                }

            } finally {
                setLoading(false);
            }
        };

        loadDashboards();
    }, []);

    if (loading) {
        return <Loader color="cyan" size="xl" type="dots" />;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return <CardList items={items} anchor={anchor} />;
};
