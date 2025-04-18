import { ListWidget } from "@/components/widgets/ListWidget";
import { ISearchParams } from "@/types/base";

export default async function Data(props: { searchParams: Promise<ISearchParams> }) {

    const searchParams = await props.searchParams;
    const paramsString = new URLSearchParams(searchParams as Record<string, string>).toString();
    const url = `data`

    return (
        <ListWidget anchor={url} params={paramsString} title={"Данные"} crTitle={"Создать контейнер данных"} />
    );
}


export const dynamic = 'force-dynamic';
export const dynamicParams = true