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

let sql = `SELECT city.Name AS city, city.Population AS population, countryLanguage.\`Language\` AS language FROM city
    JOIN countrylanguage
    ON city.CountryCode = countrylanguage.CountryCode
    WHERE IsOfficial LIKE 'T'
    ORDER BY population DESC
    LIMIT 10;
`;
conn.query(sql, (error, rows, fields) => {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.city, row.population, row.language);
    }
});

conn.end();