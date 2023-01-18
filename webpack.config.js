const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: `[name].[contenthash]-${Date.now()}.js`,
    path: path.resolve(__dirname, "build/static"),
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
},  
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
        ]
    }
    ]
  },
  plugins: [
   
    new HtmlWebpackPlugin({
      title: 'Caching',
     }),
  ],
};