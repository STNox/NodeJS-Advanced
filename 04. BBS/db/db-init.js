const fs = require('fs');
const mysql = require('mysql');

let info = fs.readFileSync('../mysql.json', 'utf-8');
let config = JSON.parse(info); 


function getConnection() {
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
}

let sql = `SELECT bid, title, uid, DATE_FORMAT(modTime, '%Y-%m-%d %T') AS regDate, viewCount FROM bbs 
WHERE isDeleted=0 ORDER BY regDate DESC LIMIT 10;`;
let conn = getConnection();
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    console.log(rows);
});
conn.end();