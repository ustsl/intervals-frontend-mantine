'use client';

import React, { useEffect, useState } from "react";
import { Select } from "@mantine/core";
import { DOMAIN } from "@/const";
import { IItems, ItemsEntitySelectProps } from "./items.props";
import { fetchItems } from "./items.service";

export const ItemsEntitySelect: React.FC<ItemsEntitySelectProps> = ({
    anchor,
    defaultId,
    onClick,
}) => {
    const [items, setItems] = useState<IItems[]>([]);
    const [selectedValue, setSelectedValue] = useState<string | null>(defaultId);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const getQuery = `${DOMAIN}/${anchor}`;

    useEffect(() => {
        const handler = setTimeout(() => {
            const loadItems = async () => {
                try {
                    const itemsData = await fetchItems(getQuery, searchTerm);
                    setItems(itemsData);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (err) {
                    setItems([]);
                }
            };

            loadItems();
        }, 500);

        return () => clearTimeout(handler);
    }, [getQuery, searchTerm]);

    // Преобразуем список элементов для Mantine Select
    const selectData = items.map((item) => ({
        value: item.id,
        label: item.title,
    }));

    const handleChange = (value: string | null) => {
        setSelectedValue(value);
        if (value) {
            const selectedItem = items.find((item) => item.id === value);
            if (selectedItem) {
                onClick({ id: selectedItem.id, title: selectedItem.title, time_update: selectedItem.time_update });
            }
        }
    };

    return (
        <Select
            label="Выберите элемент"
            placeholder="Нажмите для выбора"
            data={selectData}
            value={selectedValue}
            onChange={handleChange}
            onSearchChange={setSearchTerm}
            searchable
            nothingFoundMessage="Ничего не найдено"
            clearable
        />
    );
};
