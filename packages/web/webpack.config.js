const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const packages = path.resolve(__dirname, '..');

module.exports = (env) => {
  const devMode = env && env.dev;

  const alias = fs
    .readdirSync(packages)
    .filter((name) => !name.startsWith('.'))
    .reduce(
      (acc, name) => ({
        ...acc,
        [`${name}`]: path.resolve(
          packages,
          name,
          require(`../${name}/package.json`).source,
        ),
      }),
      {},
    );

  return {
    entry: ['@babel/polyfill', path.resolve(__dirname, './index.js')],
    context: path.resolve(__dirname, '../..'),
    output: {
      path: path.resolve(__dirname, 'dist/'),
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[id].[fullhash].chunk.js',
    },
    mode: devMode ? 'development' : 'production',
    devtool: 'source-map',
    optimization: {
      emitOnErrors: true,
    },
    plugins: [
      new AntdDayjsWebpackPlugin(),
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        inject: true,
      }),
      new Dotenv({
        path: path.resolve(__dirname, './.env'),
        systemvars: true,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './public/firebase-messaging-sw.js'),
            to: path.resolve(__dirname, 'dist'),
          },
          {
            from: path.resolve(__dirname, './public/favicon.ico'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
        options: {
          concurrency: 100,
        },
      }),
    ].concat(
      devMode
        ? [
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin(),
          ]
        : [
            new MiniCssExtractPlugin({
              filename: '[name].css',
              chunkFilename: '[id].css',
            }),
          ],
    ),
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules[/\\](?!react-native-vector-icons|react-native-safe-area-view)/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [
                  devMode && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(jpg|png|woff|woff2|eot|ttf)$/,
          use: 'file-loader',
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    resolve: {
      fallback: {crypto: false},
      alias,
      extensions: [
        '.web.js',
        '.web.jsx',
        '.web.tsx',
        '.web.ts',
        '.tsx',
        '.ts',
        '.js',
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist/'),
      port: 3000,
      hotOnly: true,
      allowedHosts: ['.test'],
      historyApiFallback: {
        disableDotRule: true,
      },
      host: 'localhost',
      disableHostCheck: true,
    },
  };
};
