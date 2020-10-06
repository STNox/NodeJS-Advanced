const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const util = require('util');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(multipart({uploadDir: __dirname+'/public/upload'}));

app.get('/', (req, res) => {
    fs.readFile('10 fileform.html', 'utf8', (error, data) => {
        res.send(data);
    });
});

app.post('/', (req, res) => {
    let comment = req.body.comment;
    let filename = req.files.image.name;
    let type = req.files.image.type;
    let uploadPath = req.files.image.path;

    // 받은 파일이 이미지면 이름을 변경하고, 아니면 제거
    if (type.indexOf('image') >= 0) {
        let outputName = comment + filename;
        let newFileName = __dirname + '/public/upload/' + outputName;
        fs.rename(uploadPath, newFileName, err => {
            res.send(`<h1>${newFileName}</h1>`);
        });
    } else {
        fs.unlink(uploadPath, err => {
            if (err)
                console.log(error);
            res.status(404).send('<h1>Bad Request</h1>');
        });
    }
});

app.listen(3000, () => {
    util.log('Server running at http://localhost:3000');
});