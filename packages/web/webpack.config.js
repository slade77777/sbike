const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env) => {
  console.log('env', env);
  const devMode = env && env.dev;

  const commonPlugins = [
    new AntdDayjsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      inject: true,
    }),
    new Dotenv({
      path: path.resolve(__dirname, './.env'),
      systemvars: true,
    }),
  ];

  const devModePlugins = [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ];

  return {
    entry: ['@babel/polyfill', path.resolve(__dirname, './index.js')],
    context: path.resolve(__dirname, '../..'),
    output: {
      path: path.resolve(__dirname, 'dist/'),
      publicPath: devMode ? '/' : '/dist/',
      filename: 'app.bundle.js',
      chunkFilename: '[id].[fullhash].chunk.js',
    },
    mode: devMode ? 'development' : 'production',
    devtool: 'source-map',
    optimization: {
      emitOnErrors: true,
    },
    plugins: commonPlugins.concat(devMode ? devModePlugins : []),
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
