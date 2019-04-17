const path = require('path');

module.exports = {
  target: 'node',
  entry: {
    server: path.normalize(`${process.env.PWD}/server/src/server.ts`),
  },
  output: {
    path: path.normalize(`${process.env.PWD}/build/server/`),
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
            configFile: `${process.env.PWD}/build_configs/tsconfig.server.json`,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss?$/,
        use: {
          loader: 'ignore-loader',
        },
      },
    ],
  },
};
