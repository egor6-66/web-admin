import cors from 'cors';
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const getConfig = (path: string) => {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
};

function Bootstrap() {
    const app = express();
    const port = 5000;
    const pathToConfigsDir = path.join(__dirname, 'configs');
    app.use(cors());

    app.get('/config/:variant', async (req: any, res: any) => {
        try {
            const params = req.params;
            res.send(getConfig(path.join(path.join(pathToConfigsDir, 'forms'), `${params.variant}.json`)));
        } catch (e) {
            console.log(e);
        }
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

Bootstrap();
