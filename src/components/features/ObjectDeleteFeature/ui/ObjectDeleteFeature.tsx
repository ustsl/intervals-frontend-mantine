"use client"

import styles from './ObjectDeleteFeature.module.css'
import { useState, useEffect } from 'react';
import { Button, Modal, Text } from '@mantine/core';
import { deleteObject } from './ObjectDelete.func';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

export const ObjectDeleteFeature = ({ url, redirect }: { url: string, redirect: string }) => {
    const router = useRouter();
    const [opened, { open, close }] = useDisclosure(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    // Состояния для таймера и статуса кнопки
    const [counter, setCounter] = useState(3);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // При открытии модального окна запускаем обратный отсчёт
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (opened) {
            setCounter(3);
            setButtonDisabled(true);
            intervalId = setInterval(() => {
                setCounter(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalId);
                        setButtonDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        // Очистка таймера при закрытии модального окна или размонтировании компонента
        return () => clearInterval(intervalId);
    }, [opened]);

    const handleDelete = async () => {
        setDeleteError(null);
        try {
            await deleteObject(url);
            router.push(redirect);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setDeleteError(err.message);
            } else {
                setDeleteError('Неизвестная ошибка');
            }
        }
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Удаление объекта">
                <Button
                    bg={buttonDisabled ? '' : 'red'}
                    onClick={handleDelete}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? `Подтвердить удаление (${counter})` : 'Подтвердить удаление'}
                </Button>
            </Modal>

            <Text
                c="red"
                className={styles.button}
                onClick={open}
                size='sm'
            >
                Удалить объект
            </Text>

            {deleteError && <Text c="red">{deleteError}</Text>}
        </>
    );
};
