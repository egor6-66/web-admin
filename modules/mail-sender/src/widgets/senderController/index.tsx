import React from 'react';
import { GridLayout } from '@packages/ui';

import AddConfig from './addConfig';
import ConfigsList from './configslist';

import styles from './styles.module.scss';

const SenderController = () => {
    const layout = GridLayout.use({
        layoutName: 'mail_sender_sender_controller_layout',
        uselessSpace: 170,
        globalPercent: 50,
        items: [
            { i: 'addConfig', w: 5, h: 10, x: 0, y: 0 },
            { i: 'configList', w: 5, h: 10, x: 5, y: 0 },
        ],
    });

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
