import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useModuleLoader, useRouting, useStateCustom } from '@packages/hooks';
import { AnimatePresence, INavigation, Navigation } from '@packages/ui';

import { useConfigs, useModules } from '@/features';
import { AppState } from '@/widgets';

import styles from './styles.module.scss';

const SettingsPage = (props: any) => {
    const { downloadModule } = useModules();
    const { mutate } = downloadModule();

    return (
        <div className={styles.wrapper}>
            SettingsPage
            <input
                type={'file'}
                onChange={(e) => {
                    const formData: any = new FormData();
                    formData.append('file', e.target.files[0]);
                    mutate(formData);
                }}
            />
        </div>
    );
};

export default SettingsPage;
