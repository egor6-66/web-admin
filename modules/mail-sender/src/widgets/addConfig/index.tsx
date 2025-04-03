import React from 'react';
import { useStateCustom } from '@packages/hooks';
import { AnimatePresence, Button, Input } from '@packages/ui';

import { configSchema, configStore } from '@/entities';

import styles from './styles.module.scss';

const AddConfig = () => {
    const error = useStateCustom('');

    const configs = configStore.use.configs();
    const config = useStateCustom(configSchema.getDefault());

    const handleChangeConfig = (key: string, value: string) => {
        config.set((prev: any) => ({ ...prev, [key]: value }));
    };

    const sendConfig = async () => {
        try {
            await configSchema.validate(config.value);
            configs.set([config.value, ...configs.value]);
            config.set(configSchema.getDefault());
        } catch (e) {
            error.set(e.message);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Добавить конфиг</div>
            <div className={styles.fields}>
                {Object.entries(config.value).map(([key, val]) => (
                    <Input
                        key={key}
                        displayName={key}
                        nameStyle={{
                            width: 60,
                        }}
                        inputAttrs={{
                            value: typeof val === 'undefined' ? '' : (val as string),
                            onChange: (e) => {
                                handleChangeConfig(key, e.target.value.trim());
                                error.clear();
                            },
                        }}
                    />
                ))}
            </div>
            <div className={styles.controls}>
                <AnimatePresence visible={!!error.value} className={styles.error}>
                    {error.value}
                </AnimatePresence>
                <Button onClick={sendConfig}>отправить</Button>
            </div>
        </div>
    );
};

export default AddConfig;
