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
    getAllLists: function(callback) {       // 화살표 함수로 하면 동작 안 함
        let conn = this.getConnection();    // 파일 내 함수 불러오기 this.~
        let sql = `SELECT * FROM song ORDER BY hsid DESC LIMIT 5;`;
        conn.query(sql, (error, rows, field) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getJoinLists: function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT song.hsid, song.title, gg.name, song.lyrics FROM song 
        left JOIN girl_group AS gg
        ON song.hsid=gg.hit_song_id 
        ORDER BY song.hsid DESC 
        LIMIT 10;`;
        conn.query(sql, (error, rows, field) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    insertSong: function(params, callback) {
        let sql = `INSERT INTO song(title, lyrics) VALUES(?, ?)`;
        let conn = this.getConnection();
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteSong: function(hsid, callback) {
        let sql = `DELETE FROM song WHERE hsid=?;`;
        let conn = this.getConnection();
        conn.query(sql, hsid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getSong: function(hsid, callback) {
        let sql = `SELECT * FROM song WHERE hsid=?;`;
        let conn = this.getConnection();
        conn.query(sql, hsid, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows[0]);
        });
        conn.end();
    },
    updateSong: function(params, callback) {
        let sql = `UPDATE song SET title=?, lyrics=? WHERE hsid=?;`;
        let conn = this.getConnection();
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}