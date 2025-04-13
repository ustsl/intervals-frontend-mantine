import styles from './FormWrapper.module.css'
import { Center, Paper } from "@mantine/core"

export const FormWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Center style={{ height: '100vh' }}>
            <Paper radius="md" p="xl" withBorder className={styles.block}>
                {children}
            </Paper>
        </Center>
    )
} 