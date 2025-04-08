import { Stack } from "@mantine/core";
import { BadgeWidget } from "./components/BadgeWidget";
import { ObjectDeleteFeature } from "@/components/features/ObjectDeleteFeature";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function WidgetPage(props: { params: Promise<any> }) {
    const params = await props.params;
    const deleteUrl = `https://api.intervals.ru/widget/${params.id}`
    return (
        <Stack gap="lg">
            <BadgeWidget id={params.id} />
            <ObjectDeleteFeature url={deleteUrl} redirect="/account/widget" />
        </Stack>

    );
}
