import { ChangeEvent, InputHTMLAttributes, useCallback, useRef, useState } from 'react';
import { IUseYup, useDebounce, useYup } from '@packages/hooks';

import { IUseProps } from './interfaces';

function use(props: IUseProps) {
    const { trim, debounceDelay, initValue, debounce, cut, inputAttrs, name, ...moreProps } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [state, setState] = useState(initValue);
    const [errorMessage, setErrorMessage] = useState('');
    const yap = useYup();

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setErrorMessage('');

        if (cut) {
            value = value.replace(cut, '');
        }

        if (trim) {
            value = value.trim();
        }

        setState(value);
    }, []);

    const setError = (value: string) => {
        setErrorMessage(value);
    };

    useDebounce(
        () => {
            state && debounce && debounce(state);
        },
        debounceDelay || 1000,
        [state]
    );

    const focus = () => {
        if (inputRef) {
            inputRef.current.focus();
        }
    };

    const checkValid = async (cb: (value: string, yap: { string: () => IUseYup.IString; number: () => IUseYup.NumberSchema }) => Promise<any>) => {
        return new Promise((resolve, reject) => {
            cb(state, yap)
                .then(() => {
                    resolve({ error: false, message: '', name });
                })
                .catch((e) => {
                    setError(e.message);
                    reject({ error: true, message: e.message, name });
                });
        });
    };

    return {
        ...moreProps,
        checkValid,
        value: state,
        setValue: setState,
        errorMessage,
        isError: !!errorMessage,
        setError,
        ref: inputRef,
        focus,
        inputAttrs: {
            value: state,
            onChange,
            ...inputAttrs,
        } as InputHTMLAttributes<HTMLInputElement>,
    };
}

export default use;
