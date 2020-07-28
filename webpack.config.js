const path = require('path');

module.exports = {
    mode: 'production',
    entry: './scripts/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "build.js"
    },

    // watch: true,
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 9000
    }
};