const path = require('path');

const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = false;

module.exports = {
  entry: {
    'auctioneer': path.resolve(__dirname, './scripts/auctioneer.js'),
    'bidder' : path.resolve(__dirname, './scripts/bidder.js'),
    'index' : path.resolve(__dirname, './scripts/index.js'),
  },

  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: 'scripts/[name]-bundle.js',
  },

  mode :  (PRODUCTION ? 'production' : 'development'),
  devtool : (PRODUCTION ? undefined : 'eval-source-map'),


  plugins: [
     
      new HtmlWebpackPlugin({
	       template: path.resolve(__dirname, 'auctioneer.html'),
	        filename: './auctioneer.html',
	        chunks : ['auctioneer']
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'bidder.html'),
         filename: './bidder.html',
         chunks : ['bidder']
     }),

      new CopyPlugin({
          patterns: [
            {
              context: path.resolve(__dirname, 'html'),
              from: "**/*.html",
              to:  'html',
              noErrorOnMissing: true,
            },
            {
              context: path.resolve(__dirname,'images'),
              from: '**/*',
              to:  'images/[name][ext]',
              noErrorOnMissing: true,
            },
            {
             context: path.resolve(__dirname, 'style'),
             from: '**/*.css',
             to:  'style/[name][ext]',
	           noErrorOnMissing: true,
           },
         ]
       }),
     ],


}
