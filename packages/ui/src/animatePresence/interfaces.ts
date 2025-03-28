import { AnimatePresenceProps, MotionProps } from 'framer-motion';

import animationVariant from './animations';

export interface IProps {
    visible: boolean;
    animationKey?: string;
    className: string;
    motion?: MotionProps;
    presence?: AnimatePresenceProps;
    animationVariant?: keyof typeof animationVariant;
    duration?: number;
}
