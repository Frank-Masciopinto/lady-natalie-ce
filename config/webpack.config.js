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
      popup: PATHS.src + '/popup.js',
      content_AccessToken: PATHS.src + '/content_AccessToken.js',
      background: PATHS.src + '/background.js',
      options: PATHS.src + '/options.js',
      get_facebook_info: PATHS.src + '/modules/get_facebook_info.js',
      facebook_login: PATHS.src + '/facebook_login.js',
      api: PATHS.src + '/api.js',
      indexPopup: PATHS.public + '/indexPopup.js',
      newTab: PATHS.src + '/NewTab/index.jsx',
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
        'process': {
          env: {
            REACT_APP_API_URL: JSON.stringify(
              process.env.REACT_APP_API_URL || 'http://localhost:3000'
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
