const path = require('path');
const ThemeCreatorPlugin = require('../loaders/theme-creator/ThemeCreatorPlugin');

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
                use: 'theme-creator',
            },
        ],
    },
    plugins: [
        new ThemeCreatorPlugin({
            themes: [
                {
                    themeName: 'client.white.css',
                    variables: {
                        theme: 'white',
                    },
                },
                {
                    themeName: 'client.dark.css',
                    variables: {
                        theme: 'dark',
                    },
                },
            ],
        }),
    ],
};
