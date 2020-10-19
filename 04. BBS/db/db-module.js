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
    regUser: function(params, callback){
        let conn = this.getConnection();
        let sql = `INSERT INTO users(uid, pwd, tel, email, uname) VALUES(?, ?, ?, ?, ?);`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
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
    getBbsLists: function(callback) {       // 화살표 함수로 하면 동작 안 함
        let conn = this.getConnection();    // 파일 내 함수 불러오기 this.~
        let sql = `
        SELECT bid, title, uid, DATE_FORMAT(modTime, '%Y-%m-%d %T') AS regDate, viewCount FROM bbs 
            WHERE isDeleted=0 ORDER BY regDate DESC LIMIT 10;`;
        conn.query(sql, (error, rows, field) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    regPost: function(params, callback) {
        let conn = this.getConnection();
        let sql = `INSERT INTO bbs(uid, title, content) VALUES(?, ?, ?);`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getPost: function(bid, callback) {
        let conn = this.getConnection();
        let sql = `
        SELECT b.bid, b.title, u.uid, u.uname, DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime, b.content FROM bbs AS b
            JOIN users AS u
            ON b.uid=u.uid
            WHERE bid=?;
            `;
        conn.query(sql, bid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);
        });
        conn.end();
    },
    updatePost: function(params, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE bbs SET title=?, content=? WHERE bid=?;`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deletePost: function(bid, callback) {
        let conn = this.getConnection();
        let sql = 'DELETE FROM bbs WHERE bid=?;';
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    regReply: function(params, callback) {
        let conn = this.getConnection();
        let sql = `INSERT INTO reply(bid, uid, content) VALUES(?, ?, ?)`
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getReply: function(bid, callback) {
        let conn = this.getConnection();
        let sql = `
        SELECT b.bid, u.uid, u.uname, DATE_FORMAT(r.regTime, '%Y-%m-%d %T') AS regTime, r.content FROM reply AS r
            JOIN users AS u ON r.uid=u.uid
            JOIN bbs AS b ON r.uid=b.uid;`;
        conn.query(sql, bid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results);
        });
        conn.end();
    },
    viewCount: function(bid, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE bbs SET viewCount=viewCount+1 WHERE bid=?;`;
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    modTime: function(bid, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE bbs SET modTime=now() WHERE bid=?;`;
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}

// update bbs set modTime=now() where bid = 1004;