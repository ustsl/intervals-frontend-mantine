import styles from './WidgetItemEntiry.module.css'
import { WidgetResponse } from "@/types/widget"
import { Badge, Card, Stack, Text } from "@mantine/core"

export const WidgetItemEntity = ({ item }: { item: WidgetResponse }) => {
    const data = item?.container
    const column = item?.data_column

    if (!data || !Array.isArray(data) || !column) return null

    // Определяем базовое и сравниваемое значение в зависимости от is_reversed
    let baseValue: number | undefined
    let compareValue: number | undefined

    if (item.is_reversed) {
        if (data.length < 2) return null
        baseValue = data[data.length - 1][column] as number
        compareValue = data[data.length - 2][column] as number
    } else {
        const offset = item?.offset_for_comparison
        if (!offset || data.length < offset + 1) return null
        baseValue = data[0][column] as number
        compareValue = data[offset][column] as number
    }

    if (baseValue === undefined || compareValue === undefined) return null

    const diffPercent = ((compareValue - baseValue) / baseValue) * 100
    const formattedDiff = diffPercent.toFixed(1)

    const badgeColor: "green" | "yellow" | "red" =
        compareValue < baseValue ? "green" : diffPercent < 3 ? "yellow" : "red"

    return (

        <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.block}>
            <Stack gap="xs">
                <Text c="gray" size="xs">
                    {item.title} ({item.data_column})
                </Text>
                <Text>{baseValue}</Text>
                <Badge color={badgeColor}>
                    {compareValue} ({formattedDiff}%)
                </Badge>
            </Stack>
        </Card>

    )
}
