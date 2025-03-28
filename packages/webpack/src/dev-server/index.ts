import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { IDevServer } from '../types';

export function devServer(options: IDevServer): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        https: true,
        open: true,
        historyApiFallback: true,
        hot: true,
        compress: true,
        allowedHosts: 'all',
    };
}
