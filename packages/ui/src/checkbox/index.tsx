import React, { forwardRef } from 'react';
import { useStateCustom } from '@packages/hooks';

import AnimatePresence from '../animatePresence';
import Icons from '../icons';

import { IProps } from './interfaces';

import styles from './styles.module.scss';

const Checkbox = forwardRef((props: IProps, ref) => {
    const { wrapperStyle, isLoading, displayName, ...attrs } = props;
    const state = useStateCustom(false);

    return (
        <div className={styles.wrapper} style={wrapperStyle}>
            <div className={styles.checkboxWrapper} {...attrs} onClick={state.toggle}>
                <AnimatePresence visible={state.value} className={styles.icon}>
                    <Icons icon={'select'} />
                </AnimatePresence>
            </div>
            <span className={styles.name}>{displayName}</span>
        </div>
    );
});

export default Checkbox;
