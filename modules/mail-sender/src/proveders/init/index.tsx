import { PropsWithChildren, useEffect } from 'react';
import { useModule } from '@packages/hooks';
import { Modules } from '@packages/types';

const InitProvider = (props: PropsWithChildren) => {
    const { children } = props;

    const module = useModule(Modules.MAIL_SENDER);

    useEffect(() => {
        module.init();

        return () => {
            module.close();
        };
    }, []);

    return children;
};

export default InitProvider;
