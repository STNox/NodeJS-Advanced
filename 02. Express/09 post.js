const express = require('express');
const bodyParser = require('body-parser');
const util = require('util');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    // res.send('로그인 페이지로 이동합니다.');
    setTimeout(() => {
        res.redirect('/login');
    }, 3000);
});
app.get('/login', (req, res) => {
    fs.readFile('09 loginform.html', 'utf8', (error, data) => {
        res.send(data);
    });
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    util.log(uid, pwd);
    if (uid === 'Yoo' && pwd === '1234') {
        res.send(`<h1>Login Success</h1>`);
    } else {
        res.redirect('/login');
    }
});


app.listen(3000, () => {
    util.log('Server running at http://localhost:3000');
});