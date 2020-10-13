const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/userdb-module');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/userList');
        let html = view.mainForm(rows);
        res.send(html);
    });
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
            const view = require('./view/alertMessage');
            let html = view.alerMsg(`Login 실패, uid ${uid}이/가 존재하지 않습니다.`, '/login');
            res.send(html);
        } else {
            if (result.pwd === pwdHash) {
                console.log('Login 성공');
                res.redirect('/');
            } else {
                const view = require('./view/alertMessage');
                let html = view.alerMsg('Login 실패, 패스워드가 일치하지 않습니다.', '/login');
                res.send(html);
            }
        }   
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});