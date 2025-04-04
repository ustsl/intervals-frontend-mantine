import { Stack } from "@mantine/core";
import { DashboardWidget } from "./components/DashboardWidget";
import { DashboardLinkGenerator } from "./components/DashboardLinkGenerator";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Object(props: { params: Promise<any> }) {
    const params = await props.params;
    return (
        <Stack gap="lg">
            <DashboardLinkGenerator id={params.id} />
            <DashboardWidget id={params.id} />
        </Stack>
    );
}
