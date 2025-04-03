import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack, { Configuration, DefinePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

import { IBuildOptions } from './types';

export function plugins({ mode, paths, analyzer, moduleFederations, devServer, manifest, version }: IBuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,

            // favicon: path.resolve(paths.public, 'favicon.ico'),
            publicPath: paths.static,
            excludeChunks: [manifest.name],
        }),

        new DefinePlugin({
            __MODE__: JSON.stringify(mode),
        }),
        new WebpackManifestPlugin({
            fileName: 'manifest.json',
            publicPath: paths.output,
            generate: (seed, files, entries, chunkGraph) => {
                return manifest;
            },
        }),
    ];

    if (paths?.envFiles.length) {
        paths?.envFiles.forEach((i) => {
            plugins.push(
                new Dotenv({
                    path: i,
                })
            );
        });
    }

    if (moduleFederations && !devServer.active) {
        plugins.push(new webpack.container.ModuleFederationPlugin(moduleFederations));
    }

    if (devServer.active) {
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
        // plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            })
        );
        plugins.push(
            new CopyPlugin({
                patterns: [{ from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') }],
            })
        );
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
}
