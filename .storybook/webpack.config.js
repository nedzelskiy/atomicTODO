// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const ThemesStylesCreatorPlugin = require('../loaders/themes-styles-creator/ThemesStylesCreatorPlugin');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new ThemesStylesCreatorPlugin({
      output: `./build/storybook/`,
      themes: [
        {
          themeName: 'storybook.white.css',
          variables: {
            theme: 'white',
          },
        },
        {
          themeName: 'storybook.dark.css',
          variables: {
            theme: 'dark',
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.MODE': JSON.stringify('storybook'),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  watchOptions: {
    aggregateTimeout: 200,
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
            loader: 'ts-loader',
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
};
