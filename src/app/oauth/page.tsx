import { Metadata } from 'next';
import { AuthenticationForm } from './components/AuthenticationForm';
import { Center } from '@mantine/core';

export const metadata: Metadata = {
    title: "INTERVALS. Авторизация",
};


export default function Home() {
    return (
        <Center style={{ height: '100vh' }}>
            <AuthenticationForm />
        </Center>
    );
}
