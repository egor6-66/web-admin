import React, { useEffect, useState } from 'react';
import { useStateCustom } from '@packages/hooks';
import { Button, Input } from '@packages/ui';

import { useTerminal, useWS } from '@/features';

import styles from './styles.module.scss';

const defaultMessages = [{ text: `connect to ${window.location.origin}` }];

const Terminal = () => {
    const { sendCommand } = useTerminal();
    const messages = useStateCustom(defaultMessages);

    const { mutate: mutateCommand } = sendCommand();
    const hostInput = Input.use({});
    const commandInput = Input.use({});
    const disabledInput = useStateCustom(false);
    const ws = useWS();

    const handleKeyPress = (e: any) => {
        if (e.code === 'Enter') {
            disabledInput.set(true);
            mutateCommand(commandInput.value, {
                onSuccess: () => {
                    messages.set((prev) => [...prev, { text: commandInput.value }]);
                    commandInput.setValue('');
                },
            });
        }
    };

    useEffect(() => {
        const listener = ws.listener('terminal', (message) => {
            console.log(messages);
            messages.set((prev) => [...prev, { text: message }]);
        });

        return () => {
            listener();
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <div>ТЕРМИНАЛ</div>
            <div className={styles.host}>
                <Input inputAttrs={hostInput.inputAttrs} displayName={'Host'} />

                <Button disabled={!hostInput.value} style={{ width: 190 }}>
                    подключиться
                </Button>
            </div>
            <div className={styles.terminal}>
                {messages.value.map((i, index) => (
                    <div key={index}>{i.text}</div>
                ))}
                <input onKeyPress={handleKeyPress} autoFocus {...commandInput.inputAttrs} />
            </div>
        </div>
    );
};

export default Terminal;
