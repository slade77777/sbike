const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const node_modules = path.resolve(__dirname, '../..', 'node_modules');
const packages = path.resolve(__dirname, '..');

module.exports = (env) => {
  const dev = env.environment === 'dev';

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
      publicPath: dev ? '/' : '/dist/',
      filename: 'app.bundle.js',
      chunkFilename: '[id].[hash].chunk.js',
    },
    mode: dev ? 'development' : 'production',
    devtool: 'source-map',
    optimization: {
      noEmitOnErrors: true,
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        inject: true,
      }),
    ].concat(
      dev
        ? [
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin(),
          ]
        : [
            new MiniCssExtractPlugin({
              filename: path.resolve(__dirname, 'styles.css'),
              chunkFilename: path.resolve(__dirname, '[id].[hash].chunk.css'),
            }),
          ],
    ),
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          // include: /(packages)\/.+/,
          exclude: /node_modules[/\\](?!react-native-vector-icons|react-native-safe-area-view)/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [
                  process.env.NODE_ENV !== 'production' &&
                    require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {sourceMap: dev},
            },
          ],
        },
        {
          test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
          use: 'file-loader',
        },
      ],
    },
    resolve: {
      alias: {
        'react-native$': require.resolve('react-native-web'),
        react: path.resolve(node_modules, 'react'),
        'react-native': path.resolve(node_modules, 'react-native-web'),
        'react-native-web': path.resolve(node_modules, 'react-native-web'),
        'react-native-linear-gradient': path.resolve(
          node_modules,
          'react-native-web-linear-gradient',
        ),
        ...alias,
      },
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
