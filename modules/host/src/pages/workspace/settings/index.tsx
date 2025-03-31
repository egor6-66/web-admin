import React from 'react';
import { GridLayout, IGridLayout } from '@packages/ui';

import { Directories, Download, Terminal } from '@/widgets';

import styles from './styles.module.scss';

const SettingsPage = () => {
    const widgets: IGridLayout.Items = [
        { name: 'terminal', grid: { w: 5, h: 5, x: 0, y: 0 } },
        { name: 'download', grid: { w: 5, h: 5, x: 5, y: 0 } },
        { name: 'directories', grid: { w: 10, h: 5, x: 0, y: 5 } },
    ];

    return (
        <div className={styles.wrapper}>
            <GridLayout items={widgets} className={styles.grid}>
                {(item) => {
                    switch (item.name) {
                        case 'terminal':
                            return <Terminal />;

                        case 'download':
                            return <Download />;

                        case 'directories':
                            return <Directories />;
                    }
                }}
            </GridLayout>
        </div>
    );
};

export default SettingsPage;
