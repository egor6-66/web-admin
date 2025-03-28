import React from 'react';
import classNames from 'classnames';

import AnimatePresence from '../animatePresence';
import Icons from '../icons';

import { IProps } from './interfaces';

import styles from './styles.module.scss';

const InputBase = (props: IProps) => {
    const { id, required, isLoading, nameStyle, wrapperStyle, inputStyle, displayName, disabled, inputAttrs, errorMessage } = props;
    console.log(errorMessage);

    const wrapperClasses = classNames({
        [styles.wrapper]: true,
    });

    const inputWrapperClasses = classNames({
        [styles.inputWrapper]: true,
        [styles.inputWrapper_error]: !!errorMessage,
    });

    return (
        <div id={id} className={wrapperClasses} data-disabled={disabled} style={wrapperStyle}>
            <span className={styles.name} style={{ ...nameStyle }}>
                {displayName}
                <span className={styles.requiredIcon}>{required && <Icons icon={'required'} />}</span>
            </span>
            <div className={inputWrapperClasses}>
                <AnimatePresence visible={!!errorMessage} className={styles.errorMessage}>
                    {errorMessage}
                </AnimatePresence>
                <input className={styles.input} style={inputStyle} {...inputAttrs} />
            </div>
        </div>
    );
};

export default InputBase;
