'use client';

import React, { useEffect, useState } from "react";
import { CardList, IItems } from "@/components/shared/CardList";
import { Loader } from "@mantine/core";
import { IItemsEntity } from "./items.props";
import { fetchItems } from "./items.service";

export const ItemsEntity = ({ getQuery, anchor }: IItemsEntity) => {
    const [title] = useState("")
    const [items, setItems] = useState<IItems[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const itemsData = await fetchItems(getQuery, title);
                setItems(itemsData);
            } catch (err: unknown) {
                if (err && typeof err === "object" && "message" in err) {
                    setError((err as { message?: string }).message || "Произошла неизвестная ошибка");
                } else {
                    setError("Произошла неизвестная ошибка");
                }
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, [getQuery, title]);

    if (loading) {
        return <Loader color="cyan" size="xl" type="dots" />;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return <CardList items={items} anchor={anchor} />;
};
