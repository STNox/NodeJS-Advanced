require('http').createServer(function (request, response) {
    if (request.url == '/' || request.url == '/favicon.ico') {
        let html = `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forever</title>
        </head>
        <body>
            <h1>Forever</h1>
        </body>
        </html>
        `;
        response.end(html);
    } else {
        error.error.error();
    }
}).listen(3000, function () {
    console.log('Server running at http://localhost:3000');
});