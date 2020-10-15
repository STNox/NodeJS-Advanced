const express = require('express');
const dm = require('./db/db-module');
const util = require('./util');


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
    let bid = req.session.bid;
    let title = req.session.title;
    let uid = req.session.uid;
    let modTime = req.session.modTime;
    let content = req.session.content;
    let results = [bid, title, uid, modTime, content];
    dm.getPost(results, () => {
        const view = require('./view/BBS');
        let html = view.postForm(results);
        res.send(html);
    });
});

module.exports = bbsRouter;