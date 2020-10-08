const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf-8');
let connInfo = JSON.parse(info); 
let conn = mysql.createConnection({
    host: connInfo.host,
    user: connInfo.user,
    password: connInfo.password,
    database: connInfo.database,
    port: connInfo.port
});

conn.connect();

let sql = `SELECT l.NAME AS name, date_format(l.debut, '%Y-%m-%d') AS debutDate, r.title AS songTitle 
    FROM girl_group AS l
    JOIN song AS r
    ON l.hit_song_id = r.hsid
    WHERE debut BETWEEN '2009-01-01' AND '2009-12-31'
    ORDER BY debut;
`;
conn.query(sql, (error, rows, fields) => {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.name, row.debutDate, row.songTitle);
    }
});

conn.end();