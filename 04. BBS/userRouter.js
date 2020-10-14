const express = require('express');                           // 모듈화
const { genHash } = require('../03. MySQL/28 util');
const dm = require('./db/db-module');


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
        dm.regUser(params, ()=> {
            res.redirect('/list');
        });
    }
});

module.exports = userRouter;