const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dm = require('./db/userdb-module');
const am = require('./view/alertMessage');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.cookies);
    if (req.cookies && req.cookies.isLoggedIn) {
        dm.getAllLists(rows => {
            const view = require('./view/cookieList');
            let html = view.mainForm(rows);
            res.send(html);
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    const view = require('./view/userLogin');
    let html = view.loginForm();
    res.send(html);
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = dm.genHash(pwd);
    dm.getUserInfo(uid, result => {
        if (result === undefined) {
            let html = am.alerMsg(`Login 실패, uid ${uid}이/가 존재하지 않습니다.`, '/login');
            res.send(html);
        } else {
            if (result.pwd === pwdHash) {
                res.cookie('isLoggedIn', 1);
                // res.cookie('isLoggedIn', 1, {maxAge: 60*1000});  maxAge: 시간 제한(ms 단위)
                console.log('Login 성공');
                res.redirect('/');
            } else {
                let html = am.alerMsg('Login 실패, 패스워드가 일치하지 않습니다.', '/login');
                res.send(html);
            }
        }   
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('isLoggedIn');
    res.redirect('/login');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});