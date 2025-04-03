import React from 'react';
import classNames from 'classnames';

import { Icons } from '../index';

import use from './use';

import styles from './styles.module.scss';

const LayoutControls = () => {
    const { changeDraggable, changeResizable, layoutProps } = use();

    return (
        <div className={styles.layoutController}>
            <div
                className={classNames({ [styles.toggleLayoutRedactor]: true, [styles.toggleLayoutRedactor_active]: layoutProps.isDraggable })}
                onClick={changeDraggable}
            >
                <Icons icon={'layout'} />
            </div>
            <div
                className={classNames({ [styles.toggleLayoutRedactor]: true, [styles.toggleLayoutRedactor_active]: layoutProps.isResizable })}
                onClick={changeResizable}
            >
                <Icons icon={'resize'} />
            </div>
        </div>
    );
};

export default LayoutControls;
