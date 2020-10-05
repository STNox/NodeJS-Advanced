const express = require('express');
const util = require('util');

const app = express();
app.use(express.static(__dirname + '/public'));     // 현재 디렉토리 + /public, static은 경로를 지정해준다
app.get('/', function (request, response) {
    let html =`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Express</title>
    </head>
    <body>
        <h1>Static Image</h1>
        <hr>
        <img src="/kitty.jpg" alt="Kitty">
        <img src="/img/doggy.jpg" alt="Doggy">
    </body>
    </html>
    `;
    response.send(html);
});


app.get('*', (request, response) => {                   // localhost:3000/ 이외의 주소가 오면 404 처리
    response.status(404).send('Path not found');        // chaining: .status와 .send 한꺼번에 
})

app.listen(3000, function () {
    util.log('Server running at http://localhost:3000');
});