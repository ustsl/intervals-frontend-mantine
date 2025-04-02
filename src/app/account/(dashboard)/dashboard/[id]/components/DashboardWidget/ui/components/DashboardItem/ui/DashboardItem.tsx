import {

    ActionIcon,
    Flex,
    Text,

} from '@mantine/core';
import { IconCircleMinus } from '@tabler/icons-react';

type DashboardItemProps = {
    item: { title: string; ordering: number; object_id: string };
    onDelete: () => void;
};
export const DashboardItem = ({ item, onDelete }: DashboardItemProps) => (
    <Flex key={item.object_id} mb="xs" gap="md" align="center">
        <Text size="s">{item.title}</Text>
        <Text c="gray" size="xs">
            (Очередность {item.ordering})
        </Text>
        <ActionIcon size={25} color="red" onClick={onDelete}>
            <IconCircleMinus size={20} />
        </ActionIcon>
    </Flex>
);