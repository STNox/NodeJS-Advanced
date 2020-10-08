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

let sql = `SELECT NAME, date_format(debut, '%Y-%m-%d') AS 'debutDate' FROM girl_group 
    WHERE debut BETWEEN '2009-01-01' AND '2009-12-31';
`;
conn.query(sql, (error, rows, fields) => {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.NAME, row.debutDate);
    }
});

conn.end();