import path from 'path';

import { IBuildPaths } from './types';

const defaultPaths = (__dirname: string): IBuildPaths => ({
    output: path.resolve(__dirname, 'builds'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
});

export { defaultPaths };
