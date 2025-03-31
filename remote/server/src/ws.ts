import * as HTTP from 'http';
import { Server } from 'socket.io';

export interface IWS {
    io: Server;
    clients: Set<string>;
}

function WS(server: HTTP.Server) {
    const clients: Set<string> = new Set();

    const io = new Server(server, {
        path: '/my-custom-path',
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: false,
        },
        transports: ['polling', 'websocket'],
    });

    io.on('connection', (socket) => {
        clients.add(socket.id);
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return { io, clients };
}

export default WS;
