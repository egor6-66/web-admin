import React from 'react';
import { useStateCustom } from '@packages/hooks';
import { Input } from '@packages/ui';

import { useModules } from '@/features';

import styles from './styles.module.scss';

const Directories = () => {
    const { getAvailableModules, deleteBuild } = useModules();

    const { mutate: mutateDeleteBuild } = deleteBuild();
    const { data: availableModules, refetch } = getAvailableModules();
    const msg = useStateCustom('');

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

    return (
        <div className={styles.wrapper}>
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
    );
};

export default Directories;
