import { ModuleOptions } from 'webpack';

import { IBuildOptions } from './types';

export function loaders(options: IBuildOptions): ModuleOptions['rules'] {
    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };

    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    };

    const scssLoader = {
        test: /\.scss$/,
        use: [
            {
                loader: 'style-loader',
                options: {
                    injectType: 'singletonStyleTag',
                },
            },
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    },
                },
            },
            { loader: 'sass-loader' },
        ],
    };

    const cssLoader = {
        test: /\.css$/,
        use: [
            {
                loader: 'style-loader',
                options: {
                    injectType: 'singletonStyleTag',
                },
            },
            {
                loader: 'css-loader',
            },
        ],
    };

    const babelLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]],
                plugins: [] as any,
            },
        },
    };

    return [assetLoader, scssLoader, cssLoader, babelLoader, svgrLoader];
}
