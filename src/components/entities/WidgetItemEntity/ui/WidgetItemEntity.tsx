import styles from './WidgetItemEntiry.module.css'
import { WidgetResponse } from "@/types/widget"
import { Badge, Card, Stack, Text } from "@mantine/core"

export const WidgetItemEntity = ({ item }: { item: WidgetResponse }) => {
    const data = item?.container
    const offset = item?.offset_for_comparison
    const column = item?.data_column

    if (
        !data ||
        !Array.isArray(data) ||
        !offset ||
        data.length < offset ||
        !column
    ) {
        return null
    }

    const firstRowValue = data[0][column] as number
    const offsetRowValue = data[offset][column] as number

    if (firstRowValue === undefined || offsetRowValue === undefined) {
        return null
    }

    const diffPercent = ((offsetRowValue - firstRowValue) / firstRowValue) * 100
    const formattedDiff = diffPercent.toFixed(1)


    let badgeColor: "green" | "yellow" | "red"
    if (offsetRowValue < firstRowValue) {
        badgeColor = "green"
    } else if (diffPercent < 3) {
        badgeColor = "yellow"
    } else {
        badgeColor = "red"
    }

    return (
        <div className={styles.block}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="xs">
                    <Text c="gray" size="xs">
                        {item.title} ({item.data_column})
                    </Text>
                    {firstRowValue}
                    <Badge color={badgeColor}>
                        {offsetRowValue} ({formattedDiff}%)
                    </Badge>
                </Stack>
            </Card>
        </div >
    )
}
