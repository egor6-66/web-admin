import Promise from 'bluebird';
import cors from 'cors';
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
const writeFile = Promise.promisify(fs.writeFile);
import { getFile, parseRequest } from './multipart';
import { extractFiles } from './zip';

const getConfig = (path: string) => {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
};

const manifestName = 'manifest.json';

function Bootstrap() {
    const app = express();
    const port = 5006;
    const router = express.Router();
    const pathToConfigsDir = path.resolve('..', 'configs');
    const pathToModulesDir = path.resolve('..', 'modules');
    app.use(cors());

    app.get('/available_modules', async (req: any, res: any) => {
        try {
            const modules: any = [];
            fs.readdirSync(pathToModulesDir).forEach((module) => {
                const builds = fs.readdirSync(path.join(pathToModulesDir, module));

                if (builds.length) {
                    const build = fs.readdirSync(path.join(pathToModulesDir, module))[0];
                    const manifest = fs.readFileSync(path.join(pathToModulesDir, module, build, manifestName), 'utf8');
                    modules.push({ manifest: { ...JSON.parse(manifest) } });
                }
            });
            res.send({ modules });
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    app.get('/module', async (req: any, res: any) => {
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

    app.post('/build', async function (req, res) {
        try {
            const body = await parseRequest(req);
            const bodyFile = getFile(body, 'file');

            if (!/\.zip$/.test(bodyFile.originalFilename)) {
                res.status(200).json({ notice: 'not a zip archive, skipping' });

                return;
            }

            const moduleName = bodyFile.originalFilename.split('.')[0];
            const fullPath = path.join(pathToModulesDir, moduleName);
            const archiveFiles = await extractFiles(bodyFile);

            if (fs.existsSync(fullPath)) {
                fs.rmSync(fullPath, { recursive: true, force: true });
            }

            fs.mkdirSync(fullPath);
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

    app.get('/config', async (req: any, res: any) => {
        try {
            const query = req.query;
            const manifest = fs.readFileSync(path.join(pathToModulesDir, query.module_name, `build_${query.build}`, 'manifest.json'), 'utf8');
            res.send(manifest);
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

Bootstrap();
