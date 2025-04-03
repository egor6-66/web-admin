import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRouting } from '@packages/hooks';
import { AnimatePresence, Navigation } from '@packages/ui';

import { useModules } from '@/features';
import { AppState } from '@/widgets';

import ModulePage from './module';

import styles from './styles.module.scss';

const WorkspacePage = () => {
    const { location, navigateWithParam, getParams } = useRouting();

    const { getAvailableModules } = useModules();

    const { data: availableModules } = getAvailableModules();
    const params = getParams();

    const modules = useMemo(() => {
        const arr: any = [];

        if (availableModules?.modules) {
            Object.entries(availableModules?.modules).forEach(([key, val]: any) => {
                if (key !== 'host') {
                    arr.push({ displayName: val.manifest.displayName, name: val.manifest.name });
                }
            });
        }

        return arr;
    }, [availableModules]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigations}>
                <Navigation items={modules} handleNavClick={(item: any) => navigateWithParam('', 'module', item.name)} />
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
