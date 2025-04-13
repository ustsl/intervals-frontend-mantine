'use client'

import { useForm } from '@mantine/form';
import { PasswordInput, Button, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { FormWrapper } from '@/components/shared/FormWrapper';

interface ResetPasswordFormProps {
    token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
    const router = useRouter();
    const form = useForm({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: {
            password: (value, values) => {
                if (value.length < 6) {
                    return 'Пароль должен быть не менее 6 символов';
                }
                if (value !== values.confirmPassword) {
                    return 'Пароли не совпадают';
                }
                return null;
            },
            confirmPassword: (value, values) =>
                value === values.password ? null : 'Пароли не совпадают',
        },
    });

    const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
        try {
            const response = await fetch('https://api.intervals.ru/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    password: values.password,
                }),
            });

            if (response.ok) {
                notifications.show({
                    color: 'green',
                    title: 'Успех',
                    message: 'Пароль успешно изменён',
                });
                router.push('/oauth');
            } else {
                notifications.show({
                    color: 'red',
                    title: 'Ошибка',
                    message: 'Ошибка смены пароля, попробуйте позже',
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
                Введите пароль
            </Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <PasswordInput
                        required
                        label="Новый пароль"
                        placeholder="Введите новый пароль"
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        required
                        label="Повторите пароль"
                        placeholder="Повторите новый пароль"
                        {...form.getInputProps('confirmPassword')}
                    />
                </Stack>
                <Button type="submit" mt="md">
                    Сменить пароль
                </Button>
            </form>
        </FormWrapper>
    );
};
