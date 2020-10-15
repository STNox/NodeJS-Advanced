const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const dm = require('./db/db-module');
const util = require('./util');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
    secret: '1q2w3e4r5t6y',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));

const bbsRouter = express.Router();

bbsRouter.get('/list', util.isLoggedIn, (req, res) => {
    dm.getBbsLists(rows => {
        const view = require('./view/bbsList');
        let html = view.bbsList(req.session.uname, rows);
        res.send(html);
    });
});

bbsRouter.get('/create', (req, res) => {
    res.send('BBSRouter get create');
});

bbsRouter.post('/create', (req, res) => {

});

module.exports = bbsRouter;