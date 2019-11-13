const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
require('babel-polyfill');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
