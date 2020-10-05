const express = require('express');
const bodyParser = require('body-parser');
const qs = require('qs');
const fs = require('fs');
const view = require('./view/index');
const template = require('./view/template');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.redirect('/login');
});
app.get('/login', (req, res) => {
    fs.readFile('09 loginform.html', 'utf8', (error, data) => {
        res.send(data);
    });
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    console.log(uid, pwd);
    if (uid === 'barista' && pwd === '2000') {
        res.redirect('/main');
    } else {
        res.redirect('/login');
    }
});

app.use(express.static(__dirname + '/data'));
let mainRouter = express.Router();
app.use('/main', mainRouter);
mainRouter.get('/', (req, res) => {
    fs.readdir('data', (error, filelist) => {
        let list = template.listGen(filelist);
        let content = template.HOME_CONTENTS;
        let control = template.buttonGen();
        let html = view.index('Web 기술', list, content, control);
        res.send(html);
    });
});
mainRouter.get('/:id', (req, res) => {
    let id = req.params.id;
    fs.readdir('data', (error, filelist) => {
        let list = template.listGen(filelist);
        let title = id;
        console.log(title);
        let control = template.buttonGen();
        let filename = 'data/' + title + '.txt';
        fs.readFile(filename, 'utf8', (error, buffer) => {
            // buffer = buffer.replace(/\n/g, '<br>');
            let html = view.index(title, list, buffer, control);
            res.send(html);
        });
    });
});

app.get('/create', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let control = template.buttonGen();
        let content = template.createForm();
        let html = view.index('글 생성', list, content, control);
        res.send(html);
    });
});
app.post('/create_proc', (req, res) => {
    let param = req.body;
    let title = param.subject;
    let description = param.description;
    let filepath = 'data/' + title + '.txt';
    fs.writeFile(filepath, description, error => {
        let encoded = encodeURI(`/main/${title}`)
        res.redirect(encoded);  // redirection
        res.send();
    });
});

mainRouter.get('/delete/:id', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let id = req.params.id;
        let list = template.listGen(filelist);
        let control = template.buttonGen();
        let content = template.deleteForm(id);
        let html = view.index('글 삭제', list, content, control);
        res.send(html);
    });
});
mainRouter.post('/delete_proc', (req, res) => {
    let param = req.body;
    let sbjct = param.subject;
    let filepath = 'data/' + sbjct + '.txt';
    fs.unlink(filepath, error => {
        res.redirect('/main');
        res.send();
    });
});

mainRouter.get('/update/:id', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let id = req.params.id;
        let list = template.listGen(filelist);
        let sbjct = id;
        let control = template.buttonGen();
        let filename = 'data/' + sbjct + '.txt';
        fs.readFile(filename, 'utf8', (error, buffer) => {
            let content = template.updateForm(sbjct, buffer)
            let html = view.index(`${sbjct} 수정`, list, content, control);
            res.send(html);
        });
    });
});
mainRouter.post('/update_proc', (req, res) => {
    let param = req.body;
    let sbjct = param.subject;
    let orgsbjct = param.original;
    let dscrption = param.description;
    let filepath = 'data/' + orgsbjct + '.txt';
    fs.writeFile(filepath, dscrption, error => {
        let encoded = encodeURI(`/main/${sbjct}`)
        if (orgsbjct !== sbjct)
            fs.renameSync(filepath, `data/${sbjct}.txt`);
        res.redirect(encoded);
        res.send();
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});