import Promise from 'bluebird';
import express from 'express';
import fs from 'fs';
import path from 'path';

import { getFile, parseRequest } from '../multipart';
import * as WS from '../ws';
import { extractFiles } from '../zip';
const pathToModulesDir = path.resolve('..', 'modules');

function build(ws: WS.IWS) {
    const { io, clients } = ws;
    const router = express.Router();

    router.delete('/build', async (req: any, res: any) => {
        try {
            const { name, version, msg } = req.query;
            clients.forEach((i) => {
                io.to(i).emit('receiveMessage', msg);
            });
            fs.rmSync(path.join(pathToModulesDir, name, version), { recursive: true });

            res.status(200).send('');
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    router.post('/build', async function (req, res) {
        try {
            const body = await parseRequest(req);
            const bodyFile = getFile(body, 'file');

            if (!/\.zip$/.test(bodyFile.originalFilename)) {
                res.status(200).json({ notice: 'not a zip archive, skipping' });

                return;
            }

            clients.forEach((i) => {
                io.to(i).emit('receiveMessage', `новый билд ${bodyFile.originalFilename}`);
            });
            const archiveFiles = await extractFiles(bodyFile);

            await Promise.each(archiveFiles, async (file: any) => {
                const dirs = file.path.split('/').slice(0, -1);
                const dirPath = path.join(pathToModulesDir, ...dirs);

                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath, { recursive: true });
                }

                fs.writeFileSync(path.join(dirPath, file.originalFilename), file.buffer);
            });
            res.status(200).end();
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    return router;
}

export default build;
