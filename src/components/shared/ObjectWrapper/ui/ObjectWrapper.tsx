import { Loader, Stack, Text } from "@mantine/core"

export interface IObjectWrapper {
    children: React.ReactNode;
    error: string | null;
    loading: boolean;
}

export const ObjectWrapper = ({ children, error, loading }: IObjectWrapper) => {

    if (loading) {
        return <Loader color="cyan" size="xl" type="dots" />;
    }

    if (error) {
        return <Text c="red">{error}</Text>;
    }
    return (
        <Stack>
            {children}
        </Stack>
    )
}