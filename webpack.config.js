const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const IgnoreAssetsWebpackPlugin = require('ignore-assets-webpack-plugin');

module.exports = {
  entry: {
    styles: [
      './src/scss/main.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'config.json', to: 'config.json' },
    ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'head.html',
      template: 'src/head.html',
      chunks: ['styles'],
      excludeAssets: [/styles.*.js/]
    }),
    new HtmlWebpackPlugin({
      filename: 'footer.html',
      template: 'src/footer.html',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: 'header.html',
      template: 'src/header.html',
      chunks: []
    }),
    new StyleExtHtmlWebpackPlugin({
      chunks: ['styles'],
      position: 'plugin'
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new IgnoreAssetsWebpackPlugin({
      ignore: 'styles.js'
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  }
};
