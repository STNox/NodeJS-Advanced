const fs = require('fs');
const { connect } = require('http2');
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
        let sql = `INSERT INTO users(uid, pwd, tel, email, uname, photo) VALUES(?, ?, ?, ?, ?, ?);`;
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
    getUserList: function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT uid, uname, tel, email, photo FROM users WHERE isDeleted=0;`;
        conn.query(sql, (error, rows, field) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    updateUser: function(params, callback) {
        console.log(params);
        let conn = this.getConnection();
        let sql = `UPDATE users SET pwd=?, tel=?, email=?, uname=?, photo=? WHERE uid LIKE ?;`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteUser: function(uid, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE users SET isDeleted=1 WHERE uid LIKE ?;`;
        conn.query(sql, uid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getBbsLists: function(offset, callback) {       // 화살표 함수로 하면 동작 안 함
        let conn = this.getConnection();    // 파일 내 함수 불러오기 this.~
        let sql = `
        SELECT bid, title, bbs.uid, users.uname, users.photo, IF(DATE(modTime)>=DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_FORMAT(modTime, '%T'), DATE_FORMAT(modTime, '%Y-%m-%d')) AS regDate, viewCount, replyCount FROM bbs 
            JOIN users ON users.uid=bbs.uid
            WHERE bbs.isDeleted=0 ORDER BY bid DESC LIMIT 10 OFFSET ?;`;
        conn.query(sql, offset, (error, rows, field) => {
            console.log(rows);
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getTotalBbsCount: function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT COUNT(*) AS count FROM bbs WHERE isDeleted=0;`;
        conn.query(sql, (error, results, field) => {
            if (error)
                console.log(error)
            callback(results[0]);
        });
        conn.end();
    },
    regPost: function(params, callback) {
        let conn = this.getConnection();
        let sql = `INSERT INTO bbs(uid, title, content, image) VALUES(?, ?, ?, ?);`;
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
        SELECT b.bid, b.title, u.uid, b.viewCount, b.replyCount, u.uname, u.photo, DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime, b.content, b.image FROM bbs AS b
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
        let sql = `UPDATE bbs SET title=?, content=?, image=? WHERE bid=?;`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deletePost: function(bid, callback) {
        let conn = this.getConnection();
        let sql = 'UPDATE bbs SET isDeleted=1 WHERE bid=?;';
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
        SELECT r.bid, r.rid, u.uname, u.photo, DATE_FORMAT(r.regTime, '%Y-%m-%d %T') AS regTime, r.content, r.isMine FROM reply AS r
            JOIN users AS u ON r.uid=u.uid
            WHERE r.bid=?;`;
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
    replyCount: function(bid, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE bbs SET replyCount=replyCount+1 WHERE bid=?;`;
        conn.query(sql, bid, (error, field) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    myReply: function(bid, callback) {
        let conn = this.getConnection();
        let sql = `
        UPDATE reply AS r INNER JOIN bbs AS b
            ON r.uid=b.uid
            SET isMine=IF(r.uid=b.uid, 1, 0)
            WHERE b.bid=?;`;
        conn.query(sql, bid, (error, field) => {
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
    },
    search: function(title, callback) {
        console.log(title);
        let conn = this.getConnection();
        let sql = `
        SELECT bid, bbs.uid, users.uname, users.photo, title, DATE_FORMAT(modTime, '%Y-%m-%d %T') AS regDate, viewCount, replyCount FROM bbs
            JOIN users ON users.uid=bbs.uid
            WHERE title LIKE ? AND bbs.isDeleted=0
            ORDER BY bid DESC LIMIT 10;`;
        conn.query(sql, `%${title}%`, (error, rows, field) => {
            console.log(rows);
            if (error)
                console.log(error);
            callback(rows);
        });
    }
}

// update bbs set modTime=now() where bid = 1004;