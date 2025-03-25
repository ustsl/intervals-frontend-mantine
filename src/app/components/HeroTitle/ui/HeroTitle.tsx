import { Button, Container, Stack, Text } from '@mantine/core';

import classes from './HeroTitle.module.css';
import { IconCode } from '@tabler/icons-react';

export const HeroTitle = () => {
    return (
        <div className={classes.wrapper}>
            <Container size={800} className={classes.inner}>
                <Stack gap={'lg'}>


                    <h1 className={classes.title} >
                        Умные{' '}
                        <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                            дашборды для бизнеса на основе любых данных
                        </Text>
                    </h1>

                    <Text className={classes.description} c="var(--mantine-color-gray-9)">
                        Визуализируйте данные в красивые BI-дашборды.
                        Создавайте сложные кастомизированные отчеты. Интегрируйте сервисы
                        с INTERVALS с помощью гибкого API. <strong>Бесплатно.</strong>
                    </Text>

                    <Button
                        mt={'lg'}
                        component="a"
                        target='_blank'
                        href="https://api.intervals.ru/docs"
                        size="md"
                        variant="default"
                        leftSection={<IconCode />}

                    >
                        Открытый API для управления отчетами
                    </Button>



                </Stack>

            </Container>
        </div>
    );
}