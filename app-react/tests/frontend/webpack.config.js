const webpack = require('webpack');

// env
const buildDirectory = './app-react/';

module.exports = {
  entry: './index.js',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: '../../../app/static',
    filename: 'app.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      },
    }],
  },
  plugins: [],
};