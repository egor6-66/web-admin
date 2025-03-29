import React from 'react';
import { Button, Input } from '@packages/ui';

import { useAuth } from '@/features';

import styles from './styles.module.scss';

const Auth = () => {
    const sharedInputProps = {
        nameStyle: { width: 55 },
    };

    const loginInput = Input.use({ required: true, cut: /\s/, displayName: 'LOGIN', inputAttrs: { placeholder: 'Введите логин' }, ...sharedInputProps });
    const passInput = Input.use({ required: true, cut: /\s/, displayName: 'PASS', inputAttrs: { placeholder: 'Введите пароль' }, ...sharedInputProps });

    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            await Promise.all(
                [loginInput, passInput].map(async (i) => {
                    return i.checkValid((value, yap) => {
                        return yap.string().required('поле обязательно для ввода').min(3, 'минимум 3 символа').validate(value);
                    });
                })
            );

            login({ login: loginInput.value, pass: passInput.value });
        } catch (e) {
            return;
        }
    };

    return (
        <div className={styles.wrapper}>
            <div>ADMIN</div>
            <div className={styles.inputs}>
                <Input {...loginInput} />
                <Input {...passInput} />
            </div>

            <Button onClick={handleLogin}>login</Button>
        </div>
    );
};

export default Auth;
