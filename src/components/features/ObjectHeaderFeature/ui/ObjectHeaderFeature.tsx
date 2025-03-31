import styles from './objectHeaderFeature.module.css'

import { dateFormatter } from "@/functions/date"
import { Badge, Flex, Input } from "@mantine/core"

export const ObjectHeaderFeature = ({ editedTitle, setEditedTitle, timeUpdate }:
    { editedTitle: string, setEditedTitle: (data: string) => void, timeUpdate: string }) => {
    return (
        <Flex justify="space-between" align="center">
            <Input
                className={styles.input}
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                size="xl"
            />
            <Badge color="pink">{dateFormatter(timeUpdate)}</Badge>
        </Flex>
    )
}