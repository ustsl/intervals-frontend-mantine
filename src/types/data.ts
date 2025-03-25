export interface DataResponse {
    id: string;
    title: string;
    time_create: string;
    time_update: string;
    container: null | Array<Record<string, unknown>>;
}