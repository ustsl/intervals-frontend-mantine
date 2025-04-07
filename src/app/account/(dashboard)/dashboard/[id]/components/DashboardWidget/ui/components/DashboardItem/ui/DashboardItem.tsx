import { ActionIcon, Flex, Text, NumberInput } from '@mantine/core';
import { IconCircleMinus } from '@tabler/icons-react';

type DashboardItemProps = {
    item: { title: string; ordering: number; object_id: string };
    onDelete: () => void;
    onOrderChange: (newOrder: number) => void;
};

export const DashboardItem = ({ item, onDelete, onOrderChange }: DashboardItemProps) => (
    <Flex key={item.object_id} mb="xs" gap="md" align="center">
        <Text size="s">{item.title}</Text>
        <NumberInput
            value={item.ordering}
            onChange={(value) => onOrderChange(typeof value === 'number' ? value : 0)}
            label="Очередность"
            styles={{ input: { width: 80 } }}
            hideControls
        />
        <ActionIcon size={25} color="red" onClick={onDelete}>
            <IconCircleMinus size={20} />
        </ActionIcon>
    </Flex>
);
