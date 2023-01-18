const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  plugins: [
    new HtmlWebpackPlugin({
     title: 'Caching',
    }),
  ],
  output: {

   filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'src'),
    clean: true,
  },
};
