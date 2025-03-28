import React, { lazy, Suspense, useEffect, useState } from 'react';

import { IMicroservice, IStatus } from './interfaces';
import loadComponent from './loader';

export const useModuleLoader = (props: IMicroservice) => {
    const { url, module, scope, errorComponent, loadingComponent, onError, disabled } = props;

    const [status, setStatus] = useState<IStatus>('loading');

    useEffect(() => {
        if (!disabled) {
            setStatus('loading');
            const script = document.createElement('script');

            script.src = url;
            script.type = 'text/javascript';
            script.async = true;

            script.onload = (): void => {
                setStatus('success');
            };

            script.onerror = (): void => {
                onError && onError();
                setStatus('error');
            };

            document.head.appendChild(script);

            return (): void => {
                document.head.removeChild(script);
            };
        }
    }, [url, disabled]);

    const Module = (): any => {
        const Component = lazy(loadComponent(scope, module));

        return (
            <Suspense fallback={loadingComponent}>
                {status === 'loading' && loadingComponent}
                {status === 'success' && <Component />}
                {status === 'error' && errorComponent}
            </Suspense>
        );
    };

    return { status, Module };
};

export default useModuleLoader;
