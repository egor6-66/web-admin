import React, { forwardRef } from 'react';
import classNames from 'classnames';

import Icons from '../icons';

import { IProps } from './interfaces';

import styles from './styles.module.scss';

const Input = forwardRef((props: IProps, ref) => {
    const { id, required, isLoading, nameStyle, wrapperStyle, inputStyle, displayName, disabled, ...attrs } = props;

    const wrapperClasses = classNames({
        [styles.wrapper]: true,
    });

    const inputClasses = classNames({
        [styles.input]: true,
    });

    return (
        <div id={id} className={wrapperClasses} data-disabled={disabled} style={wrapperStyle}>
            <span className={styles.name} style={{ ...nameStyle }}>
                {displayName}
                <span className={styles.requiredIcon}>{required && <Icons icon={'required'} />}</span>
            </span>
            <input className={inputClasses} style={inputStyle} {...attrs} />
        </div>
    );
});

export default Input;
