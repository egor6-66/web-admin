import React from 'react';
import { useModuleLoader, useRouting } from '@packages/hooks';
import { api } from '@packages/utils';

import styles from './styles.module.scss';

const ModulePage = () => {
    const { getParams } = useRouting();
    const { baseUrl } = api;
    const { module } = getParams();
    const isHost = module === 'host';

    const { Module } = useModuleLoader({
        url: `${baseUrl}/standalone/${module}/latest/remoteEntry.js`,
        scope: module,
        version: 'latest',
        module: `./${module
            .split('_')
            .map((i: string) => i.charAt(0).toUpperCase() + String(i).slice(1))
            .join('')}`,
        disabled: isHost,
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>sefesf</div>
            <div className={styles.module}>{<Module />}</div>
        </div>
    );
};

export default ModulePage;
