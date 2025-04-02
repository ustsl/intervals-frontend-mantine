import { ChartResponse } from "./chart";
import { WidgetResponse } from "./widget";

export type UUID = string;

export interface DBChartResponse extends ChartResponse {
    ordering: number
}

export interface DBWidgetResponse extends WidgetResponse {
    ordering: number
}

export interface DashboardResponse {
    title: string;
    id: UUID;
    time_update: string;
    charts: null | DBChartResponse[]
    widgets: null | DBWidgetResponse[]
}


export interface ChartItemRelation {
    title: string;
    object_id: string;
    ordering: number;
}

export interface WidgetItemRelation {
    title: string;
    object_id: string;
    ordering: number;
}