import { BadgeWidget } from "./components/BadgeWidget";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function WidgetPage(props: { params: Promise<any> }) {
    const params = await props.params;
    return (
        <BadgeWidget id={params.id} />
    );
}
