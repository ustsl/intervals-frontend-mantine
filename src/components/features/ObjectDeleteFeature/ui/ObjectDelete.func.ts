import { notifications } from '@mantine/notifications';
import { fetchWithAuth } from '@/api/fetchWithAuth';

export async function deleteObject(url: string): Promise<void> {


    const response = await fetchWithAuth(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        notifications.show({
            title: 'Ошибка удаления',
            message: `Проверьте, есть ли связанные объекты. ${response.statusText}`,
            color: 'red',
        });
        throw new Error(`Ошибка: ${response.statusText}`);

    }


    notifications.show({
        title: 'Успешно удалено',
        message: 'Контейнер успешно удален',
        color: 'green',
    });
}
