'use client'

import { Anchor, Group } from '@mantine/core';

import classes from './FooterWidget.module.css'

const links = [
    { link: 'https://ustsl.ru', label: 'Контакты разработчика' },
    { link: '/docs', label: 'Документация' },
    { link: 'https://api.intervals.ru', label: 'API' },
];

export const FooterWidget = () => {
    const items = links.map((link) => (
        <Anchor
            c="dimmed"
            key={link.label}
            href={link.link}
            lh={1}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (

        <div className={classes.footer}>
            <div className={classes.inner}>

                <Group className={classes.links}>{items}</Group>


            </div>
        </div>

    );
}