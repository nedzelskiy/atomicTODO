const path = require('path');
const ThemeCreatorPlugin = require('./ThemeCreatorPlugin');

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
                use: 'ignore-loader',
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
