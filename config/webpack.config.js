'use strict';

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const PATHS = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      api: PATHS.src + '/api.js',
      newTab: PATHS.src + '/NewTab/index.jsx',
    },
    output: {
      // the build folder to output bundles and assets in.
      path: argv.mode === 'production' ? PATHS.prod : PATHS.build,
      // the filename template for entry chunks
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.jsx$||\.ts$||\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader', // Injects styles into the DOM
            'css-loader', // Translates CSS into CommonJS
            'sass-loader', // Compiles Sass to CSS
          ],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react', // Automatically import React when JSX is used
      }),
      new webpack.DefinePlugin({
        process: {
          env: {
            REACT_APP_API_URL: JSON.stringify(
              process.env.REACT_APP_API_URL ||
                'https://wanderlust-api-production.up.railway.app/api/v1'
            ),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
          },
        },
      }),
    ],
    devtool: argv.mode === 'production' ? false : 'source-map',
    //devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
