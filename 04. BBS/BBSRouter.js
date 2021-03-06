const express = require('express');
const dm = require('./db/db-module');
const am = require('./view/alertMessage');
const util = require('./util');
const multer = require('multer');



const bbsRouter = express.Router();
const upload = multer({
    storage: multer.diskStorage({
        destination: __dirname + '/public/upload',
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString().replace(/[-:\.A-Z]/g, '') + '_' + file.originalname);
        }
    })
});
/* bbsRouter.get('/list', util.isLoggedIn, (req, res) => {
    dm.getBbsLists(rows => {
        const view = require('./view/BBS');
        let html = view.bbsList(req.session, rows);
        res.send(html);
    });
}); */

bbsRouter.get('/list/:page', util.isLoggedIn, (req, res) => {
    let page = parseInt(req.params.page);
    req.session.currentPage = page;
    let offset = (page - 1) * 10;
    dm.getTotalBbsCount(result => {
        let totalPage = Math.ceil(result.count / 10);
        let startPage = Math.floor((page - 1) / 10) * 10 + 1;
        let endPage = Math.ceil(page / 10) * 10;
        endPage = (endPage > totalPage) ? totalPage : endPage;
        dm.getBbsLists(offset, rows => {
            const view = require('./view/BBS');
            let html = view.bbsList(req.session, rows, page, startPage, endPage, totalPage);
            res.send(html);
        });
    });
});

bbsRouter.get('/create', (req, res) => {
    const view = require('./view/BBS');
    let html = view.createForm(req.session.uname, req.session.uid);
    res.send(html);
});

bbsRouter.post('/create', upload.single('image'), (req, res) => {
    let uid = req.body.uid;
    let title = req.body.title;
    let content = req.body.content;
    let image = req.file ? `/upload/${req.file.filename}` : '/upload/blank.jpg';
    let params = [uid, title, content, image];
    dm.regPost(params, function() {
        res.redirect('/bbs/list/1');
    });
});

bbsRouter.get('/list/post/:bid', (req, res) => {
    dm.getPost(req.params.bid, result => {
        dm.viewCount(req.params.bid, () => {
            dm.getReply(req.params.bid, r_result => {
                const view = require('./view/BBS');
                let html = view.postForm(req.session, result, r_result);
                res.send(html);
            });
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
        let html = am.alertMsg('수정 권한이 없습니다.', '/bbs/list/1');
        res.send(html);
    }
});

bbsRouter.post('/update', util.isLoggedIn, upload.single('image'), (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let bid = req.body.bid;
    let image = req.file ? `/upload/${req.file.filename}` : '/upload/blank.jpg';
    let params = [title, content, image, bid];
    console.log(params);
    dm.updatePost(params, () => {
        res.redirect(`/bbs/list/post/${bid}`);
    });
});

bbsRouter.get('/delete/:bid/uid/:uid', util.isLoggedIn, (req, res) => {
    if (req.params.uid === req.session.uid) {
        let uid = req.session.uid;
        let uname = req.session.uname;
        let bid = req.params.bid;
        const view = require('./view/BBS');
        let html = view.deletePost(uid, uname, bid);
        res.send(html);
    } else {
        let html = am.alertMsg('삭제 권한이 없습니다.', '/bbs/list/1');
        res.send(html);
    }
});

bbsRouter.get('/deleteConfirm/:bid', util.isLoggedIn, (req, res) => {
    dm.deletePost(req.params.bid, () => {
        res.redirect('/bbs/list/1');
    });
});

bbsRouter.post('/search', util.isLoggedIn, (req, res) => {
    let title = req.body.title;
    dm.search(title, rows => {
        if (rows.length < 1) {
            let html = am.alertMsg('검색결과가 없습니다.', '/bbs/list/1');
            res.send(html);
        } else {
            const view = require('./view/BBS');
            let html = view.searchList(req.session, rows);
            res.send(html);
        }
    });
});


bbsRouter.post('/reply', (req, res) => {
    let bid = req.body.bid;
    let uid = req.session.uid;
    let content = req.body.content;
    let params = [bid, uid, content];
    dm.regReply(params, function() {
        dm.replyCount(bid, () => {
            dm.myReply(bid, () => {
                res.redirect(`/bbs/list/post/${bid}`);
            });
        });
    });
});

module.exports = bbsRouter;