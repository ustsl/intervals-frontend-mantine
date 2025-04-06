import { ListWidget } from "@/components/widgets/ListWidget";
import { ISearchParams } from "@/types/base";

export default async function Dashboards(props: { searchParams: Promise<ISearchParams> }) {

    const searchParams = await props.searchParams;
    const paramsString = new URLSearchParams(searchParams as Record<string, string>).toString();
    const url = `dashboard`

    return (
        <ListWidget anchor={url} params={paramsString} title={"Дашборды"} crTitle={"Создать дашборд"} />
    );
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true