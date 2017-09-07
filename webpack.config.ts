import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, HotModuleReplacementPlugin, optimize } from 'webpack';
import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader';

const context = path.join(__dirname, 'client');

const config: Configuration = {

  context,

  entry: {
    main: 'main.tsx'
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      context,
      'node_modules'
    ]
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'client/tsconfig.json'
        }
      }
    ]
  },

  plugins: [
    new CheckerPlugin(),

    new HotModuleReplacementPlugin(),
    
    new HtmlWebpackPlugin({ chunks: ['main'] }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    hot: true,
    clientLogLevel: 'info',
    quiet: true,
    noInfo: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 1000,
      poll: 1000
    },
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000'
      }
    }
  }

};

export default config;