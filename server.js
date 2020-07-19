
let http = require('http');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(3000);

console.log('Server running on port 3000');