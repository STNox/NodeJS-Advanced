const fs = require('fs');
const mysql = require('mysql');
const crypto = require('crypto');

let info = fs.readFileSync('./mysql.json', 'utf-8');
let config = JSON.parse(info); 

module.exports = {
    getConnection: function() {
        let conn = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port
        });
        conn.connect(function(error) {
            if (error) 
                console.log(error);
        });
        return conn;
    },
    getAllLists: function(callback) {       // 화살표 함수로 하면 동작 안 함
        let conn = this.getConnection();    // 파일 내 함수 불러오기 this.~
        let sql = `SELECT uid, uname, DATE_FORMAT(regDate, '%Y-%m-%d %T') AS regDate FROM users ORDER BY regDate;`;
        conn.query(sql, (error, rows, field) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getUserInfo: function(uid, callback) {
        let conn = this.getConnection();
        let sql = `SELECT * FROM users WHERE uid LIKE ?;`;
        conn.query(sql, uid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);
        });
        conn.end();
    },
    genHash: function(sth) {
        let shasum = crypto.createHash('sha256');
        shasum.update(sth);
        return shasum.digest('base64');
    }
}