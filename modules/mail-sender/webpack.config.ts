import { configuration, defaultPaths, IEnvVariables } from '@packages/webpack';
import path from 'path';

import packageJson from './package.json';

export default (env: IEnvVariables) => {
    return configuration({
        mode: env.mode ?? 'development',
        paths: {
            static: env.devServer ? '/' : '/mail_sender',
            ...defaultPaths(__dirname),
            output: path.resolve(__dirname, '..', '..', 'remote', 'modules', packageJson.name),
        },

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
        },
    });
};
