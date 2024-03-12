const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    clean: true,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      
    ],
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 不提取LICENSE.txt文件，否则可能会影响apache license 2.0的要求
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      }),
    ],
  }
};