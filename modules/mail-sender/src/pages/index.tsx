import React from 'react';
import { useStateCustom } from '@packages/hooks';
import { GridLayout, IGridLayout } from '@packages/ui';

import { ConfigEditor, ServersUrls, Settings } from '@/widgets';

import styles from './styles.module.scss';

const Pages = () => {
    const activeEditor = useStateCustom(false);

    const widgets: IGridLayout.Items = [
        { name: 'servers_urls', grid: { w: 27, h: 22, x: 13, y: 0, static: !activeEditor.value } },
        { name: 'settings', grid: { w: 13, h: 22, x: 0, y: 0, static: !activeEditor.value } },
        { name: 'config_editor', grid: { w: 40, h: 8, x: 0, y: 22, static: !activeEditor.value } },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div onClick={activeEditor.toggle}>DKWdw</div>
            </div>
            <GridLayout items={widgets} className={styles.grid}>
                {(item) => {
                    switch (item.name) {
                        case 'servers_urls':
                            return <ServersUrls />;

                        case 'settings':
                            return <Settings />;

                        case 'config_editor':
                            return <ConfigEditor />;
                    }
                }}
            </GridLayout>
        </div>
    );
};

export default Pages;
