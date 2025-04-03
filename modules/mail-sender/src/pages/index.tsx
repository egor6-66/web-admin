import React from 'react';
import { GridLayout } from '@packages/ui';

import { RecipientController, SenderController } from '@/widgets';

import styles from './styles.module.scss';

const Pages = () => {
    const layout = GridLayout.use({
        layoutName: 'mail_sender_main_layout',
        items: [
            { i: 'recipient', w: 10, h: 5, x: 0, y: 0 },
            { i: 'sender', w: 10, h: 5, x: 0, y: 5 },
        ],
    });

    return (
        <div className={styles.wrapper}>
            <GridLayout.controller />
            <div className={styles.widgets}>
                <GridLayout {...layout} className={styles.grid}>
                    {(item) => {
                        switch (item.i) {
                            case 'recipient':
                                return <RecipientController />;

                            case 'sender':
                                return <SenderController />;
                        }
                    }}
                </GridLayout>
            </div>
        </div>
    );
};

export default Pages;
