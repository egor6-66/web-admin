import React from 'react';
import { useRouting, useStateCustom } from '@packages/hooks';
import { GridLayout, Icons, IGridLayout } from '@packages/ui';
import classNames from 'classnames';

import { RecipientController, SenderController } from '@/widgets';

import styles from './styles.module.scss';

const Pages = () => {
    const activeEditor = useStateCustom(true);
    const { getParams } = useRouting();
    const params = getParams();
    const activeDnD = useStateCustom(false);
    const activeResize = useStateCustom(false);

    const widgets = useStateCustom<IGridLayout.Items>(
        [
            { i: 'recipient', w: 10, h: 5, x: 0, y: 0 },
            { i: 'sender', w: 10, h: 5, x: 5, y: 0 },
        ],
        {
            storage: {
                key: 'mail_sender_grid',
            },
        }
    );

    const handleChangeLayout = (layout: any) => {
        widgets.set(layout);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.layoutControls}>
                <div
                    className={classNames({ [styles.toggleLayoutRedactor]: true, [styles.toggleLayoutRedactor_active]: activeDnD.value })}
                    onClick={activeDnD.toggle}
                >
                    <Icons icon={'layout'} />
                </div>
                <div
                    className={classNames({ [styles.toggleLayoutRedactor]: true, [styles.toggleLayoutRedactor_active]: activeResize.value })}
                    onClick={activeResize.toggle}
                >
                    <Icons icon={'resize'} />
                </div>
            </div>
            <div className={styles.widgets}>
                <GridLayout
                    items={widgets.value}
                    className={styles.grid}
                    isDraggable={activeDnD.value}
                    isResizable={activeResize.value}
                    onLayoutChange={handleChangeLayout}
                >
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
