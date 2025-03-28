import { PropsWithChildren, useLayoutEffect } from 'react';
import { useModule, useThemes } from '@packages/hooks';
import { Modules } from '@packages/types';

const InitProvider = (props: PropsWithChildren) => {
    const { children } = props;

    const module = useModule(Modules.HOST);
    const themes = useThemes();

    useLayoutEffect(() => {
        module.init();
        themes.init();

        return () => {
            module.close();
        };
    }, []);

    return children;
};

export default InitProvider;
