import { ButtonHTMLAttributes, ReactNode } from 'react';

import { ICons } from '../icons/interfaces';

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    iconName?: ICons;
}
