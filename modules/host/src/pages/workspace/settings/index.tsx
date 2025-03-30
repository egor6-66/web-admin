import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useModuleLoader, useRouting, useStateCustom } from '@packages/hooks';
import { AnimatePresence, Button, INavigation, Navigation } from '@packages/ui';

import { useConfigs, useModules } from '@/features';
import { AppState } from '@/widgets';

import styles from './styles.module.scss';

const SettingsPage = () => {
    const { downloadModule } = useModules();
    const { mutate } = downloadModule();
    const file = useStateCustom(null);

    return (
        <div className={styles.wrapper}>
            <div className={styles.download}>
                <div>ЗАГРУЗИТЬ СБОРКУ</div>
                <div className={styles.controller}>
                    <input
                        type={'file'}
                        accept=".zip"
                        onChange={(e) => {
                            const formData: any = new FormData();
                            formData.append('file', e.target.files[0]);
                            file.set(formData);
                            mutate(formData);
                        }}
                    />
                    <AnimatePresence visible={!!file.value} className={styles.sendBtn}>
                        <Button onClick={() => mutate(file.value)}>отправить </Button>
                    </AnimatePresence>
                </div>
            </div>
            <div className={styles.allModules}>SettingsPage</div>
        </div>
    );
};

export default SettingsPage;
