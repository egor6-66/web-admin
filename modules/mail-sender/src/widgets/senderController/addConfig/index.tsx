import React, { useRef } from 'react';
import { useStateCustom, useYup } from '@packages/hooks';
import { AnimatePresence, Button, Input } from '@packages/ui';

import styles from './styles.module.scss';

const AddConfig = () => {
    const error = useStateCustom('');
    const yup = useYup();

    const configSchema = useRef(
        yup.object({
            password: yup.string().required(),
            username: yup.string().required(),
            port: yup.number().required().positive().integer(),
            host: yup.string().ipv4().required(),
        })
    );

    const config = useStateCustom(configSchema.current.getDefault());

    const handleChangeConfig = (key: string, value: string) => {
        config.set((prev: any) => ({ ...prev, [key]: value }));
    };

    const sendConfig = async () => {
        try {
            await configSchema.current.validate(config.value);
            alert(JSON.stringify(config.value, null, 2));
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
                        trim
                        displayName={key}
                        nameStyle={{
                            width: 60,
                        }}
                        value={val as string}
                        inputAttrs={{
                            onChange: (e) => {
                                handleChangeConfig(key, e.target.value);
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
