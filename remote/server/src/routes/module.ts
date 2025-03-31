import axios from 'axios';
import express from 'express';
import fs from 'fs';
import cmd from 'node-cmd';
import os from 'os';
import path from 'path';

import * as WS from '../ws';

const pathToModulesDir = path.resolve('..', 'modules');
const manifestName = 'manifest.json';

function module(ws: WS.IWS) {
    const { io, clients } = ws;
    const router = express.Router();

    router.get('/available_modules', async (req: any, res: any) => {
        try {
            const modules: any = [];
            fs.readdirSync(pathToModulesDir).forEach((module) => {
                const builds = fs.readdirSync(path.join(pathToModulesDir, module));

                if (builds.length) {
                    const build = fs.readdirSync(path.join(pathToModulesDir, module))[0];
                    const manifest = fs.readFileSync(path.join(pathToModulesDir, module, build, manifestName), 'utf8');
                    modules.push({ manifest: { ...JSON.parse(manifest) }, builds });
                }
            });
            res.send({ modules });
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    router.get('/module', async (req: any, res: any) => {
        try {
            const { name } = req.query;
            const builds = fs.readdirSync(path.join(pathToModulesDir, name));
            const build = fs.readdirSync(path.join(pathToModulesDir, name))[0];
            const manifest = fs.readFileSync(path.join(pathToModulesDir, name, build, manifestName), 'utf8');
            res.send({ manifest: JSON.parse(manifest), builds });
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    router.post('/connect', async (req: any, res: any) => {
        const body = req.body;
        console.log(os.hostname());

        try {
            if (body.host === os.hostname()) {
                res.status(200).send(`successful connection🎉 \nhost: ${body.host}\nos: ${os.type()}\narch: ${os.arch()}`);
            } else {
                console.log(body.host);
            }
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    router.post('/command', async (req: any, res: any) => {
        const body = req.body;

        try {
            cmd.run(req.body.command, function (err, data, stderr) {
                clients.forEach((i) => {
                    io.to(i).emit('terminal', data);
                });
            });
            res.status(200).send();
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    return router;
}

export default module;
