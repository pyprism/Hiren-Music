/**
 * Created by prism on 6/24/16.
 */
var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    devtool: 'eval',
    entry: [
        './static/apps/app.jsx'
    ],
    output : {
        path: __dirname,
        filename: "./static/js/bundles/[name]-[hash].js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-decorators-legacy' ],
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
		compress: { warnings: false },
      		comments: false,
      		sourceMap: true,
      		mangle: true,
      		minimize: true
	})
    ] : [new BundleTracker({filename: './webpack-stats.json'}), new webpack.NoErrorsPlugin()]
};