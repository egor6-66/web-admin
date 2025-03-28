import React from 'react';

import { Auth } from '@/widgets';

import styles from './styles.module.scss';

const AuthPage = () => {
    return (
        <div className={styles.wrapper}>
            <Auth />
        </div>
    );
};

export default AuthPage;
