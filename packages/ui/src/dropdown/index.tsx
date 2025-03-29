import React, { useEffect, useRef, useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { useClickAway } from '@packages/hooks';
import { motion } from 'framer-motion';

import AnimatePresence from '../animatePresence';
import Icons from '../icons';

import { IProps } from './interfaces';

import styles from './styles.module.scss';

const Dropdown = (props: IProps) => {
    const { visible = false, items, onClickAway } = props;
    const [openDropdown, setOpenDropdown] = useState(visible);

    useEffect(() => {
        setOpenDropdown(visible);
    }, [visible]);

    const toggleOpenDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    return (
        <div className={styles.wrapper}>
            <Popover
                containerClassName={styles.dropdown}
                isOpen={true}
                positions={['bottom', 'left']}
                align={'end'}
                padding={10} // adjust padding here!
                reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
                onClickOutside={() => setOpenDropdown(false)} // handle click events outside of the popover/target here!
                content={(
                    { position, nudgedLeft, nudgedTop } // you can also provide a render function that injects some useful stuff!
                ) => (
                    <div style={{ backgroundColor: 'red' }} className={styles.content}>
                        <div>wda</div>
                        <div>wda</div>
                        <div>wda</div>
                        <div>wda</div>
                        <div>wda</div>
                    </div>
                )}
            >
                <motion.div animate={{ rotate: openDropdown ? 90 : 0 }} className={styles.trigger} onClick={toggleOpenDropdown}>
                    <Icons icon={openDropdown ? 'close' : 'arrow'} />
                </motion.div>
            </Popover>
        </div>
    );
};

export default Dropdown;
