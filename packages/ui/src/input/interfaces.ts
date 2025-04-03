import { CSSProperties, InputHTMLAttributes, RefObject } from 'react';

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    displayName?: string;
    initValue?: string;
    isLoading?: boolean;
    errorMessage?: string;
    wrapperStyle?: CSSProperties;
    nameStyle?: CSSProperties;
    inputStyle?: CSSProperties;
    inputAttrs: InputHTMLAttributes<HTMLInputElement>;
    cut?: RegExp;
    debounceDelay?: number;
    debounce?: (value: string) => void;
    inputRef?: RefObject<HTMLInputElement>;
    trim?: boolean;
}

export interface IUseProps extends Partial<IProps> {
    take?: boolean;
}
