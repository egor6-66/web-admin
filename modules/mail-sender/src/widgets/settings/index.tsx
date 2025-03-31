import React from 'react';
import { Button, Input } from '@packages/ui';

import styles from './styles.module.scss';

const Settings = () => {
    const sharedInputProps = {
        nameStyle: { width: 55 },
    };

    const loginInput = Input.use({ required: true, cut: /\s/, displayName: 'LOGIN', inputAttrs: { placeholder: 'Введите логин' }, ...sharedInputProps });
    const passInput = Input.use({ required: true, cut: /\s/, displayName: 'PASS', inputAttrs: { placeholder: 'Введите пароль' }, ...sharedInputProps });

    const handleLogin = async () => {
        console.log('wd');
    };

    return (
        <div className={styles.wrapper}>
            <div>SETTINGS</div>
        </div>
    );
};

export default Settings;
