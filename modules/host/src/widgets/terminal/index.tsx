import React from 'react';
import { useStateCustom, useThemes } from '@packages/hooks';
import { Popover } from '@packages/ui';

import { useTerminal } from '@/features';

import { IProps } from './interfaces';

import styles from './styles.module.scss';

const Terminal = (props: IProps) => {
    const { sendCommand } = useTerminal();
    const command = useStateCustom('');
    const { mutate: mutateCommand } = sendCommand();

    return (
        <div className={styles.wrapper}>
            <textarea
                onKeyPress={(e) => {
                    e.code === 'Enter' && mutateCommand(command.value);
                }}
                className={styles.textarea}
                value={command.value}
                onChange={(e) => {
                    command.set(e.target.value);
                    console.log(e);
                }}
            ></textarea>
        </div>
    );
};

export default Terminal;
