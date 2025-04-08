import { Stack } from "@mantine/core";
import { ChartWidget } from "./components/ChartWidget";
import { ObjectDeleteFeature } from "@/components/features/ObjectDeleteFeature";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ChartPage(props: { params: Promise<any> }) {
    const params = await props.params;
    const deleteUrl = `https://api.intervals.ru/chart/${params.id}`
    return (
        <Stack gap={'lg'}>
            <ChartWidget id={params.id} />
            <ObjectDeleteFeature url={deleteUrl} redirect="/account/chart" />
        </Stack>

    );
}
