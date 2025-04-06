import { CreateEntity } from "@/components/entities/CreateEntity"
import { FilterBlockComponent } from "@/components/entities/FilterBlockComponent"
import { ItemsEntity } from "@/components/entities/ItemsEntity"
import { DOMAIN } from "@/const"
import { baseEntities } from "@/types/base"

import { Group, Stack, Title } from "@mantine/core"

export const ListWidget = ({ anchor, params, title, crTitle }:
    { anchor: baseEntities, params: string; title: string, crTitle: string }) => {

    const url = `${DOMAIN}/${anchor}?${params}`

    return (
        <Stack gap={'md'}>
            <Group gap={'xl'}>
                <Title order={1}>{title}</Title>
                <CreateEntity
                    blockName={crTitle}
                    createQuery={url}
                    anchor={anchor} />
            </Group>
            <FilterBlockComponent />
            <ItemsEntity getQuery={url} anchor={anchor} />
        </Stack>
    )
}