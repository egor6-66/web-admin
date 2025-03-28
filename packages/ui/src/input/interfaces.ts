import { CSSProperties, InputHTMLAttributes } from 'react';

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    isLoading?: boolean;
    displayName: string;
    required?: boolean;
    wrapperStyle?: CSSProperties;
    nameStyle?: CSSProperties;
    inputStyle?: CSSProperties;
}
