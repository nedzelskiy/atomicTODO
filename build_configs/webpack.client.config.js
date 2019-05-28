/* eslint-disable global-require, no-console */
const path = require('path');
const { cyan } = require('chalk');
const args = require('minimist')(process.argv.slice(2));
const { getThemesWebpackConfig } = require('../config');
const AssetsHashGetterPlugin = require('../loaders/assets-hash-getter/AssetsHashGetterPlugin');
const ThemesStylesCreatorPlugin = require('../loaders/themes-styles-creator/ThemesStylesCreatorPlugin');
const ServerFetchDataCreatorPlugin = require('../loaders/server-fetch-data-creator/ServerFetchDataCreatorPlugin');

const devMode = args.mode === 'production' ? 'production' : 'development';
const analyzeMode = args.analyze;

const preparedPlugins = [
  new ThemesStylesCreatorPlugin({
    themes: getThemesWebpackConfig('client', 'css'),
  }),
  new ServerFetchDataCreatorPlugin({
    fileName: 'inDataNeeded',
    pages: [
      `${process.env.PWD}/client/pages/Home/Home.tsx`,
      `${process.env.PWD}/client/pages/Test/Test.tsx`,
    ],
  }),
  new AssetsHashGetterPlugin({
    fileName: 'manifest',
    additionalHashes: ThemesStylesCreatorPlugin.getHashes(),
  }),
  {
    apply(compiler) {
      compiler.hooks.done.tap('LifecycleHooker', () => {
        setTimeout(() => console.log(cyan('====> client bundle is compiled!')), 0);
      });
    },
  },
];

if (devMode) {
  const LiveReloadPlugin = require('webpack-livereload-plugin');
  preparedPlugins.push(new LiveReloadPlugin({
    appendScriptTag: true,
  }));
}

if (analyzeMode) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  preparedPlugins.push(
    new BundleAnalyzerPlugin(),
  );
}

module.exports = {
  entry: {
    client: [
      path.normalize(`${process.env.PWD}/client/client.tsx`),
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
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
