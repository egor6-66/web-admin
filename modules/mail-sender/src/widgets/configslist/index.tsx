import React from 'react';
import { useStateCustom } from '@packages/hooks';
import { AnimatePresence, Button } from '@packages/ui';
import classNames from 'classnames';

import { configStore } from '@/entities';

import styles from './styles.module.scss';

const ConfigsList = () => {
    const configs = configStore.use.configs();

    const preview = useStateCustom(null);
    const activeIndex = useStateCustom(-1);

    const showPreview = (index: number) => {
        preview.set(configs.value[index]);
        activeIndex.set(index);
    };

    const remove = () => {
        configs.set(configs.value.filter((i, index) => index !== activeIndex.value));
        preview.set(null);
        activeIndex.set(-1);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Список конфигов</div>
            <div className={styles.container}>
                <div className={styles.list}>
                    {configs.value.map((config, index) => (
                        <div
                            key={index}
                            className={classNames({ [styles.item]: true, [styles.item_active]: activeIndex.value === index })}
                            onClick={() => showPreview(index)}
                        >{`config ${index}`}</div>
                    ))}
                </div>
                <AnimatePresence visible={preview.value} className={styles.preview}>
                    <div className={styles.fields}>
                        {preview.value &&
                            Object.entries(preview.value).map(([key, val]) => (
                                <div className={styles.field} key={key}>
                                    <span>{key}</span>
                                    <span>{val as string}</span>
                                </div>
                            ))}
                    </div>
                    <Button onClick={remove} style={{ backgroundColor: 'red' }}>
                        удалить
                    </Button>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ConfigsList;
