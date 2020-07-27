const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js',
    chunkFilename: '[id].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      config: path.resolve(__dirname, 'config/default.json')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/client/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({ config: JSON.stringify(require('config')) })
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true
  }
};
