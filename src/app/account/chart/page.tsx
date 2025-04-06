import { ListWidget } from "@/components/widgets/ListWidget";
import { ISearchParams } from "@/types/base";

export default async function Charts(props: { searchParams: Promise<ISearchParams> }) {


    const searchParams = await props.searchParams;
    const paramsString = new URLSearchParams(searchParams as Record<string, string>).toString();
    const url = `chart`


    return (
        <ListWidget anchor={url} params={paramsString} title={"Графики"} crTitle={"Создать график"} />
    );
}


export const dynamic = 'force-dynamic';
export const dynamicParams = true