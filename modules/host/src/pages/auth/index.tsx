import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@packages/ui';

import styles from './styles.module.scss';

const AuthPage = () => {
    const navigate = useNavigate();

    const inputProps = {
        nameStyle: { width: 80 },
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.widget}>
                <div>ADMIN</div>
                <div className={styles.inputs}>
                    <Input displayName={'LOGIN'} {...inputProps} />
                    <Input displayName={'PASSWORD'} {...inputProps} />
                </div>

                <Button onClick={() => navigate('/workspace/moduleName')}>login</Button>
            </div>
        </div>
    );
};

export default AuthPage;
