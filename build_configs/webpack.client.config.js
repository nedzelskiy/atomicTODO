const path = require('path');
const webpack = require('webpack');

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
  ],
};
