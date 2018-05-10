import webpack from 'webpack'; // eslint-disable-line no-unused-vars
import path from 'path';

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'demo/app'),
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
};
