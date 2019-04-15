const path = require('path');
const ThemeCreatorPlugin = require('../loaders/theme-creator/index').plugin;

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
                        loader: require.resolve('../loaders/theme-creator'),
                        options: {
                            themes: [
                                {
                                    filename: 'client.white.css',
                                    variables: {
                                        theme: 'white',
                                    },
                                },
                                {
                                    filename: 'client.dark.css',
                                    variables: {
                                        theme: 'dark',
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        namedModules: true,
    },
    plugins: [
        new ThemeCreatorPlugin(),
    ],
};
