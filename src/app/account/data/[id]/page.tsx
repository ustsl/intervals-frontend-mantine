import { DataObjectWidget } from "@/components/widgets/DataObjectWidget";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Object(props: { params: Promise<any> }) {
    const params = await props.params;
    return (
        <DataObjectWidget id={params.id} />
    );
}
