import React, { useEffect, useRef, useState } from 'react';
import { useClickAway } from '@packages/hooks';
import { motion } from 'framer-motion';

import AnimatePresence from '../animatePresence';
import Icons from '../icons';

import { IProps } from './interfaces';

import styles from './styles.module.scss';

const Dropdown = (props: IProps) => {
    const { visible = false, items, onClickAway } = props;
    const [openDropdown, setOpenDropdown] = useState(visible);

    const ref = useRef(null);

    useClickAway(ref, () => {
        setOpenDropdown(false);
        onClickAway && onClickAway();
    });

    useEffect(() => {
        setOpenDropdown(visible);
    }, [visible]);

    return (
        <div className={styles.wrapper} ref={ref}>
            <motion.div animate={{ rotate: openDropdown ? 90 : 0 }} className={styles.trigger} onClick={() => setOpenDropdown((prev) => !prev)}>
                <Icons icon={openDropdown ? 'close' : 'arrow'} />
            </motion.div>
            <div className={styles.dropdownContainer}>
                <AnimatePresence animationVariant={'autoHeight'} visible={openDropdown} className={styles.dropdown}>
                    {props.items.map((item: any) => (
                        <div key={item.name} className={styles.item} onClick={item.onClick}>
                            {item.displayName}
                        </div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Dropdown;
