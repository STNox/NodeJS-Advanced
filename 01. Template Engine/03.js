var http = require('http');
var jade = require('jade');
var fs = require('fs');

http.createServer(function (request, response) {
    fs.readFile('03.jade', 'utf8', function (error, data) {
        var fn = jade.compile(data);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(fn());
    });
}).listen(3000, function () {
    console.log('Server Running at http://localhost:3000');
});