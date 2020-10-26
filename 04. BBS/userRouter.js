const express = require('express');                           // 모듈화
const dm = require('./db/db-module');
const util = require('./util');
const am = require('./view/alertMessage');
const user = require('./view/user');
const multer = require('multer');


const userRouter = express.Router();
const upload = multer({
    storage: multer.diskStorage({
        destination: __dirname + '/public/upload',
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString().replace(/[-:\.A-Z]/g, '') + '_' + file.originalname);
        }
    })
});

userRouter.get('/register', (req, res) => {
    const view = require('./view/user');
    let html = view.register();
    res.send(html);
});

userRouter.post('/register', upload.single('photo'), (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    let photo = req.file ? `/upload/${req.file.filename}` : '/upload/default.png';
    if (uid === '' || pwd === '' || pwd2 === '' || uname === '') {
        let html = am.alertMsg('필수 정보를 입력하십시오', '/user/register');
        res.send(html);
    } else{
        if (pwd === pwd2) {
            let pwdHash = util.genHash(pwd);
            let params = [uid, pwdHash, tel, email, uname, photo];
            console.log(params);
            dm.regUser(params, function() {
                let html = am.alertMsg('등록한 정보로 로그인해주십시오.', '/');
                res.send(html);
            });
        } else {
            let html = am.alertMsg('패스워드가 일치하지 않습니다.', '/user/register');
            res.send(html);
        }
    }
});

userRouter.get('/userInfo/:uid', util.isLoggedIn, (req, res) => {
    let uid = req.params.uid;
    if (uid !== 'admin') {
        dm.getUserInfo(uid, result => {
            const view = require('./view/user');
            let html = view.userInfo(req.session, result);
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

userRouter.post('/update', upload.single('photo'), (req, res) => {
    console.log(req.body);
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    let photo = req.file ? `/upload/${req.file.filename}` : '/upload/default.png'; 
    if (pwd === '' || pwd2 === '' || uname === '') {
        let html = am.alertMsg('필수 정보를 입력하십시오', `/user/update/${uid}`);
        res.send(html);
    } else {
        if (pwd === pwd2) {
            let pwdHash = util.genHash(pwd);
            let params = [pwdHash, tel, email, uname, photo, uid];
            dm.updateUser(params, function() {
                let html = am.alertMsg('사용자 정보가 변경되었습니다.', '/home');
                res.send(html);
            });
        } else {
            let html = am.alertMsg('패스워드가 일치하지 않습니다.', `/user/update/${uid}`);
            res.send(html);
        }
    }
});

userRouter.get('/delete/:uid', (req, res) => {
    let uid = req.params.uid;
    let uname = req.session.uname;
    const view = require('./view/user');
    let html = view.deleteUser(uid, uname);
    res.send(html);
});

userRouter.get('/deleteConfirm/:uid', (req, res) => {
    dm.deleteUser(req.params.uid, () => {
        res.redirect('/');
    });
});
    module.exports = userRouter;