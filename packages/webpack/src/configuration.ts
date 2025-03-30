import path from 'path';
import webpack from 'webpack';

import { devServer } from './dev-server';
import { loaders } from './loaders';
import { plugins } from './plugins';
import { resolvers } from './resolvers';
import { IBuildOptions } from './types';

function configuration(options: IBuildOptions): webpack.Configuration {
    const { mode, paths } = options;
    const isDev = mode === 'development';

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: path.join(paths.output, `build_${options.version}`),
            filename: '[name].[contenthash].js',
            clean: true,
        },
        plugins: plugins(options),
        module: {
            rules: loaders(options),
        },
        resolve: resolvers(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: options.devServer.active ? devServer(options.devServer) : undefined,
    };
}

export { configuration, webpack };
