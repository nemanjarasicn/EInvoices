const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry:  {
      index: ["./src/index.tsx", "./src/index.css"],
    },
    
    plugins: [
      new HtmlWebpackPlugin({
       title: 'Caching',
      }),
    ],
    output: {
     filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'src'),
      clean: true,
    },
  };