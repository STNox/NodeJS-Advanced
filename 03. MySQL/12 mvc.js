const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/db-module');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    /* dm.getAllLists(rows => {
        const view = require('./view/join');                        // html 관련된 코드는 외부 파일로 만들어 코드 간략화, 쉬운 업데이트
        let html = view.mainForm(rows);
        res.send(html);
    }); */
    dm.getJoinLists(rows => {
        const view = require('./view/join');                        // html 관련된 코드는 외부 파일로 만들어 코드 간략화, 쉬운 업데이트
        let html = view.mainForm(rows);
        res.send(html);
    });
});

app.get('/insert', (req, res) => {
    const view = require('./view/insert');
    let html = view.insertForm();
    res.send(html);
});

app.post('/insert', (req, res) => {
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let params = [title, lyrics];
    
    dm.insertSong(params, () => {
        res.redirect('/');
    });
});

app.get('/delete/:hsid', (req, res) => {
    let hsid = parseInt(req.params.hsid);
    console.log(hsid);
    dm.deleteSong(hsid, () => {
        res.redirect('/');
    });
});

app.get('/update/:hsid', (req, res) => {
    let hsid = parseInt(req.params.hsid);
    dm.getSong(hsid, result => {
        const view = require('./view/update')
        let html = view.updateForm(result);
        res.send(html);
    });
});

app.post('/update', (req, res) => {
    let hsid = parseInt(req.body.hsid);
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let params = [title, lyrics, hsid];

    dm.updateSong(params, () => {
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});