const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const view = require('./view/index');
const template = require('./view/template');
const util = require('util');
const multipart = require('connect-multiparty');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(multipart({uploadDir: __dirname+'/public/fileWebImage'}));
app.use(express.static(__dirname + '/public/fileWebImage'));


app.get('/', (req, res) => {
    fs.readdir('data', (error, filelist) => {
        let list = template.listGen(filelist);
        let content = template.HOME_CONTENTS;
        let control = template.buttonGen();
        let html = view.index('Web 기술', list, content, control, true);
        res.send(html);
    });
});
app.get('/id/:id', (req, res) => {
    fs.readdir('data', (error, filelist) => {
        let list = template.listGen(filelist);
        let title = req.params.id;                                      // req.params.id를 줄 때는 app.get('/id/:id'), :id가 필수
        let control = template.buttonGen(title);                        // 기본 폼에서 버튼에 변수를 걸어줘야 함
        let filename = 'data/' + title + '.txt';
        fs.readFile(filename, 'utf8', (error, buffer) => {
            buffer = buffer.replace(/\n/g, '<br>');
            let html = view.index(title, list, buffer, control, true);
            res.send(html);
        });
    });
});

app.get('/create', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let control = template.buttonGen();
        let content = template.createForm();
        let html = view.index('글 생성', list, content, control, false);
        res.send(html);
    });
});
app.post('/create', (req, res) => {
    let sbjct = req.body.subject;
    let dscrptn = req.body.description;
    let filepath = 'data/' + sbjct + '.txt';
    fs.writeFile(filepath, dscrptn, error => {
        let imageName = sbjct + '.jpg';
        let imagePath = req.files.image.path;
        let newFileName = __dirname + '/public/fileWebImage/' + imageName;
        fs.rename(imagePath, newFileName, error => {
            let encoded = encodeURI(`/id/${sbjct}`)
            res.status(302).redirect(encoded);  // redirection
        });
        
    });
});

app.get('/delete/id/:id', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let title = req.params.id;
        let list = template.listGen(filelist);
        let control = template.buttonGen();
        let content = template.deleteForm(title);
        let html = view.index('글 삭제', list, content, control, false);
        res.send(html);
    });
});
app.post('/delete', (req, res) => {
    let sbjct = req.body.subject;
    let filepath = 'data/' + sbjct + '.txt';
    let imagePath = 'public/fileWebImage/' + sbjct + '.jpg';
    fs.unlink(filepath, error => {
        fs.unlink(imagePath, error => {
            res.redirect('/');
        });
    });
});

app.get('/update/id/:id', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let sbjct = req.params.id;
        console.log(sbjct);
        let control = template.buttonGen();
        let filename = 'data/' + sbjct + '.txt';
        fs.readFile(filename, 'utf8', (error, buffer) => {
            let content = template.updateForm(sbjct, buffer)
            let html = view.index(sbjct, list, content, control, true); // 수정하는 화면에서도 사진을 띄우려 할 때 sbjct로 바꿔줌.
            res.send(html);
        });
    });
});
app.post('/update', (req, res) => {
    let sbjct = req.body.subject;
    let orgsbjct = req.body.original;
    let dscrptn = req.body.description;
    let filepath = 'data/' + orgsbjct + '.txt';
    let imagePath = 'public/fileWebImage/' + orgsbjct + '.jpg';
    fs.writeFile(filepath, dscrptn, error => {
        if (orgsbjct !== sbjct) {                                        // 제목이 바뀔 경우
            fs.renameSync(filepath, `data/${sbjct}.txt`);
            fs.renameSync(imagePath, `public/fileWebImage/${sbjct}.jpg`);
        }
        let uploadType = req.files.image.type;
        let uploadPath = req.files.image.path;
        if (uploadType.indexOf('image') >= 0) {                          // 수정 시에 이미지가 새로 들어오는지 확인(이미지 수정 없이 내용을 수정하는지)
            let imageName = sbjct + '.jpg';
            let newFileName = __dirname + '/public/fileWebImage/' + imageName;
                fs.rename(imagePath, newFileName, error => {
                let encoded = encodeURI(`/id/${sbjct}`)
                    res.status(302).redirect(encoded);
                });
        } else {
            fs.unlink(uploadPath, error => {
                res.redirect(`/id/${sbjct}`)
            });
        }
    });
});

app.get('*', (req, res) => {
    res.status(404).send('Path not found');
})

app.listen(3000, function () {
    util.log('Server running at http://localhost:3000');
});