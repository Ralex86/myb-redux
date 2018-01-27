var path = require('path')


module.exports = {
    entry:['./app/index.jsx','whatwg-fetch'],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            },
            {
                  test: /\.(png|jpg)$/,
                  loader: 'url-loader?limit=25000'
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, 
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    }     
};
