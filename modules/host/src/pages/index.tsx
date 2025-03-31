import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRouting } from '@packages/hooks';
import { AnimatePresence, Button } from '@packages/ui';
import { io } from 'socket.io-client';

import AuthPage from './auth';
import WorkspacePage from './workspace';

import styles from './styles.module.scss';
const url = window.location.hostname;

const socket = io(url, {
    reconnection: true,
    path: '/my-custom-path',
    transports: ['polling', 'websocket'],
    // withCredentials: false,
});

const Pages = () => {
    const { getSegment, location } = useRouting();
    const animationKey = getSegment(1);
    const [messages, setMessages] = useState('');

    useEffect(() => {
        let storedUserId = sessionStorage.getItem('userId');

        if (!storedUserId) {
            storedUserId = Math.random().toString(36).substring(7);
            sessionStorage.setItem('userId', storedUserId);
        }

        socket.on('receiveMessage', (message) => {
            if (!localStorage.getItem('notOff')) {
                setMessages(message);
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    return (
        <div className={styles.wrapper}>
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
                    <Route path="*" element={<Navigate to={'auth'} />} />
                    <Route path="auth/*" element={<AuthPage />} />
                    <Route path="workspace/*" element={<WorkspacePage />} />
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default Pages;
