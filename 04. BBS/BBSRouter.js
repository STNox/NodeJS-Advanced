const express = require('express');
const dm = require('./db/db-module');
const util = require('./util');
const { bbsList } = require('./view/BBS');


const bbsRouter = express.Router();

bbsRouter.get('/list', util.isLoggedIn, (req, res) => {
    dm.getBbsLists(rows => {
        console.log(rows);
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
    dm.getPost(req.params.bid, result => {
        dm.getReply(req.params.bid, r_result => {
            const view = require('./view/BBS');
            let html = view.postForm(req.session.uname, result, r_result);
            res.send(html);
        });
    });
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