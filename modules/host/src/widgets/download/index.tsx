import React, { useRef } from 'react';
import { useStateCustom } from '@packages/hooks';
import { AnimatePresence, Button, Input } from '@packages/ui';

import { useAuth, useModules } from '@/features';

import styles from './styles.module.scss';

const Download = () => {
    const ref = useRef(null);
    const file = useStateCustom(null);
    const { downloadModule, getAvailableModules, deleteBuild } = useModules();
    const { mutate: mutateDownloadBuild } = downloadModule();
    const { data: availableModules, refetch } = getAvailableModules();

    const handleDownloadBuild = () => {
        mutateDownloadBuild(file.value, {
            onSuccess: () => {
                file.set(null);
                ref.current.value = '';
                refetch();
            },
        });
    };

    return (
        <div className={styles.wrapper}>
            <div>ЗАГРУЗИТЬ СБОРКУ</div>
            <div className={styles.controller}>
                <input
                    ref={ref}
                    type={'file'}
                    accept=".zip"
                    onChange={(e) => {
                        const formData: any = new FormData();
                        formData.append('file', e.target.files[0]);
                        file.set(formData);
                    }}
                />
                <Input inputAttrs={{ placeholder: 'urls' }} />
                <AnimatePresence visible={!!file.value} className={styles.sendBtn}>
                    <Button onClick={handleDownloadBuild}>отправить </Button>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Download;
