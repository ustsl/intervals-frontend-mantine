import { baseEntities } from "@/types/base";

export interface IItems {
    id: string;
    title: string;
    time_update: string;
}


export interface ItemsResponse {
    total: number;
    offset: number;
    containers: IItems[];
}

export interface IItemsEntity {
    getQuery: string;
    anchor: baseEntities;
}

export interface ItemsEntitySelectProps {
    anchor: baseEntities;
    defaultId: string | null;
    onClick: (selected: IItems) => void;
}
