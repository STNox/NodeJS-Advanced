const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/db-module gg');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/gglist');
        let html = view.mainForm(rows);
        res.send(html);
    });
});

app.get('/insert', (req, res) => {
    const view = require('./view/insert gg');
    let html = view.insertForm();
    res.send(html);
});

app.post('/insert', (req, res) => {
    let NAME = req.body.NAME;
    let debut = req.body.debut;
    let params = [NAME, debut];
    
    dm.insertGgroup(params, () => {
        res.redirect('/');
    });
});

app.get('/delete/:ggid', (req, res) => {
    let ggid = parseInt(req.params.ggid);
    console.log(ggid);
    dm.deleteGgroup(ggid, () => {
        res.redirect('/');
    });
});

app.get('/update/:ggid', (req, res) => {
    let ggid = parseInt(req.params.ggid);
    dm.getGgroup(ggid, result => {
        const view = require('./view/update gg')
        let html = view.updateForm(result);
        res.send(html);
    });
});

app.post('/update', (req, res) => {
    let ggid = parseInt(req.body.ggid);
    let NAME = req.body.NAME;
    let debut = req.body.debut;
    let params = [NAME, debut, ggid];

    dm.updateGgroup(params, () => {
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});