/* eslint-disable global-require, no-console */
const path = require('path');
const chalk = require('chalk');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LiveReloadPlugin = require('webpack-livereload-plugin');
const devMode = require('minimist')(process.argv.slice(2)).mode !== 'production';
const { getThemesWebpackConfig } = require('../config');
const ServerFetchDataCreator = require('../loaders/server-fetch-data-creator/ServerFetchDataCreator');
const ThemesStylesCreatorPlugin = require('../loaders/themes-styles-creator/ThemesStylesCreatorPlugin');

const preparedPlugins = [
  // new BundleAnalyzerPlugin(),
  new ThemesStylesCreatorPlugin({
    themes: getThemesWebpackConfig('client', 'css'),
  }),
  new ServerFetchDataCreator({
    fileName: 'inDataNeeded',
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
  watchOptions: {
    aggregateTimeout: 20,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
      },
    },
  },
  resolveLoader: {
    modules: ['node_modules', 'loaders'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'server-fetch-data-creator',
            options: {
              fetchPropertyName: 'serverDataFetchJobs',
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.normalize(`${process.env.PWD}/build_configs/tsconfig.client.json`),
            },
          },
        ],
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
