const express = require('express');
const util = require('util');
const shoppingRouter = require('./07 shopping');

const app = express();
app.use(express.static(__dirname + '/public'));
let customerRouter = express.Router();
app.use('/shopping', shoppingRouter);
app.use('/customer', customerRouter);
app.get('/', function (request, response) {
    response.send('<h1>Root Router</h1>');
});
customerRouter.get('/', function (request, response) {
    response.send('<h1>Customer Router</h1>');
});
customerRouter.get('/index', function (request, response) {
    response.send('<h1>Customer Router Index</h1>');
});
app.get('*', (request, response) => {                   // localhost:3000/ 이외의 주소가 오면 404 처리
    response.status(404).send('Path not found');        // chaining: .status와 .send 한꺼번에 
})

app.listen(3000, function () {
    util.log('Server running at http://localhost:3000');
});