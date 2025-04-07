"use client"

import { ChartItemEntity } from "@/components/entities/ChartItemEntity";
import { WidgetItemEntity } from "@/components/entities/WidgetItemEntity";
import { LogoComponent } from "@/components/shared/LogoComponent";
import { DashboardResponse } from "@/types/dashboard";
import { Flex, Grid, Loader, Stack, Title } from "@mantine/core";
import { useState, useEffect } from "react";

export const DashboardItem = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<DashboardResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.intervals.ru/tmp/${id}`);

                // Если статус 404, то получаем сообщение об ошибке из ключа detail
                if (response.status === 404) {
                    const errorData = await response.json();
                    setError(errorData.detail || "Не найдено");
                } else if (response.ok) {
                    // Если статус 200, выводим полученный JSON
                    const jsonData: DashboardResponse = await response.json();
                    setData(jsonData);
                } else {
                    setError("Произошла непредвиденная ошибка");
                }
            } catch {
                setError("Ошибка при выполнении запроса");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Loader color="cyan" size="xl" type="dots" />;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!data) {
        return
    }

    return (
        <Stack gap={"xl"} mb="xl">
            <Flex gap="md" align={'center'}>
                <LogoComponent />
                <Title order={1} size={35}>{data.title}</Title>

            </Flex>

            {data.widgets && (data.widgets).length > 0 &&
                <Grid>
                    {
                        (data.widgets).map(item => {
                            return <Grid.Col span={3} key={item.id}><WidgetItemEntity item={item} /></Grid.Col>
                        })}

                </Grid>}

            {data.charts && (data.charts).length > 0 &&
                <Stack gap={"lg"} >
                    {(data.charts).map(item => {
                        return <ChartItemEntity
                            key={item.id}
                            chart={item}
                        />
                    })}


                </Stack>
            }

        </Stack>
    );
};
