import { DashboardItem } from './components/DashboardItem';
import styles from './page.module.css'

import { Anchor, Container, Stack } from "@mantine/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function DashboardClientPage(props: { params: Promise<any> }) {
    const params = await props.params;
    return (
        <Container p="md" className={styles.block} mt="xl">
            <Stack gap={"lg"}>
                <DashboardItem id={params.id} />
                <Anchor c="gray" href="/" size='sm'>Сделано в INTERVALS</Anchor>
            </Stack>
        </Container>
    );
}
