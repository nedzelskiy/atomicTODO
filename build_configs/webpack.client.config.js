const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
      client: [
        path.normalize(`${process.env.PWD}/client/client.tsx`)
      ],
    },
    output: {
      path: path.normalize(`${process.env.PWD}/build/client/`),
      filename: '[name].js',
      publicPath: 'http://localhost:8080/static/',
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
                loader: MiniCssExtractPlugin.loader,
              },
              'css-loader',
              {
                loader: "sass-loader",
                options: {
                  data: '$theme: dark;',
                }
              },
            ],
          },
        ],
    },
  devServer: {
    inline: true,
    historyApiFallback: true,
    hot: true,
    quiet: false,
    contentBase: path.normalize(`${process.env.PWD}/build/client/`),
    publicPath: 'http://localhost:8080/static/',
  },
  optimization: {
    namedModules: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
