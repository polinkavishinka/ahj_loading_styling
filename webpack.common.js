const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][hash][ext]',
    publicPath: '',
    clean: true,
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
    },
  },
  module: {
    rules: [
      {
        test: /web.worker\.js$/,
        use: {
          loader: 'worker-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|mp3|mp4)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(txt)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      favicon: './src/img/favicon.png',
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
    }),
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: './src/js/service.worker.js',
    //   swDest: 'service-worker.js',
    // }),
  ],
};
