const webpack = require('webpack'); // import webpack :)
const path = require('path'); // Node.js module used to manipulate file paths
const HtmlWebpackPlugin = require('html-webpack-plugin');
// generates an HTML file for your application by injecting
// automatically all your generated bundles.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// this plugin will remove all files inside webpack's output.path
// directory, as well as all unused webpack assets after every
// successful rebuild.
module.exports = {
  mode: 'development', // enable webpack's built-in optimizations
  // that correspond to development
  devtool: 'eval-source-map', // Each module is executed with     // eval() and a SourceMap is added as a DataUrl to the eval().     // Initially it is slow, but it provides fast rebuild speed and    // yields real files
  module: {
    rules: [
      {
        test: /\.js$/, // checks for files with .js extension in the path specified below
        include: path.resolve(__dirname, 'src/'), // checks in this path
        exclude: /node_modules/, // exclude node_modules folder
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          }, // uses babel-loader to transpile your ES6 code
        },
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      }, // in case you need to use Vertex and Fragment shaders,
      // this loader will bundle them for you.
      {
        test: /\.(gif|png|jpe?g|svg|xml|mp3|wav)$/i,
        use: 'file-loader',
      }, // in case you need to use images, this loader will    // bundle them for you
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../'),
    }), // specified the path where this plugin will delete the files on each rebuild
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }), // config webpack to handle renderer swapping in our app
    new HtmlWebpackPlugin({
      template: '../dist/index.html',
    }), // specify where your HTML template is located
  ],
};