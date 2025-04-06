"use client";


import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input, } from "@mantine/core";

import { FilterWrapper } from '@/components/shared/FilterWrapper';
import { useDebounce } from '@/hooks/useDebounce';

export interface DepartmentLinkItem {
    id: number;
    title: string;
    slug: string;
}

export interface ILocationSuperShort {
    id: number;
    title: string;
    address: string;
    additional: string;
}

export const FilterBlockComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [title, setTitle] = useState('');


    const debouncedName = useDebounce(title.trim(), 500);



    // Обновление URL-параметров при изменении фильтров
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedName) {
            params.set('title', debouncedName);
        } else {
            params.delete('title');
        }


        router.push(`${pathname}?${params.toString()}`);
    }, [debouncedName, pathname, router, searchParams]);

    // Функция сброса фильтров
    const resetFilters = () => {
        setTitle('');
    };

    return (
        <FilterWrapper resetFilters={resetFilters}>
            <Input.Wrapper label="Поиск по названию" size="xs">
                <Input
                    size="xs"
                    placeholder="Введите название объекта"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
            </Input.Wrapper>

        </FilterWrapper>
    );
};
