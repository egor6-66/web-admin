import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useModuleLoader, useRouting } from '@packages/hooks';
import { AnimatePresence, INavigation, Navigation } from '@packages/ui';

import { useConfigs, useModules } from '@/features';
import { AppState } from '@/widgets';

import styles from './styles.module.scss';

const ModulePage = (props: any) => {
    const { location, navigateWithParam, getParams } = useRouting();
    const { builds, manifest } = props;

    const { Module } = useModuleLoader({
        url: `https://localhost/modules/${manifest.name}/1.0.0/remoteEntry.js`,
        scope: manifest.name,
        module: `./${manifest.name
            .split('_')
            .map((i: string) => i.charAt(0).toUpperCase() + String(i).slice(1))
            .join('')}`,
        errorComponent: <div>{`Не удалось загрузить модуль ${manifest.name.toUpperCase()}`}</div>,
        loadingComponent: <div>LOADING</div>,
        // disabled: !Object.keys(modulesDictionary).includes(params.moduleName),
    });

    const moduleRoutes = [{ name: 'mail_sender', element: <Module /> }];

    useEffect(() => {
        // if (!targetModule) {
        //     navigateWithParam('', 'moduleName', 'mail_sender');
        // }
    }, []);

    return (
        <div className={styles.wrapper}>
            <Module />
        </div>
    );
};

export default ModulePage;
