import { DashboardWidget } from "./components/DashboardWidget";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Object(props: { params: Promise<any> }) {
    const params = await props.params;
    return (
        <DashboardWidget id={params.id} />
    );
}
