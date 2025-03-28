// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack, { Configuration, DefinePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { IBuildOptions } from './types';

export function plugins({ mode, paths, analyzer, moduleFederations, devServer }: IBuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            // favicon: path.resolve(paths.public, 'favicon.ico'),
            publicPath: paths.static,
        }),

        new DefinePlugin({
            __MODE__: JSON.stringify(mode),
        }),
        new Dotenv({
            path: path.resolve(`.env.${mode}`),
        }),
    ];

    if (moduleFederations && !devServer.active) {
        plugins.push(new webpack.container.ModuleFederationPlugin(moduleFederations));
    }

    if (devServer.active) {
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
        /** Выносит проверку типов в отдельный процесс: не нагружая сборку */
        // plugins.push(new ForkTsCheckerWebpackPlugin())
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
