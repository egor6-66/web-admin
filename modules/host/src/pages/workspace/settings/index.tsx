import React, { useRef } from 'react';
import { useStateCustom } from '@packages/hooks';
import { AnimatePresence, Button, Input } from '@packages/ui';

import { useModules } from '@/features';

import styles from './styles.module.scss';

const SettingsPage = () => {
    const { downloadModule, getAvailableModules, deleteBuild } = useModules();
    const { mutate: mutateDownloadBuild } = downloadModule();
    const file = useStateCustom(null);
    const { mutate: mutateDeleteBuild } = deleteBuild();
    const { data: availableModules, refetch } = getAvailableModules();
    const msg = useStateCustom('');
    const ref = useRef(null);

    const handleDeleteBuild = (name: string, version: string) => {
        mutateDeleteBuild(
            { name, version, msg: msg.value },
            {
                onSuccess: () => {
                    refetch();
                },
            }
        );
    };

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
            <div className={styles.message}>
                <div>СООБЩЕНИЕ</div>
                <div className={styles.textarea}>
                    <textarea
                        onChange={(e) => {
                            msg.set(e.target.value);
                        }}
                    />
                    <AnimatePresence visible={!!file.value} className={styles.sendBtn}>
                        <Button onClick={handleDownloadBuild}>отправить </Button>
                    </AnimatePresence>
                </div>
            </div>
            <div className={styles.download}>
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
            <div className={styles.allModules}>
                <Input inputAttrs={{ placeholder: 'url' }} />
                {availableModules?.modules.map((i: any) => (
                    <div key={i.manifest?.name} className={styles.item}>
                        <div className={styles.name}>{i.manifest?.name}</div>
                        <div className={styles.builds}>
                            {i?.builds?.map((b: any) => (
                                <div key={b} className={styles.item}>
                                    <div>{b}</div>
                                    {i.manifest.name !== 'host' && (
                                        <div className={styles.delete} onClick={() => handleDeleteBuild(i.manifest.name, b)}>
                                            УДАЛИТЬ
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingsPage;
