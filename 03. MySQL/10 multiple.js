const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf-8');
let config = JSON.parse(info); 
let conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
});

conn.connect();

let sql = `INSERT INTO song(title, lyrics) VALUES ?`;
let params = [
    ['More & More', '멈추지 못해 more more more and more'],
    ['Dynamite', 'I came to dance-dance-dance']
];
conn.query(sql, [params], (error, fields) => {
    if (error)
        console.log(error);
    let sql = 'SELECT * FROM song ORDER BY hsid DESC LIMIT 3';
    conn.query(sql, (error, rows, fields) => {
        if (error)
            console.log(error);
        for (let row of rows) {
            console.log(row.hsid, row.title, row.lyrics);
        }
    });
    conn.end();
});
