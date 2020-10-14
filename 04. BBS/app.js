const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uRouter = require('./userRouter');
const bbsRouter = require('./BBSRouter');
const fs = require('fs');

const app = express();
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/@popperjs/core/dist/umd'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
    secret: '1q2w3e4r5t6y',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));
app.use('/user', uRouter);
app.use('/bbs', bbsRouter);

app.get('/', (req, res) => {
    fs.readFile('./view/index.html', 'utf8', (error, data) => {
        if (error)
            console.log(error);
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});