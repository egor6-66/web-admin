import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useModuleLoader, useRouting, useStateCustom } from '@packages/hooks';
import { AnimatePresence, INavigation, Navigation } from '@packages/ui';

import { useConfigs, useModules } from '@/features';
import SettingsPage from '@/pages/workspace/settings';
import { AppState } from '@/widgets';

import styles from './styles.module.scss';
const url = window.location.hostname;

const ModulePage = (props: any) => {
    const { location, navigateWithParam, getParams } = useRouting();
    const { module } = getParams();
    const { getModule } = useModules();
    const { data: moduleData } = getModule(module);
    const isHost = module === 'host';
    console.log(url);

    const targetVersion = useStateCustom('', {
        storage: {
            key: `${module}_version`,
        },
    });

    useEffect(() => {
        if (!targetVersion.value && moduleData) {
            targetVersion.set(moduleData?.builds[0]);
        }
    }, [moduleData]);

    const { Module } = useModuleLoader({
        url: `https://${url}/modules/${module}/${targetVersion.value}/remoteEntry.js`,
        scope: module,
        version: targetVersion.value,
        module: `./${module
            .split('_')
            .map((i: string) => i.charAt(0).toUpperCase() + String(i).slice(1))
            .join('')}`,
        disabled: isHost || !targetVersion.value,
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                СБОРКИ:
                {moduleData?.builds?.length
                    ? moduleData?.builds.map((i: any) => (
                          <div
                              key={i}
                              className={`${i === targetVersion.value ? styles.versions : ''}`}
                              onClick={() => {
                                  targetVersion.set(i);
                                  window.location.reload();
                              }}
                          >
                              {i}
                          </div>
                      ))
                    : null}
            </div>
            <div className={styles.module}>{isHost ? <SettingsPage /> : <Module />}</div>
        </div>
    );
};

export default ModulePage;
