const express = require('express');
const util = require('util');

const app = express();

app.get('/', function (request, response) {
    let agent = request.header('User-Agent');
    
    if (agent.toLowerCase().match(/chrome/)) {
        response.send(`크롬 브라우저입니다`);
    } else {
        response.send(`크롬 브라우저가 아닙니다`);
    }
});


app.get('*', (request, response) => {                   // localhost:3000/ 이외의 주소가 오면 404 처리
    response.status(404).send('Path not found');        // chaining: .status와 .send 한꺼번에 
})

app.listen(3000, function () {
    util.log('Server running at http://localhost:3000');
});