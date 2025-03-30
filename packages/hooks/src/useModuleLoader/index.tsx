import React, { lazy, Suspense, useEffect, useState } from 'react';

import { IMicroservice, IStatus } from './interfaces';
import loadComponent from './loader';

export const useModuleLoader = (props: IMicroservice) => {
    const { url, module, scope, version, errorComponent, loadingComponent, onError, disabled } = props;

    const [status, setStatus] = useState<IStatus>('loading');
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (!disabled) {
            const moduleName = scope.toUpperCase();

            if (window.location.port) {
                setStatus('error');
                setMessage(`Нельзя загрузить модуль ${moduleName} в режиме девсервера`);
            } else {
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
                    setMessage(`Не удалось загрузить модуль ${moduleName}`);
                };

                document.head.appendChild(script);

                return (): void => {
                    document.head.removeChild(script);
                };
            }
        }
    }, [url, disabled]);

    const Module = (): any => {
        const Component = lazy(loadComponent(scope, module));

        return (
            <Suspense fallback={loadingComponent}>
                {status === 'loading' && <div>LOADING</div>}
                {status === 'success' && <Component />}
                {status === 'error' && <div>{message}</div>}
            </Suspense>
        );
    };

    return { status, Module };
};

export default useModuleLoader;
