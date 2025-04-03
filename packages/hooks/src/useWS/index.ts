import useZustand from 'react-use-zustand';
import { io, Socket } from 'socket.io-client';

interface IStore {
    ws: Socket;
}
const url = `${window.location.hostname}`;

const wsStore = useZustand<IStore>({
    keys: ['ws'],
    default: {
        ws: io(url, {
            reconnection: true,
            path: `${process.env.CONTAINER_NAME}/ws_gateway`,
            transports: ['websocket'],
            // withCredentials: false,
        }),
    },
});

function useWS() {
    const ws = wsStore.use.ws();

    const listener = (event: string, cb: (data: any) => void) => {
        ws.value.on(event, cb);

        return () => ws.value.off(event, cb);
    };

    return { listener };
}

export default useWS;
