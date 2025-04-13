'use client'

import { useForm } from '@mantine/form';
import { TextInput, Button, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FormWrapper } from '@/components/shared/FormWrapper';

export const ForgotPasswordForm = () => {
    const form = useForm({
        initialValues: { email: '' },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Введите корректный email',
        },
    });

    const handleSubmit = async (values: { email: string }) => {
        try {
            const response = await fetch('https://api.intervals.ru/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: values.email }),
            });

            if (response.ok) {
                notifications.show({
                    color: 'green',
                    title: 'Успех',
                    message: 'Письмо с токеном восстановления отправлено на указанную почту',
                });
            } else {
                notifications.show({
                    color: 'red',
                    title: 'Ошибка',
                    message: 'Ошибка отправки запроса, попробуйте позже',
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            notifications.show({
                color: 'red',
                title: 'Ошибка',
                message: `Произошла ошибка: ${error.message}`,
            });
        }
    };

    return (
        <FormWrapper>
            <Text size="lg" fw={500}>
                Введите данные аккаунта
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Почта"
                    placeholder="Введите ваш email"
                    required
                    {...form.getInputProps('email')}
                />
                <Button type="submit" mt="md">
                    Отправить
                </Button>
            </form>
        </FormWrapper>
    );
};
