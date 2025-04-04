'use client';

import React, { useState } from "react";
import { Anchor, Button, Card, Text } from "@mantine/core";
import { fetchWithAuth } from "@/api/fetchWithAuth";
import { IconLinkPlus } from "@tabler/icons-react";

export const DashboardLinkGenerator = ({ id }: { id: string }) => {
    const [dashboardData, setDashboardData] = useState<{
        id: string;
        secret_link: string;
        available_until: string;
    } | null>(null);
    const [error, setError] = useState<string>("");

    const handleCreateLink = async () => {
        setError(""); // сброс ошибок перед новым запросом
        try {
            const response = await fetchWithAuth(`https://api.intervals.ru/tmp/${id}`, {
                method: "POST",
            });

            if (response.status === 201) {
                const data = await response.json();
                setDashboardData(data);
            } else {
                setError(`Ошибка: получен статус ${response.status}`);
            }
        } catch (err) {
            setError("Ошибка при выполнении запроса");
            console.error(err);
        }
    };

    return (
        <>
            <Button variant="default" leftSection={<IconLinkPlus />} fullWidth onClick={handleCreateLink}>
                Создать ссылку на дашборд
            </Button>
            {dashboardData && (
                <Card shadow="sm" padding="md" mt="md" radius="md" withBorder>
                    <Text w={500} size="lg">
                        Ссылка на дашборд создана
                    </Text>
                    <Text size="m" mb="sm" c="gray">
                        Внимание. Одновременно может быть активной только одна ссылка.
                    </Text>
                    <Text>
                        <strong>Перейти:</strong> <Anchor href={`/tmp/${dashboardData.secret_link}`} target="_blank"
                        >https://intervals.ru/tmp/{dashboardData.secret_link}
                        </Anchor>
                    </Text>
                    <Text>
                        <strong>Доступна до:</strong>{" "}
                        {new Date(dashboardData.available_until).toLocaleString()}
                    </Text>
                </Card>
            )}
            {error && (
                <Card shadow="sm" padding="md" mt="md" radius="md" withBorder style={{ backgroundColor: "#ffe6e6" }}>
                    <Text c="red">{error}</Text>
                </Card>
            )}
        </>
    );
};
