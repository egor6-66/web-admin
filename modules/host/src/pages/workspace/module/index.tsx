import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useModuleLoader, useRouting, useStateCustom } from '@packages/hooks';
import { AnimatePresence, INavigation, Navigation } from '@packages/ui';

import { useConfigs, useModules } from '@/features';
import { AppState } from '@/widgets';

import styles from './styles.module.scss';

const ModulePage = (props: any) => {
    const { location, navigateWithParam, getParams } = useRouting();
    const { builds, manifest } = props;

    const targetVersion = useStateCustom(builds[0], {
        storage: {
            key: 'module_version',
        },
    });

    console.log(targetVersion.value);

    const { Module } = useModuleLoader({
        url: `https://localhost/modules/${manifest.name}/${targetVersion.value}/remoteEntry.js`,
        scope: manifest.name,
        version: targetVersion.value,
        module: `./${manifest.name
            .split('_')
            .map((i: string) => i.charAt(0).toUpperCase() + String(i).slice(1))
            .join('')}`,
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <select
                    onChange={(e) => {
                        targetVersion.set(e.target.value);
                    }}
                >
                    {builds.map((i: any) => (
                        <option key={i}>{i}</option>
                    ))}
                </select>
            </div>
            <div className={styles.module}>
                <Module />
            </div>
        </div>
    );
};

export default ModulePage;
