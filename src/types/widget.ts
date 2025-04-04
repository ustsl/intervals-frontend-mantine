import { DataContainerRow, } from "./data";

export type UUID = string;

export interface WidgetResponse {
    title: string;
    id: UUID;
    time_update: string;
    data: UUID | null;
    is_reversed: boolean;
    data_column: string | null;
    container: null | DataContainerRow[];
    offset_for_comparison: number | null;
    info: string;
}