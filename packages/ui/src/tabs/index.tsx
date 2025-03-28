import React, { PropsWithChildren, useEffect } from 'react';
import classNames from 'classnames';

import { IItem, IProps } from './interfaces';

import styles from './styles.module.scss';

const Tabs = (props: PropsWithChildren<IProps>) => {
    const { onMount, items, activeItem, children, className, handleTabClick } = props;

    const tabClick = (item: IItem) => {
        item.onClick && item.onClick(item);
        handleTabClick && handleTabClick(item);
    };

    useEffect(() => {
        onMount && onMount();
    }, []);

    return (
        <div className={classNames(styles.wrapper, className)}>
            <div className={styles.items}>
                {items.map((item) => {
                    return (
                        <div
                            key={item.name}
                            className={classNames(styles.item, activeItem === item.name ? styles.item_active : '')}
                            onClick={() => tabClick(item)}
                        >
                            {item.displayName}
                        </div>
                    );
                })}
            </div>
            {children}
        </div>
    );
};

export default Tabs;
