const express = require('express');                           // 모듈화
const dm = require('./db/db-module');
const util = require('./util');
const am = require('./view/alertMessage');


const userRouter = express.Router();

userRouter.get('/register', (req, res) => {
    const view = require('./view/userRegister');
    let html = view.register();
    res.send(html);
});

userRouter.post('/register', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    if (pwd === pwd2) {
        let pwdHash = util.genHash(pwd);
        let params = [uid, pwdHash, tel, email, uname];
        dm.regUser(params, function() {
            let html = am.alertMsg('등록한 정보로 로그인해주십시오.', '/');
            res.send(html);
        });
    } else {
        let html = am.alertMsg('패스워드가 일치하지 않습니다.', '/register');
        res.send(html);
    }
});

module.exports = userRouter;