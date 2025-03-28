import { useEffect } from 'react';
import useZustand from 'react-use-zustand';

import { IOpenNewWindowProps, IProps, ISendProps, IStore } from './interfaces';

const broadcastStore = useZustand<IStore>({
    keys: ['broadcasts'],
});

function useModule<T extends string>(moduleName: T, props?: IProps<T>) {
    const broadcasts = broadcastStore.use.broadcasts();

    const checkStandalone = () => {
        return window.location.pathname.split('/')[1] === moduleName.toLowerCase();
    };

    const init = () => {
        if (!moduleName) return;
        console.log(`%cINITIAL ${moduleName} MODULE`, 'color: green; font-size: 14px;');
        const bc = new BroadcastChannel(`${moduleName}_channel`);
        broadcasts.set((prev) => ({ ...prev, [moduleName]: bc }));
    };

    const send = <M>(props: ISendProps<M>) => {
        return new Promise((resolve, reject) => {
            const { target, eventName, data, waitingTimer } = props;
            const bc = new BroadcastChannel(`${target}_channel`);
            bc.postMessage(JSON.stringify({ eventName, data: data || {}, from: moduleName }));

            const timer = setTimeout(() => {
                reject({ module: target, error: 'no answer' });
                bc.close();
            }, waitingTimer || 1000);

            bc.addEventListener(
                'message',
                (e) => {
                    const parse = JSON.parse(e.data);

                    if (parse.eventName === eventName) {
                        clearTimeout(timer);
                        resolve({ module: target, payload: parse.data });
                        bc.close();
                    }
                },
                { once: true }
            );
        });
    };

    useEffect(() => {
        if (broadcasts.value && broadcasts.value[moduleName]) {
            const currentBroadcast = broadcasts.value[moduleName];

            const listener = (e: any) => {
                const parse = JSON.parse(e.data);

                if (parse.eventName === 'checkStandalone') {
                    return currentBroadcast.postMessage(JSON.stringify({ eventName: parse.eventName, data: { standalone: checkStandalone() } }));
                }

                if (props?.events && props?.events[parse.eventName]) {
                    const currentEvent = props.events[parse.eventName];

                    if (!currentEvent.modules.length || currentEvent.modules.includes(parse.from)) {
                        const res = props.events[parse.eventName].callback({ module: parse.from, payload: parse.data });
                        currentBroadcast.postMessage(JSON.stringify({ eventName: parse.eventName, data: res, answer: true }));
                    }
                }
            };

            currentBroadcast.addEventListener('message', listener);

            return () => {
                currentBroadcast.removeEventListener('message', listener);
            };
        }
    }, [broadcasts.value]);

    const windowEvents = {
        openNewWindow: (props: IOpenNewWindowProps) => {
            const { moduleUrl, delay = 0 } = props;
            const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=600,left=0,top=0`;
            setTimeout(() => {
                window.open(moduleUrl, '', params);
            }, delay);
        },
        close: () => {
            window.close();
        },
    };

    const close = () => {
        if (broadcasts?.value[moduleName]) {
            broadcasts?.value[moduleName].close();
        }
    };

    return { init, close, send, checkStandalone, windowEvents };
}

export default useModule;
