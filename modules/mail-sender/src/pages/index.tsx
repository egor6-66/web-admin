import React from 'react';
import { useStateCustom } from '@packages/hooks';
import { GridLayout, IGridLayout } from '@packages/ui';

import { ConfigEditor, ServersUrls, Settings } from '@/widgets';

import styles from './styles.module.scss';

const Pages = () => {
    const activeEditor = useStateCustom(false);

    const widgets: IGridLayout.Items = [
        { name: 'settings', grid: { w: 120, h: 1, x: 0, y: 0, static: !activeEditor.value } },
        { name: 'servers_urls', grid: { w: 120, h: 1, x: 120, y: 0, static: !activeEditor.value } },
        { name: 'config_editor', grid: { w: 240, h: 1, x: 0, y: 120, static: !activeEditor.value } },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div onClick={activeEditor.toggle}>DKWdw</div>
            </div>
            <GridLayout items={widgets} className={styles.grid}>
                {(item) => {
                    switch (item.name) {
                        case 'settings':
                            return <Settings />;

                        case 'servers_urls':
                            return <ServersUrls />;

                        case 'config_editor':
                            return <ConfigEditor />;
                    }
                }}
            </GridLayout>
        </div>
    );
};

export default Pages;
