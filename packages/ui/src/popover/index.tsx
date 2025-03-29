import React, { PropsWithChildren, useState } from 'react';
import * as RTP from 'react-tiny-popover';
import { motion } from 'framer-motion';

import AnimatePresence from '../animatePresence';
import Icons from '../icons';

import { IProps } from './interfaces';

import styles from './styles.module.scss';

const Popover = (props: PropsWithChildren<IProps>) => {
    const { children, className } = props;
    const [openDropdown, setOpenDropdown] = useState(false);
    const [visible, setVisible] = useState(false);

    const hidePopover = () => {
        setVisible(false);
        setTimeout(() => {
            setOpenDropdown(false);
        }, 100);
    };

    const toggleOpenDropdown = () => {
        if (!openDropdown) {
            setOpenDropdown(true);
            setTimeout(() => {
                setVisible(true);
            }, 100);
        } else {
            hidePopover();
        }
    };

    return (
        <div className={styles.wrapper}>
            <RTP.Popover
                isOpen={openDropdown}
                positions={['bottom', 'left']}
                reposition
                onClickOutside={hidePopover}
                content={
                    <AnimatePresence visible={visible} className={className} animationVariant={'autoHeight'}>
                        {children}
                    </AnimatePresence>
                }
            >
                <motion.div animate={{ rotate: openDropdown ? 90 : 0 }} className={styles.trigger} onClick={toggleOpenDropdown}>
                    <Icons icon={openDropdown ? 'close' : 'arrow'} />
                </motion.div>
            </RTP.Popover>
        </div>
    );
};

export default Popover;
