import styles from './filterWrapper.module.css'

import { Button, Group } from "@mantine/core"

export const FilterWrapper = ({ children, resetFilters }: { children: React.ReactNode, resetFilters: () => void }) => {
    return (
        <Group
            bg={'var(--mantine-color-gray-light)'}
            p="md"
            gap="lg"
            className={styles.block}
        >
            {children}
            <Button size="xs" onClick={resetFilters}>
                Сбросить фильтры
            </Button>
        </Group>
    )
}