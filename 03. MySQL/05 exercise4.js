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

let sql = `SELECT continent, country.Name AS cntName, city.Name AS ctName, city.population AS population FROM city
    JOIN country
    ON country.Code = city.CountryCode
    WHERE continent LIKE 'asia'
    ORDER BY population DESC
    LIMIT 10;
`;
conn.query(sql, (error, rows, fields) => {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.continent, row.cntName, row.ctName, row.population);
    }
});

conn.end();