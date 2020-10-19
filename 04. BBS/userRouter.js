const express = require('express');                           // 모듈화
const dm = require('./db/db-module');
const util = require('./util');
const am = require('./view/alertMessage');
const user = require('./view/user');


const userRouter = express.Router();

userRouter.get('/register', (req, res) => {
    const view = require('./view/user');
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

userRouter.get('/userInfo/:uid', util.isLoggedIn, (req, res) => {
    let uid = req.params.uid;
    if (uid !== 'admin') {
        dm.getUserInfo(uid, result => {
            const view = require('./view/user');
            let html = view.userInfo(result);
            res.send(html);
        });
    } else {
        dm.getUserList(rows => {
            const view = require('./view/user');
            let html = view.admin_userInfo(req.session, rows);
            res.send(html);
        });
    }
});

userRouter.get('/update/:uid', util.isLoggedIn, (req, res) => {
    let uid = req.params.uid;
    dm.getUserInfo(uid, result => {
        const view = require('./view/user');
        let html = view.updateUser(result);
        res.send(html);
    });
});

userRouter.post('/update', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    if (pwd === pwd2) {
        let pwdHash = util.genHash(pwd);
        let params = [pwdHash, tel, email, uname, uid];
        dm.updateUser(params, function() {
            let html = am.alertMsg('등록한 정보로 로그인해주십시오.', '/');
            res.send(html);
        });
    } else {
        let html = am.alertMsg('패스워드가 일치하지 않습니다.', '/update');
        res.send(html);
    }
});

userRouter.get('/delete/:uid', (req, res) => {
    dm.deleteUser(req.params.uid, () => {
        res.redirect('/');
    });
});

    module.exports = userRouter;