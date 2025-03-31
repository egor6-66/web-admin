import express from 'express';

import * as WS from '../ws';

import build from './build';
import module from './module';

function routes(ws: WS.IWS) {
    const router = express.Router();
    router.use(build(ws));
    router.use(module(ws));

    return router;
}

export default routes;
