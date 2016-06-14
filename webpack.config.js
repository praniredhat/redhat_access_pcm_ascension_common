'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = function (options) {
    var config = {
        entry: './app/common/main.module.js',
        output: {
            filename: options.filename
            // libraryTarget: 'umd',
            // library: 'uds'
        },
        module: {
            loaders: [
                {
                    test: /[\/]angular\.js$/, loader: "exports?angular"
                },
                {
                    test: /\.js$/,
                    loader: 'ng-annotate?add=true!babel',
                    exclude: [
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, 'bower_components')
                    ]
                },
                {
                    test: /\.css$/,
                    loader: 'style!css?minimize'
                },
                // https://github.com/tcoopman/image-webpack-loader
                {
                    test: /\.(jpe?g|png|gif|svg)/i,
                    loaders: [
                        'file?hash=sha512&digest=hex&name=[hash].[ext]',
                        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    ]
                },
                {
                    test: /\.(woff|woff2)/,
                    loader: 'url-loader?limit=10000'
                },
                {
                    test: /\.(ttf|eot)/,
                    loader: 'file-loader'
                },
                {
                    // HTML LOADER
                    // Reference: https://github.com/webpack/raw-loader
                    // Allow loading html through js
                    test: /\.html$/,
                    loader: 'raw'
                },
                {
                    test: /\.jade$/,
                    loader: 'babel!jade'
                }
            ]
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ]
    };

    if (options.minified) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            })
        )
    }

    return config;
};
