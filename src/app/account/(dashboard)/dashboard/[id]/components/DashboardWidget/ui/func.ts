import { fetchItems } from "@/components/entities/ItemsEntity";

// Универсальная функция удаления элемента из списка
export const deleteItem = <T,>(
    setItems: React.Dispatch<React.SetStateAction<T[]>>,
    index: number
) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
};

// Функция для получения опций по типу и поисковой строке
export const fetchOptions = async (type: 'chart' | 'widget', searchTerm: string) => {
    const url =
        type === 'chart'
            ? `https://api.intervals.ru/chart/?title=${encodeURIComponent(searchTerm)}`
            : `https://api.intervals.ru/widget/?title=${encodeURIComponent(searchTerm)}`;
    const data = await fetchItems(url, searchTerm);
    return data.map((item) => ({
        value: item.id,
        label: item.title,
    }));
};
