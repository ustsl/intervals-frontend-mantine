import { Stack } from "@mantine/core";
import { DashboardWidget } from "./components/DashboardWidget";
import { DashboardLinkGenerator } from "./components/DashboardLinkGenerator";
import { ObjectDeleteFeature } from "@/components/features/ObjectDeleteFeature";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Object(props: { params: Promise<any> }) {
    const params = await props.params;
    const deleteUrl = `https://api.intervals.ru/dashboard/${params.id}`
    return (
        <Stack gap="lg">
            <DashboardLinkGenerator id={params.id} />
            <DashboardWidget id={params.id} />
            <ObjectDeleteFeature url={deleteUrl} redirect="/account" />
        </Stack>
    );
}
