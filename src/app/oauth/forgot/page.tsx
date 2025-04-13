import { Metadata } from 'next';

import { Center } from '@mantine/core';
import { ForgotPasswordForm } from './components/ForgotForm';

export const metadata: Metadata = {
    title: "INTERVALS. Авторизация",
};


export default function Home() {
    return (
        <Center style={{ height: '100vh' }}>
            <ForgotPasswordForm />
        </Center>
    );
}
