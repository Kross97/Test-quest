const path = require('path');
require('babel-polyfill');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: ['babel-polyfill', './src/index.jsx'],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/public'),
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
};
