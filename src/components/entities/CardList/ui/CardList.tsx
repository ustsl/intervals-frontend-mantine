import { Card, Flex, Group, Text, Badge, Button } from "@mantine/core"

export interface IItems {
    id: string;
    title: string;
}

export const CardList = ({ items, anchor }: { items: IItems[], anchor: string }) => {
    return (
        <Flex>

            {items.map(item => {
                return (
                    <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Norway Fjord Adventures</Text>
                            <Badge color="pink">On Sale</Badge>
                        </Group>

                        <Text size="sm" c="dimmed">
                            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                            activities on and around the fjords of Norway
                        </Text>

                        <Button
                            component="a"
                            href={`/${anchor}/${item.id}`}
                            color="blue" fullWidth mt="md" radius="md">
                            Book classic tour now
                        </Button>

                    </Card>
                )
            })}


        </Flex>
    )
}