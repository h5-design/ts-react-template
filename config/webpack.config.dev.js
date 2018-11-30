'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

//供用的样式 loader
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};


module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    // 兼容windows
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  optimization: {
    runtimeChunk: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              plugins: [
                [
                  //集成 ts loader
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
                ["import", {"libraryName": "antd", "style": "css"}]
              ],
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: false,
            },
          },
          {
            test: /\.css$/,
            exclude: paths.appNodeModules,
            use: getStyleLoaders({
              importLoaders: 1,
              modules:true,
              localIdentName:'[name]__[local]-[hash:base64:6]'
            }),
          },
          {
            test: /\.css$/,
            include: paths.appNodeModules,
            use: getStyleLoaders({
              importLoaders: 1,
            }),
          },
          {
            test: /\.(scss|sass)$/,
            exclude: paths.appNodeModules,
            use: getStyleLoaders({
                importLoaders: 2,
                modules:true,
                localIdentName:'[name]__[local]-[hash:base64:6]'
            }, 'sass-loader'),
          },
          {
            test: /\.(scss|sass)$/,
            include: paths.appNodeModules,
            use: getStyleLoaders(
              {
                importLoaders: 2,
              },
              'sass-loader'
            ),
          },
          {
              test: /\.(less)$/,
              exclude: paths.appNodeModules,
              use: getStyleLoaders({
                  importLoaders: 2,
                  modules:true,
                  localIdentName:'[name]__[local]-[hash:base64:6]'
              }, 'less-loader'),
          },
          {
              test: /\.(less)$/,
              include: paths.appNodeModules,
              use: getStyleLoaders(
                  {
                      importLoaders: 2,
                  },
                  'less-loader'
              ),
          },
          {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                  limit: 10000,
                  name: 'static/media/[name].[hash:8].[ext]',
              },
          },
          {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                  name: 'static/media/[name].[hash:8].[ext]',
              },
          }
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    //html 模板
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
  // 使一些环境变量可用于JS代码，例如
  // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env.stringified),
    // css热更
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/facebook/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // 如果你更改nodemodules 也无需重启，热更
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // 生成一个 打包列表清单
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath,
    }),
  ].filter(Boolean),
});
