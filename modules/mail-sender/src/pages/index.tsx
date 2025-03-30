import React from 'react';
import { useRouting, useStateCustom } from '@packages/hooks';
import { GridLayout, IGridLayout } from '@packages/ui';

import { useConfig } from '@/features';
import { ConfigEditor, ServersUrls, Settings } from '@/widgets';

import styles from './styles.module.scss';

const Pages = () => {
    const activeEditor = useStateCustom(true);
    const { getParams } = useRouting();
    const params = getParams();
    console.log(params);

    const { getConfig, getBuilds } = useConfig();
    const { data } = getBuilds(params.moduleName);
    console.log(data);

    const widgets: IGridLayout.Items = [
        { name: 'settings', grid: { w: 5, h: 5, x: 0, y: 0, static: !activeEditor.value } },
        { name: 'servers_urls', grid: { w: 5, h: 5, x: 5, y: 0, static: !activeEditor.value } },
        { name: 'config_editor', grid: { w: 10, h: 5, x: 0, y: 5, static: !activeEditor.value } },
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
