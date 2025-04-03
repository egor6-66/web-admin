import React from 'react';
import { GridLayout } from '@packages/ui';

import { AddConfig, AddRecipient, ConfigsList, RecipientsList } from '@/widgets';

import styles from './styles.module.scss';

const Pages = () => {
    const layout = GridLayout.use({
        layoutName: 'mail_sender_main_layout',
        items: [
            { i: 'addConfig', w: 5, h: 5, x: 0, y: 0 },
            { i: 'configList', w: 5, h: 5, x: 5, y: 0 },
            { i: 'addRecipient', w: 5, h: 5, x: 0, y: 5 },
            { i: 'recipientList', w: 5, h: 5, x: 5, y: 5 },
        ],
    });

    return (
        <div className={styles.wrapper}>
            <GridLayout.controller />
            <div className={styles.widgets}>
                <GridLayout {...layout} className={styles.grid}>
                    {(item) => {
                        switch (item.i) {
                            case 'addConfig':
                                return <AddConfig />;

                            case 'configList':
                                return <ConfigsList />;

                            case 'addRecipient':
                                return <AddRecipient />;

                            case 'recipientList':
                                return <RecipientsList />;
                        }
                    }}
                </GridLayout>
            </div>
        </div>
    );
};

export default Pages;
