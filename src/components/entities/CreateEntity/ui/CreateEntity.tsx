'use client'

import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput } from '@mantine/core';
import { baseEntities } from '@/types/base';
import { useRouter } from 'next/navigation';
import { fetchWithAuth } from '@/api/fetchWithAuth';


export interface ICreateEntity {
    blockName: string;
    createQuery: string;
    anchor: baseEntities;
}

export const CreateEntity = ({ blockName, createQuery, anchor }: ICreateEntity) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [title, setTitle] = useState('');
    const router = useRouter();

    const handleCreate = async () => {
        try {
            const response = await fetchWithAuth(createQuery, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            });

            if (response.status === 201) {
                const data = await response.json();
                router.push(`/account/${anchor}/${data.id}`);
            } else {
                console.error('Ошибка при создании сущности:', response.status);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title={blockName} >
                <TextInput
                    placeholder="Введите заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    mb="md"
                />
                <Button onClick={handleCreate}>Создать</Button>
            </Modal>

            <Button variant="default" onClick={open}>
                {blockName}
            </Button>
        </>
    );
};
