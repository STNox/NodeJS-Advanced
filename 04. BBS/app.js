const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uRouter = require('./userRouter');
const bbsRouter = require('./BBSRouter');
const fs = require('fs');
const util = require('./util');
const am = require('./view/alertMessage');
const dm = require('./db/db-module');

const app = express();
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/@popperjs/core/dist/umd'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/naver-smarteditor2-ca95d21', express.static(__dirname + '/node_modules/naver-smarteditor2-ca95d21/demo'))
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.png'));
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

app.get('/home', (req, res) => {
    const view = require('./view/template');
    let html = view.loginHome(req.session.uid, req.session.uname);
    res.send(html);
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = util.genHash(pwd);
    dm.getUserInfo(uid, result => {
        if (result === undefined || result.isDeleted === 1) {
            let html = am.alertMsg('존재하지 않거나 삭제된 ID입니다.', '/');
            res.send(html);
        } else {
            if (result.pwd === pwdHash) {
                req.session.uid = uid;
                req.session.uname = result.uname;
                req.session.save(function() {
                    res.redirect('/home');
                });
            } else {
                let html = am.alertMsg('패스워드가 일치하지 않습니다.', '/');
                res.send(html);
            }
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});