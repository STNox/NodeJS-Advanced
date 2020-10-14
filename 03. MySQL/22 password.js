const mysql = require('mysql');
const fs = require('fs');
const crypto = require('./21 crypto-module')
let info = fs.readFileSync('./mysql.json', 'utf-8');
let config = JSON.parse(info);
let conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
});

conn.connect();

let pwd = crypto.getPassword();
let sql = `INSERT INTO users(uid, pwd, uname) VALUES(?, ?, ?);`;
let params = ['admin', pwd, '관리자']
conn.query(sql, params, function(error, fields) {
    if (error)
        console.log(error);
});

conn.end();