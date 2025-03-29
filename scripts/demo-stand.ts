import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import path from 'path';

import smdArgs from './utils/smd-args';

interface IArgs {
    mode: 'prod' | 'dev';
}

function run() {
    const args = smdArgs<IArgs>();
    const modulesDir = path.resolve('modules');

    const dirs = readdirSync(modulesDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    if (dirs.length) {
        dirs.forEach((dir) => {
            const module = path.join(modulesDir, dir);
            const stat = execSync(`cd ${module} && npm run build:${args.mode}`);
            console.log(stat);
        });
        const stat = execSync(`npm run docker`);
        console.log(stat);
    }
}

run();
