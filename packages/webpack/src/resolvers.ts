import { Configuration } from 'webpack';

import { IBuildOptions } from './types';

export function resolvers(options: IBuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
        alias: options.aliases,
    };
}
