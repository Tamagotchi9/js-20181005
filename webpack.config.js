const path = require('path');

module.exports = {
    mode: 'none',
    entry: './scripts/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "build.js"
    },

    watch: true,
    devtool: 'source-map',
};