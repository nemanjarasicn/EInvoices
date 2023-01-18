const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new HtmlWebpackPlugin({
       title: 'Caching',
      }),
    ],
    output: {
     filename: `[contenthash]-${Date.now()}.js`,
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
  };