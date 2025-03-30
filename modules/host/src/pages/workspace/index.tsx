import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useModuleLoader, useRouting } from '@packages/hooks';
import { AnimatePresence, INavigation, Navigation } from '@packages/ui';

import { useConfigs, useModules } from '@/features';
import { AppState } from '@/widgets';

import styles from './styles.module.scss';

const WorkspacePage = () => {
    const { location, navigateWithParam, getParams } = useRouting();

    const { getAvailableModules } = useModules();
    const { getConfig } = useConfigs();

    const { data: availableModules } = getAvailableModules();

    const params = getParams();

    const modulesDictionary: Record<string, any> = {
        mail_sender: {
            url: `${window.location.hostname}/mail_sender/remoteEntry.js`,
            scope: 'mail_sender',
            module: './MailSender',
        },
    };

    const targetModule = modulesDictionary[params.moduleName] || null;

    const { Module } = useModuleLoader({
        ...targetModule,
        errorComponent: <div>{`Не удалось загрузить модуль ${params.moduleName.toUpperCase()}`}</div>,
        loadingComponent: <div>LOADING</div>,
        disabled: !Object.keys(modulesDictionary).includes(params.moduleName),
    });

    const moduleRoutes = [{ name: 'mail_sender', element: <Module /> }];

    useEffect(() => {
        if (!targetModule) {
            navigateWithParam('', 'moduleName', 'mail_sender');
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigations}>
                <Navigation items={availableModules?.modules} handleNavClick={(item) => navigateWithParam('', 'moduleName', item.name)} />
                <AppState operatorName={'Egor'} />
            </div>
            <AnimatePresence visible={true} className={styles.content} animationKey={params.moduleName}>
                <Routes location={location} key={params.moduleName}>
                    {moduleRoutes.map((module) => (
                        <Route key={module.name} path={`moduleName/:${module.name}`} element={module.element} />
                    ))}
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default WorkspacePage;
