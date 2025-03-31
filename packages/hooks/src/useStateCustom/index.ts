import { useEffect, useState } from 'react';

import { storageManager } from '../_utils';

import { IOptions } from './interfaces';

const defaultStorage = 'localStorage';

function useStateCustom<T>(defaultValue: T, options?: IOptions) {
    const { storage } = options || {};

    const init = () => {
        if (storage) {
            const valueInLs = storageManager(storage.type || defaultStorage).get(storage.key);

            return valueInLs !== undefined && valueInLs !== null ? valueInLs : defaultValue;
        }

        return defaultValue;
    };

    const [state, setState] = useState<T>(init);

    const set = (value: T | ((value: T) => T)) => {
        if (typeof value === 'function') {
            // @ts-ignore
            setState((prev) => value(prev));
        } else {
            setState(value);
        }
    };

    const toggle = () => {
        if (typeof state === 'boolean') {
            // @ts-ignore
            set((prev) => !prev);
        }
    };

    const clear = () => {
        if (storage) {
            storageManager(storage.type || defaultStorage).remove(storage.key);
        }

        setState(undefined);
    };

    useEffect(() => {
        if (storage) {
            storageManager(storage.type || defaultStorage).set(storage.key, state);
        }
    }, [state]);

    return { value: state, set, toggle, clear };
}

export default useStateCustom;
