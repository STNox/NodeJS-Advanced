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
let pwd = '1234';             //req.body.pswd
let pwdHash = genHash(pwd);

let sql = `SELECT * FROM users WHERE uid LIKE ?;`;
conn.query(sql, uid, function(error, results, fields) {
    if (error)
        console.log(error);
    let result = results[0];
    if (result.pwd === pwdHash) { // result.pwd: 데이터베이스에 기록된 암호, pwdHash: 새로 입력한 암호
        console.log('Login 성공')
    } else {
        console.log('Login 실패: 패스워드가 다릅니다.');
    }
});

conn.end();