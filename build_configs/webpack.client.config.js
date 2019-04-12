const path = require('path');

module.exports = {
    entry: {
        client: path.normalize(`${process.env.PWD}/client/client.tsx`),
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
                        configFile: `${process.env.PWD}/build_configs/tsconfig.client.json`
                    }
                },
                exclude: /node_modules/
            },
        ],
    },
};
