const express = require('express');
const dm = require('./db/db-module');
const am = require('./view/alertMessage');
const util = require('./util');


const bbsRouter = express.Router();

bbsRouter.get('/list', util.isLoggedIn, (req, res) => {
    dm.getBbsLists(rows => {
        const view = require('./view/BBS');
        let html = view.bbsList(req.session.uname, rows);
        res.send(html);
    });
});

bbsRouter.get('/create', (req, res) => {
    const view = require('./view/BBS');
    let html = view.createForm(req.session.uname, req.session.uid);
    res.send(html);
});

bbsRouter.post('/create', (req, res) => {
    let uid = req.body.uid;
    let title = req.body.title;
    let content = req.body.content;
    let params = [uid, title, content];
    dm.regPost(params, function() {
        res.redirect('/bbs/list');
    });
});

bbsRouter.get('/list/:bid', (req, res) => {
    console.log(req.params);
    dm.getPost(req.params.bid, result => {
        dm.viewCount(req.params.bid, () => {
            const view = require('./view/BBS');
            let html = view.postForm(req.session.uname, result);
            res.send(html);
        });
    });
});

bbsRouter.get('/update/:bid/uid/:uid', util.isLoggedIn, (req, res) => {
    // params.uid 불러오려면 :uid 입력
    if (req.params.uid === req.session.uid) {
        dm.getPost(req.params.bid, result => {
            dm.modTime(req.params.bid, () => {
                const view = require('./view/BBS');
                let html = view.updateForm(result);
                res.send(html);
            });
        });
    } else {
        let html = am.alertMsg('수정 권한이 없습니다.', '/bbs/list');
        res.send(html);
    }
});

bbsRouter.post('/update', util.isLoggedIn, (req, res) => {
    let uid = req.body.uid;
    let title = req.body.title;
    let content = req.body.content;
    let params = [uid, title, content];
    dm.updatePost(params, () => {
        res.redirect('/list/:bid');
    });
});

bbsRouter.get('/delete/:bid', util.isLoggedIn, (req, res) => {
    if (req.params.uid === req.session.uid) {
        dm.deletePost(req.params.bid, () => {
            res.redirect('/list');
        });
    } else {
        let html = am.alertMsg('삭제 권한이 없습니다.', '/bbs/list');
        res.send(html);
    }
});


bbsRouter.post('/comment', (req, res) => {
    let bid = req.body.bid;
    let uid = req.body.uid;
    let content = req.body.content;
    let params = [bid, uid, content];
    console.log(params);
    dm.regReply(params, function() {
        res.redirect(`/bbs/list/${bid}`);
    });
});

module.exports = bbsRouter;