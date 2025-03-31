import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRouting } from '@packages/hooks';
import { AnimatePresence, Navigation } from '@packages/ui';
import log from 'eslint-plugin-react/lib/util/log';

import { useModules } from '@/features';
import { AppState } from '@/widgets';

import ModulePage from './module';

import styles from './styles.module.scss';

const WorkspacePage = () => {
    const { location, navigateWithParam, getParams } = useRouting();

    const { getAvailableModules } = useModules();

    const { data: availableModules } = getAvailableModules();
    const params = getParams();

    useEffect(() => {
        if (!params.module && availableModules?.modules) {
            navigateWithParam('', 'module', availableModules.modules[0].manifest.name);
        }
    }, [availableModules]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigations}>
                <Navigation
                    items={availableModules?.modules.map((i: any) => ({ ...i.manifest, builds: i.builds }))}
                    handleNavClick={(item: any) => navigateWithParam('', 'module', item.name)}
                />
                <AppState operatorName={'Egor'} />
            </div>
            <AnimatePresence visible={true} className={styles.content} animationKey={params.module}>
                <Routes location={location}>
                    <Route path={`module/:name`} element={<ModulePage />} />
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default WorkspacePage;
