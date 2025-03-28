import { ReactNode } from 'react';

export type IStatus = 'loading' | 'success' | 'error';

export interface IMicroservice {
    url: string;
    scope: string;
    module: string;
    errorComponent: ReactNode;
    loadingComponent: ReactNode;
    onError?: () => void;
    disabled?: boolean;
}
