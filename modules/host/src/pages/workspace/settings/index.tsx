import React, { useRef } from 'react';
import { useStateCustom } from '@packages/hooks';
import { AnimatePresence, Button, Input } from '@packages/ui';

import { useModules } from '@/features';
import { Directories, Download, Terminal } from '@/widgets';

import styles from './styles.module.scss';

const SettingsPage = () => {
    return (
        <div className={styles.wrapper}>
            <Terminal />
            <Download />
            <Directories />
        </div>
    );
};

export default SettingsPage;
