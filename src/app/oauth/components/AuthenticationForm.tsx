'use client'

import styles from './AuthForm.module.css'

import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '@/api/auth';
import { useAuthStore } from '@/store/oauth.store';
import {
    Anchor,
    Button,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

// Текст для кнопки авторизации/регистрации
const oauthToggle = {
    login: 'Войти в систему',
    register: 'Зарегистрироваться',
};

export const AuthenticationForm = (props: PaperProps) => {
    const router = useRouter();
    const [type, toggle] = useToggle<'login' | 'register'>(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) =>
                val.length <= 5 ? 'Password should include at least 6 characters' : null,
        },
    });

    const setAuth = useAuthStore((state) => state.setAuth);
    const removeAuth = useAuthStore((state) => state.removeData);

    const handleSubmit = async (values: typeof form.values) => {
        if (type === 'login') {
            const authResult = await loginUser(values.email, values.password);
            if (authResult) {
                setAuth(values.email, values.password, authResult);
                notifications.show({
                    color: "green",
                    title: 'Авторизация успешна',
                    message: 'Добро пожаловать в аккаунт! 🌟',
                });
                router.push("/account");
            } else {
                notifications.show({
                    title: 'Ошибка авторизации',
                    message: 'Попробуйте с другими учетными данными',
                    color: 'red'
                });
                removeAuth();
            }
        } else {
            // Регистрация пользователя
            const regResult = await registerUser(values.email, values.password);
            if (regResult) {
                notifications.show({
                    color: "green",
                    title: 'Регистрация успешна',
                    message: 'Теперь вы можете залогиниться в сервисе!',
                });
                // Автоматически переключаем форму на авторизацию после регистрации
                toggle('login');
            } else {
                notifications.show({
                    title: 'Ошибка регистрации',
                    message: 'Попробуйте еще раз',
                    color: 'red'
                });
            }
        }
    };

    return (
        <Paper radius="md" p="xl" withBorder {...props} className={styles.block}>
            <Text size="lg" fw={500}>
                Введите данные для {type === 'login' ? 'входа' : 'регистрации'}
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        required
                        label="Почта"
                        placeholder="example@example.ru"
                        value={form.values.email}
                        onChange={(event) =>
                            form.setFieldValue('email', event.currentTarget.value)
                        }
                        error={form.errors.email && 'Введена невалидная почта'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Пароль"
                        placeholder="Пароль"
                        value={form.values.password}
                        onChange={(event) =>
                            form.setFieldValue('password', event.currentTarget.value)
                        }
                        error={
                            form.errors.password && 'Пароль не должен быть короче 6 символов'
                        }
                        radius="md"
                    />
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        c="dimmed"
                        onClick={() => toggle()}
                        size="xs"
                    >
                        {type === 'register'
                            ? 'Есть аккаунт? Войдите'
                            : 'Нет аккаунта, зарегистрируйтесь'}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(oauthToggle[type])}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
};
