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
        let sql = `SELECT ggid, NAME, DATE_FORMAT(debut, '%Y-%m-%d') AS 'debut' FROM girl_group ORDER BY ggid DESC LIMIT 5;`;
        conn.query(sql, (error, rows, field) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    insertGgroup: function(params, callback) {
        let sql = `INSERT INTO girl_group(NAME, debut) VALUES(?, ?)`;
        let conn = this.getConnection();
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteGgroup: function(ggid, callback) {
        let sql = `DELETE FROM girl_group WHERE ggid=?;`;
        let conn = this.getConnection();
        conn.query(sql, ggid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getGgroup: function(ggid, callback) {
        let sql = `SELECT ggid, NAME, DATE_FORMAT(debut, '%Y-%m-%d') AS 'debut' FROM girl_group WHERE ggid=?;`;
        let conn = this.getConnection();
        conn.query(sql, ggid, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows[0]);
        });
        conn.end();
    },
    updateGgroup: function(params, callback) {
        let sql = `UPDATE girl_group SET NAME=?, debut=? WHERE ggid=?;`;
        let conn = this.getConnection();
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}