import { Metadata } from 'next';
import { ResetPasswordForm } from './components/ResetForm';

export const metadata: Metadata = {
    title: "INTERVALS. Восстановление пароля",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ResetPasswordPage(props: { params: Promise<any> }) {
    const params = await props.params;
    return (
        <ResetPasswordForm token={params.token} />
    );
}
