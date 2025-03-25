import { dateFormatter } from "@/functions/date";
import { Card, Text, Badge, Stack, Grid } from "@mantine/core"

export interface IItems {
    id: string;
    title: string;
    time_update: string;
}

export const CardList = ({ items, anchor }: { items: IItems[], anchor: string }) => {
    return (
        <Grid pt={'xl'}>
            {items.map(item => {
                return (
                    <Grid.Col key={item.id} span={{ base: 12, md: 6, lg: 3 }}>
                        <Card
                            key={item.id}
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            component="a"
                            href={`/account/${anchor}/${item.id}`}>
                            <Stack>
                                <Text fw={500}>{item.title}</Text>

                                <Badge color="pink">{dateFormatter(item.time_update)}</Badge>
                            </Stack>
                        </Card>
                    </Grid.Col>
                )
            })}

        </Grid>

    )
}