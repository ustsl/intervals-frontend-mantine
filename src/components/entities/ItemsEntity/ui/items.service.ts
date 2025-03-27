// items.service.ts
import { fetchWithAuth } from "@/api/fetchWithAuth";
import { ItemsResponse, IItems } from "./items.props";

const LIMIT = 50;

export async function fetchItems(baseQuery: string, title?: string): Promise<IItems[]> {
    let url = `${baseQuery}?limit=${LIMIT}`;
    if (title) {
        url += `&title=${encodeURIComponent(title)}`;
    }
    const response = await fetchWithAuth(url);
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || `Ошибка ${response.status}`);
    }
    const data: ItemsResponse = await response.json();
    return data.containers;
}
