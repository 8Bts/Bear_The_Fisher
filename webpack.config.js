const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.js$/, // checks for files with .js extension in the path specified below
        include: path.resolve(__dirname, 'src/'), // checks in this path
        exclude: /node_modules/, // exclude node_modules folder
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|mp3|wav|html)$/i,
        use: 'file-loader',
      }, // in case you need to use images, this loader will    // bundle them for you
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['!index.html'],
    }),
  ],
};