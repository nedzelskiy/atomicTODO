const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        client: [
            path.normalize(`${process.env.PWD}/client/client.tsx`)
        ],
    },
    output: {
        path: path.normalize(`${process.env.PWD}/build/client/`),
    },
    watchOptions: {
        aggregateTimeout: 20,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    resolveLoader: {
        modules: ['node_modules', 'loaders'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.normalize(`${process.env.PWD}/build_configs/tsconfig.client.json`),
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            data: '$theme: white;',
                        }
                    },
                ],
            },
        ],
    },
    optimization: {
        namedModules: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].white.css',
        }),
    ],
};
