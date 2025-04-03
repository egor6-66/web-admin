import React, { useRef } from 'react';
import { useStateCustom, useYup } from '@packages/hooks';
import { GridLayout } from '@packages/ui';

import AddConfig from './addConfig';
import ConfigsList from './configslist';

import styles from './styles.module.scss';

const SenderController = () => {
    const error = useStateCustom('');
    const yup = useYup();

    const layout = GridLayout.use({
        items: [
            { i: 'recipient', w: 10, h: 5, x: 0, y: 0 },
            { i: 'sender', w: 10, h: 5, x: 5, y: 0 },
        ],
    });

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
            <div className={styles.widgets}>
                <GridLayout {...layout} className={styles.grid}>
                    {(item) => {
                        switch (item.i) {
                            case 'addConfig':
                                return <AddConfig />;

                            case 'configList':
                                return <ConfigsList />;
                        }
                    }}
                </GridLayout>
            </div>
        </div>
    );
};

export default SenderController;
