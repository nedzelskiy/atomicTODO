/* eslint-disable global-require */
const path = require('path');
const chalk = require('chalk');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const devMode = require('minimist')(process.argv.slice(2)).mode !== 'production';
const ThemesStylesCreatorPlugin = require('../loaders/themes-styles-creator/ThemesStylesCreatorPlugin');

const preparedPlugins = [
  new ThemesStylesCreatorPlugin({
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
  {
    apply(compiler) {
      compiler.hooks.done.tap('LifecycleHooker', () => {
        setTimeout(() => console.log(chalk.cyan('====> client bundle is compiled!')), 0);
      });
    },
  },
];

if (devMode) {
  preparedPlugins.push(new LiveReloadPlugin({
    appendScriptTag: true,
  }));
}

module.exports = {
  entry: {
    client: [
      path.normalize(`${process.env.PWD}/client/client.tsx`),
    ],
  },
  output: {
    path: path.normalize(`${process.env.PWD}/build/client/`),
  },
  devtool: 'source-map',
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
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: 'themes-styles-creator',
      },
    ],
  },
  plugins: preparedPlugins,
};
