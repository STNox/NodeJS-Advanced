const { response } = require('express');
const fs = require('fs');
const mysql = require('mysql');

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
    regUser: function(){
        let conn = this.getConnection();
        let sql = `INSERT INTO users(uid, pwd, uname, tel, email) VALUES (?, ?, ?, ?, ?)`
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getBbsLists: function(callback) {       // 화살표 함수로 하면 동작 안 함
        let conn = this.getConnection();    // 파일 내 함수 불러오기 this.~
        let sql = `
        SELECT bid, title, uid, DATE_FORMAT(regDate, '%Y-%m-%d %T') AS regDate, viewCount FROM bbs 
            WHERE isDeleted=0 ORDER BY regDate DESC LIMIT 10;`;
        conn.query(sql, (error, rows, field) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    }
}