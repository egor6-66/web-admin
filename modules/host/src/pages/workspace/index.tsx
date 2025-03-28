import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useModuleLoader, useRouting, useStateCustom } from '@packages/hooks';
import { AnimatePresence, INavigation, Navigation } from '@packages/ui';

import styles from './styles.module.scss';

const WorkspacePage = () => {
    const { location, navigateWithParam, getParams } = useRouting();

    const navItems: INavigation.Items = [{ name: 'mail_sender', displayName: 'ПОЧТА' }];
    const params = getParams();

    const modulesDictionary: Record<string, any> = {
        mail_sender: {
            url: 'https://localhost/mail_sender/remoteEntry.js',
            scope: 'mail_sender',
            module: './MailSender',
        },
    };

    const targetModule = modulesDictionary[params.moduleName] ?? {};

    const { Module } = useModuleLoader({
        ...targetModule,
        errorComponent: '',
        loadingComponent: '',
        disabled: !Object.keys(modulesDictionary).includes(params.moduleName),
    });

    const moduleRoutes = [{ name: 'mail_sender', element: <Module /> }];

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigations}>
                <Navigation items={navItems} handleNavClick={(item) => navigateWithParam('', 'moduleName', item.name)} />
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
