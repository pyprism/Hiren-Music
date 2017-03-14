var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    devtool: 'source-map',
    context: __dirname,
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        //'webpack/hot/only-dev-server',
        './bunny/app.jsx'
    ],



    output: {
        path: path.resolve('./static/js/bundles/'),
        filename: '[name]-[hash].js',
        publicPath: 'http://localhost:3000/assets/bundles/' // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'})
    ],

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                //loaders: ['react-hot', 'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-decorators-legacy']
                use: [
                    'babel-loader',
                ],
                options: {
                    presets: [
                        'es2015',
                        'stage-0',
                        'react'
                    ],
                    plugins: [
                        'transform-decorators-legacy'
                    ]
                }
            }
        ]
    },

    //resolve: {
    //    modulesDirectories: ['node_modules', 'bower_components'],
    //    extensions: ['', '.js', '.jsx']
    //}

    devServer: {
        host: 'localhost',
        port: 3000,
        publicPath: 'http://localhost:3000/assets/bundles/',
        inline: true,
        historyApiFallback: true,
        hot: true
    }

};