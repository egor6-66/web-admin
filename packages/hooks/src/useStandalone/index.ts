import { useLayoutEffect } from 'react';
import { Modules } from '@packages/types';

import useModule from '../useModule';
import useStateCustom from '../useStateCustom';

import { IProps } from './interfaces';

function useStandalone(props: IProps) {
    const { currentModule, targetModule } = props;

    const state = useStateCustom(true, {
        storage: {
            key: `standalone_${targetModule}`,
            type: 'sessionStorage',
        },
    });

    const toggleStandalone = (data: { payload: { standalone: boolean } }) => {
        state.set(data.payload.standalone);
    };

    const module = useModule<Modules>(currentModule, {
        events: {
            toggleStandalone: {
                modules: [targetModule],
                callback: toggleStandalone,
            },
        },
    });

    useLayoutEffect(() => {
        module
            .send({ target: targetModule, eventName: 'checkStandalone', waitingTimer: 250 })
            .then(toggleStandalone)
            .catch(() => {
                toggleStandalone({ payload: { standalone: false } });
            });
    }, []);

    return { value: state.value };
}

export default useStandalone;
