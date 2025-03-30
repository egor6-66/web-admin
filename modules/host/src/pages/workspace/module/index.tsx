import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useModuleLoader, useRouting, useStateCustom } from '@packages/hooks';
import { AnimatePresence, INavigation, Navigation } from '@packages/ui';

import { useConfigs, useModules } from '@/features';
import SettingsPage from '@/pages/workspace/settings';
import { AppState } from '@/widgets';

import styles from './styles.module.scss';

const ModulePage = (props: any) => {
    const { location, navigateWithParam, getParams } = useRouting();
    const { moduleName } = getParams();

    const { getModule } = useModules();
    const { data: moduleData } = getModule(moduleName);

    const isHost = moduleName === 'host';

    const targetVersion = useStateCustom('', {
        storage: {
            key: `${moduleName}_version`,
        },
    });

    console.log(targetVersion.value);
    useEffect(() => {
        !targetVersion.value && targetVersion.set(moduleData?.builds[0]);
    }, [moduleData]);

    const { Module } = useModuleLoader({
        url: `https://localhost/modules/${moduleName}/${targetVersion.value}/remoteEntry.js`,
        scope: moduleName,
        version: targetVersion.value,
        module: `./${moduleName
            .split('_')
            .map((i: string) => i.charAt(0).toUpperCase() + String(i).slice(1))
            .join('')}`,
        disabled: isHost,
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <select
                    onChange={(e) => {
                        targetVersion.set(e.target.value);
                    }}
                >
                    {moduleData?.builds.map((i: any) => (
                        <option key={i}>{i}</option>
                    ))}
                </select>
            </div>
            {/*<Module />*/}
            <div className={styles.module}>{isHost ? <SettingsPage /> : <Module />}</div>
        </div>
    );
};

export default ModulePage;
