import { notifications } from '@mantine/notifications';
import { fetchWithAuth } from '@/api/fetchWithAuth';

export async function saveObject(url: string, body: unknown): Promise<void> {
    console.log(body)
    console.log(url)

    const response = await fetchWithAuth(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Ошибка сохранения: ${response.statusText}`);
    }


    notifications.show({
        title: 'Успешно сохранено',
        message: 'Контейнер успешно отредактирован',
        color: 'green',
    });
}
