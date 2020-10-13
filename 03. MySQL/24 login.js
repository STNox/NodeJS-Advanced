const mysql = require('mysql');
const fs = require('fs');
const crypto = require('crypto');
let info = fs.readFileSync('./mysql.json', 'utf-8');
let config = JSON.parse(info);
let conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
});

function genHash(sth) {
    let shasum = crypto.createHash('sha256');
    shasum.update(sth);
    return shasum.digest('base64');
}
conn.connect();
let uid = 'admin';            //req.body.uid
let pwd = '123';             //req.body.pswd
let pwdHash = genHash(pwd);

let sql = `SELECT * FROM users WHERE uid LIKE ?;`;
conn.query(sql, uid, function(error, results, fields) {
    if (error)
        console.log(error);
    let result = results[0];
    if (result === undefined) {
        console.log('Login 실패: 잘못된 uid입니다.');
    } else {
        if (result.pwd === pwdHash) {
            console.log('Login 성공')
        } else {
            console.log('Login 실패: 잘못된 패스워드입니다.');
        }
    }   
});

conn.end();