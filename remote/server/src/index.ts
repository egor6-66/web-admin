import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import routes from './routes';
import WS from './ws';

function Bootstrap() {
    const app = express();
    const port = 9808;

    app.use(cors());
    app.use(bodyParser());

    const server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });

    const ws = WS(server);
    app.use(routes(ws));
}

Bootstrap();
