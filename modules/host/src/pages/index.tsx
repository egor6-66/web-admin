import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRouting } from '@packages/hooks';
import { AnimatePresence } from '@packages/ui';

import AuthPage from './auth';
import WorkspacePage from './workspace';

import styles from './styles.module.scss';

const Pages = () => {
    const { getSegment, location } = useRouting();
    const animationKey = getSegment(1);

    return (
        <div className={styles.wrapper}>
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
