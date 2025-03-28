import { useEffect } from 'react';

import { off, on } from '../_utils';
import useRafState from '../useRafState';

import { IOptions } from './interfaces';

export const isBrowser = typeof window !== 'undefined';

const useWindowSize = ({ initialWidth = Infinity, initialHeight = Infinity, onChange }: IOptions = {}) => {
    const [state, setState] = useRafState<{ width: number; height: number }>({
        width: isBrowser ? window.innerWidth : initialWidth,
        height: isBrowser ? window.innerHeight : initialHeight,
    });

    useEffect((): (() => void) | void => {
        if (isBrowser) {
            const handler = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;

                setState({
                    width,
                    height,
                });

                if (onChange) onChange(width, height);
            };

            on(window, 'resize', handler);

            return () => {
                off(window, 'resize', handler);
            };
        }
    }, []);

    return state;
};

export default useWindowSize;
