const path = require('path');

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
                    loader: 'ignore-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: 'collect-loader',
            },
        ],
    },
};
