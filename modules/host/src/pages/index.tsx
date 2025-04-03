import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRouting } from '@packages/hooks';
import { useWS } from '@packages/hooks';
import { AnimatePresence, Button } from '@packages/ui';

import pcg from '../../package.json';

import AuthPage from './auth';
import WorkspacePage from './workspace';

import styles from './styles.module.scss';

const Pages = () => {
    const { getSegment, location } = useRouting();
    const animationKey = getSegment(1);
    const [messages, setMessages] = useState('');
    const ws = useWS();

    useEffect(() => {
        const listener = ws.listener('receiveMessage', (message) => {
            if (!localStorage.getItem('notOff')) {
                setMessages(message);
            }
        });

        return () => {
            listener();
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.moduleInfo}>
                <div>name: {pcg.name}</div>
                <div>version: {pcg.version}</div>
            </div>
            <AnimatePresence visible={!!messages} className={styles.message}>
                <div>{messages}</div>
                <div className={styles.btns}>
                    <Button onClick={() => setMessages('')}>позже</Button>
                    <Button
                        onClick={() => {
                            setMessages('');
                            window.location.reload();
                        }}
                    >
                        обновить
                    </Button>
                </div>
            </AnimatePresence>
            <AnimatePresence className={styles.main} animationKey={animationKey} visible={true}>
                <Routes location={location} key={animationKey}>
                    <Route path="*" element={<AuthPage />} />
                    <Route path="auth/*" element={<AuthPage />} />
                    <Route path="workspace/*" element={<WorkspacePage />} />
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default Pages;
