const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

http.createServer(function (request, response) {
    fs.readFile('01 ejsPage.ejs', 'utf8', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(ejs.render(data)); // ejs.render(): ejs를 html로 전환
    });
}).listen(3000, function () {
    console.log('Server Running at http://localhost:3000');
});