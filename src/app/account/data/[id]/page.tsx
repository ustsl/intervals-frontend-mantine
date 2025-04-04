import { DataObjectWidget } from "@/components/widgets/DataObjectWidget";
import { Stack } from "@mantine/core";
import { CodeBlock } from "./components/CodeBlock";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function DataPage(props: { params: Promise<any> }) {
    const params = await props.params;
    return (
        <Stack gap="lg">
            <DataObjectWidget id={params.id} />
            <CodeBlock id={params.id} />
        </Stack>

    );
}
