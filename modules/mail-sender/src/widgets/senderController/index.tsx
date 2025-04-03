import React from 'react';
import { useStateCustom } from '@packages/hooks';
import { GridLayout } from '@packages/ui';

import AddConfig from './addConfig';
import ConfigsList from './configslist';

import styles from './styles.module.scss';

const SenderController = () => {
    const error = useStateCustom('');

    const layout = GridLayout.use({
        layoutName: 'mail_sender_main_layout',
        items: [
            { i: 'sender', w: 10, h: 5, x: 0, y: 0 },
            { i: 'recipient', w: 10, h: 5, x: 5, y: 0 },
        ],
    });

    const config = useStateCustom([]);

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
