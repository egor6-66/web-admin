import cors from 'cors';
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const getConfig = (path: string) => {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
};

function Bootstrap() {
    const app = express();
    const port = 5006;
    const pathToConfigsDir = path.resolve('..', 'configs');
    const pathToModulesDir = path.resolve('..', 'modules');
    app.use(cors());

    app.get('/available_modules', async (req: any, res: any) => {
        try {
            const modules: any = [];
            fs.readdirSync(pathToModulesDir).forEach((module) => {
                const builds = fs.readdirSync(path.join(pathToModulesDir, module));

                if (builds.length && module !== 'host') {
                    const build = fs.readdirSync(path.join(pathToModulesDir, module))[0];
                    const manifest = fs.readFileSync(path.join(pathToModulesDir, module, build, 'manifest.json'), 'utf8');
                    modules.push(JSON.parse(manifest));
                }
            });
            res.send({ modules });
        } catch (e) {
            console.log(e);
        }
    });

    app.get('/config', async (req: any, res: any) => {
        try {
            const params = req.query;
            res.send(getConfig(path.join(path.join(pathToConfigsDir), `${params.variant}.json`)));
        } catch (e) {
            console.log(e);
        }
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

Bootstrap();
