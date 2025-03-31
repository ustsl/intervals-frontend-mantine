import styles from './ObjectSaverFeature.module.css';
import { useState } from 'react';
import { Button, Text } from '@mantine/core';

import { IObjectSaverFeature } from './ObjectSaverFeature.props';
import { saveObject } from './ObjectSaver.func';

export const ObjectSaverFeature = ({ url, body }: IObjectSaverFeature) => {
    const [saving, setSaving] = useState<boolean>(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const handleSave = async () => {
        setSaving(true);
        setSaveError(null);
        try {
            await saveObject(url, body);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setSaveError(err.message);
            } else {
                setSaveError('Неизвестная ошибка');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <div className={styles.block}>
                <Button onClick={handleSave} loading={saving} fullWidth>
                    Сохранить
                </Button>
            </div>
            {saveError && <Text c="red">{saveError}</Text>}
        </>
    );
};
