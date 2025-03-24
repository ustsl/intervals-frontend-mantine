'use client'

import { useState } from 'react';
import { Anchor, Box, Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from './HeaderWidget.module.css'
import { LogoComponent } from '@/components/shared/LogoComponent';

const userLinks = [
    { link: 'https://t.me/ustsl', label: 'Техническая поддержка' },
    { link: '/docs', label: 'Инструкции' },
];

const mainLinks = [
    { link: '/dashboards', label: 'Дашборды' },
    { link: '/graphics', label: 'Графики' },
    { link: '/widgets', label: 'Виджеты' },
    { link: '/data', label: 'Данные' },
];

export const HeaderWidget = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(0);

    const mainItems = mainLinks.map((item, index) => (
        <Anchor<'a'>
            href={item.link}
            key={item.label}
            className={classes.mainLink}
            data-active={index === active || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(index);
            }}
        >
            {item.label}
        </Anchor>
    ));

    const secondaryItems = userLinks.map((item) => (
        <Anchor
            href={item.link}
            key={item.label}
            onClick={(event) => event.preventDefault()}
            className={classes.secondaryLink}
        >
            {item.label}
        </Anchor>
    ));

    return (
        <header className={classes.header}>
            <Container className={classes.inner} size={1200}>
                <LogoComponent />
                <Box className={classes.links} visibleFrom="sm">
                    <Group justify="flex-end">{secondaryItems}</Group>
                    <Group gap={0} justify="flex-end" className={classes.mainLinks}>
                        {mainItems}
                    </Group>
                </Box>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size="sm"
                    hiddenFrom="sm"
                />
            </Container>
        </header>
    );
}