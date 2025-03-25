import { CreateEntity } from "@/components/entities/CreateEntity"
import { ItemsEntity } from "@/components/entities/ItemsEntity"
import { DOMAIN } from "@/const"
import { baseEntities } from "@/types/base"
import { Group, Title } from "@mantine/core"

export const ListWidget = ({ anchor, title, crTitle }: { anchor: baseEntities, title: string, crTitle: string }) => {

    const url = `${DOMAIN}/${anchor}`

    return (
        <>
            <Group gap={'xl'}>
                <Title order={1}>{title}</Title>
                <CreateEntity
                    blockName={crTitle}
                    createQuery={url}
                    anchor={anchor} />
            </Group>
            <ItemsEntity getQuery={url} anchor={anchor} />
        </>
    )
}