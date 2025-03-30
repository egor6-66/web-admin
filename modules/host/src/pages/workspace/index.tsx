import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useModuleLoader, useRouting } from '@packages/hooks';
import { AnimatePresence, INavigation, Navigation } from '@packages/ui';

import { useConfigs, useModules } from '@/features';
import { AppState } from '@/widgets';

import ModulePage from './module';
import SettingsPage from './settings';

import styles from './styles.module.scss';

const WorkspacePage = () => {
    const { location, navigateWithParam, getParams } = useRouting();

    const { getAvailableModules } = useModules();

    const { data: availableModules } = getAvailableModules();
    const params = getParams();

    useEffect(() => {
        // if (!targetModule) {
        //     navigateWithParam('', 'moduleName', 'mail_sender');
        // }
    }, []);
    console.log(availableModules);

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigations}>
                <Navigation
                    items={availableModules?.modules.map((i: any) => ({ ...i.manifest, builds: i.builds }))}
                    handleNavClick={(item: any) => navigateWithParam('', 'moduleName', item.name)}
                />
                <AppState operatorName={'Egor'} />
            </div>
            <AnimatePresence visible={true} className={styles.content} animationKey={params.moduleName}>
                <Routes location={location} key={params.moduleName}>
                    {availableModules?.modules.map((module: any) => (
                        <Route key={module.manifest.name} path={`moduleName/:${module.manifest.name}`} element={<ModulePage />} />
                    ))}
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default WorkspacePage;
