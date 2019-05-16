/* eslint-disable no-console */
const path = require('path');
const chalk = require('chalk');

module.exports = {
  target: 'node',
  entry: {
    server: path.normalize(`${process.env.PWD}/server/server.ts`),
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
            configFile: path.normalize(`${process.env.PWD}/build_configs/tsconfig.server.json`),
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
  plugins: [
    {
      apply(compiler) {
        compiler.hooks.done.tap('LifecycleHooker', () => {
          setTimeout(() => console.log(chalk.magenta('====> server bundle is compiled!')), 0);
        });
      },
    },
  ],
};
