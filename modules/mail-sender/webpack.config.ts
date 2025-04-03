import { configuration, defaultPaths, IEnvVariables } from '@packages/webpack';
import path from 'path';

import packageJson from './package.json';

export default (env: IEnvVariables) => {
    return configuration({
        mode: env.mode ?? 'development',
        paths: {
            static: env.devServer ? '/' : './',
            ...defaultPaths(__dirname),
            envFiles: [path.resolve('..', '..', `.env`), path.resolve(`.env.${env.mode}`)],
        },
        buildName: `${packageJson.name}_${packageJson.version}`,
        devServer: {
            active: env.devServer,
            port: env.port ?? 3000,
        },
        analyzer: env.analyzer,
        version: packageJson.version,
        moduleFederations: {
            name: packageJson.name,
            filename: 'remoteEntry.js',
            exposes: {
                './MailSender': './src/app/index.tsx',
            },
            shared: {
                ...packageJson.dependencies,
            },
        },
        aliases: {
            '@': path.resolve('src'),
            styleUtilities: path.resolve('src', 'shared', 'styles'),
        },
        manifest: {
            name: packageJson.name,
            displayName: 'MAIL SENDER',
            version: packageJson.version,
        },
    });
};
