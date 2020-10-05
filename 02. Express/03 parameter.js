const express = require('express');
const util = require('util');

const app = express();

// localhost:3000/query?id=kim
app.get('/query', function (request, response) {
    let id = request.query.id;
    response.send(`<h1>id - ${id}</h1>`);
});

// localhost:3000/rest/id/kim
app.get('/rest/id/:id', (request, response) => {
    let id = request.params.id;
    response.send(`<h1>id - ${id}</h1>`);
});

app.get('/rest2/:id', (request, response) => {
    let id = request.params.id;
    response.send(`<h1>id - ${id}</h1>`);
});

app.get('*', (request, response) => {                   // localhost:3000/ 이외의 주소가 오면 404 처리
    response.status(404).send('Path not found');        // chaining: .status와 .send 한꺼번에 
})

app.listen(3000, function () {
    util.log('Server running at http://localhost:3000');
});