import { useCallback, useEffect, useRef } from 'react';

export default function useTimeoutFn(fn: () => void, ms = 0) {
    const ready = useRef<boolean | null>(false);
    const timeout = useRef<ReturnType<typeof setTimeout>>();
    const callback = useRef(fn);

    const isReady = useCallback(() => ready.current, []);

    const reset = useCallback(() => {
        ready.current = false;
        timeout.current && clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            ready.current = true;
            callback.current();
        }, ms);
    }, [ms]);

    const clear = useCallback(() => {
        ready.current = null;
        timeout.current && clearTimeout(timeout.current);
    }, []);

    // update ref when function changes
    useEffect(() => {
        callback.current = fn;
    }, [fn]);

    // set on mount, clear on unmount
    useEffect(() => {
        reset();

        return clear;
    }, [ms]);

    return { isReady, clear, reset };
}
