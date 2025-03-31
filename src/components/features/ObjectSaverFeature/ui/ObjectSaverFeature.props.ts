
export type BodyPayload = Record<string, unknown>;

export interface IObjectSaverFeature {
    url: string;
    body: BodyPayload;
}