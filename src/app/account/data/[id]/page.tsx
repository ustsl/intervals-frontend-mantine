import { DataObjectWidget } from "@/components/widgets/DataObjectWidget";
import { Stack } from "@mantine/core";
import { CodeBlock } from "./components/CodeBlock";
import { ObjectDeleteFeature } from "@/components/features/ObjectDeleteFeature";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function DataPage(props: { params: Promise<any> }) {
    const params = await props.params;
    const deleteUrl = `https://api.intervals.ru/data/${params.id}`
    return (
        <Stack gap="lg">
            <DataObjectWidget id={params.id} />
            <CodeBlock id={params.id} />
            <ObjectDeleteFeature url={deleteUrl} redirect="/account/data" />
        </Stack>

    );
}
