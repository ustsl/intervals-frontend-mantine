'use client'

import { useComputedColorScheme } from '@mantine/core';
import { useState, useEffect } from 'react';
import styles from './logo.module.css';
import logo from './logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { baseSizeType } from '@/types/base';

export const LogoComponent = ({ size }: { size?: baseSizeType }) => {
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Link href="/">
            <Image
                src={computedColorScheme === 'light' ? logo : logo}
                className={`${styles.logo} ${size && styles[`size${size}`]}`}
                alt="Intervals"
            />
        </Link>
    );
}

