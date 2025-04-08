"use client";

import React from 'react';
import { ActionIcon } from '@mantine/core';
import { IconFileTypePdf } from '@tabler/icons-react';

export const PDFButtonFeature = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <ActionIcon
            variant="gradient"
            size={30}
            aria-label="Gradient action icon"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            onClick={handlePrint}
        >
            <IconFileTypePdf />
        </ActionIcon>
    );
};
