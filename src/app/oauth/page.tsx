import { AuthenticationForm } from './components/AuthenticationForm';
import { Center } from '@mantine/core';

export default function Home() {
    return (
        <Center style={{ height: '100vh' }}>
            <AuthenticationForm />
        </Center>
    );
}
