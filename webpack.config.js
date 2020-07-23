const path = require('path');

module.exports = {
    mode: 'none',
    entry: './scripts/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "build.js"
    },
};