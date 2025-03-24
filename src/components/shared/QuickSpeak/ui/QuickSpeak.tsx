'use client'

import styles from './quickSpeak.module.css'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';



export const QuickSpeak = () => {


    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Подробнее" size={'lg'}>
                <div className={styles.quick}>
                    <iframe src={`https://app.qspk.me/1704891492315`} ></iframe>
                </div>


            </Modal>

            <Button variant="default" onClick={open}>
                Подробнее
            </Button>
        </>
    );
}

