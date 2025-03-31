import { DataResponse } from "./data";

export type UUID = string;

export interface AxisY {
    field: string;
    side: "left" | "right";
    type: "bar" | "line" | "area";
}

export interface ChartSettings {
    axisX?: string | null;
    axisY?: AxisY[] | null;
}

export interface ChartResponse {
    title: string;
    id: UUID;
    time_update: string;
    data: UUID | null;
    settings: ChartSettings | null;
    data_relation: DataResponse | null;
}