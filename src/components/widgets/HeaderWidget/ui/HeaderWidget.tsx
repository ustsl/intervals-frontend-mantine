'use client'

import { useState, useEffect } from 'react';
import { Anchor, Box, Burger, Container, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter, usePathname } from 'next/navigation';

import classes from './HeaderWidget.module.css';
import { LogoComponent } from '@/components/shared/LogoComponent';
import { useAuthStore } from '@/store/oauth.store';

const userLinks = [
    { link: 'https://t.me/ustsl', label: 'Техническая поддержка' },
    { link: '/docs', label: 'Инструкции' },
];

const mainLinks = [
    { link: '/account', label: 'Дашборды' },
    { link: '/account/chart', label: 'Графики' },
    { link: '/account/widget', label: 'Виджеты' },
    { link: '/account/data', label: 'Данные' },
];

export const HeaderWidget = () => {
    const [email, setEmail] = useState<string | null>(null);
    const { removeData } = useAuthStore.getState();
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(-1);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const storedEmail = localStorage.getItem('login');
        setEmail(storedEmail);
        if (!storedEmail) {
            removeData();
            router.push('/oauth');
        }
    }, [removeData, router]);


    useEffect(() => {
        const sortedLinks = [...mainLinks].sort((a, b) => b.link.length - a.link.length);
        const found = sortedLinks.find(item => pathname.startsWith(item.link));
        const index = found ? mainLinks.findIndex(item => item.link === found.link) : -1;
        setActive(index);
    }, [pathname]);

    const mainItems = mainLinks.map((item, index) => (
        <Anchor<'a'>
            href={item.link}
            key={item.label}
            className={classes.mainLink}
            data-active={index === active || undefined}
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
                    <Group justify="flex-end">
                        {secondaryItems}
                        <Text className={classes.mail}>{email}</Text>
                    </Group>
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
