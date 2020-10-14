const fs = require('fs');
const mysql = require('mysql');

let info = fs.readFileSync('./mysql.json', 'utf-8');
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

let sql = `
    CREATE TABLE bbs (
        bid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        uid VARCHAR(20) NOT NULL,
        title VARCHAR(100) NOT NULL,
        content VARCHAR(1000),
        modTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        viewCount INT DEFAULT 0,
        isDeleted INT DEFAULT 0,
        FOREIGN KEY(uid) REFERENCES users(uid)
    ) AUTO_INCREMENT=1001;`;
let conn = getConnection();
conn.query(sql, function(error, fields) {
    if (error)
        console.log(error);
    console.log();
});
conn.end();