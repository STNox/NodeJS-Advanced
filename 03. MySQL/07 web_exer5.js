const http = require('http');
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
let sql = `SELECT city.Name AS city, city.Population AS population, countryLanguage.\`Language\` AS language FROM city
    JOIN countrylanguage
    ON city.CountryCode = countrylanguage.CountryCode
    WHERE IsOfficial LIKE 'T'
    ORDER BY population DESC
    LIMIT 10;
`;
let html = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>연습문제 5</title>
</head>
<body>
    <h3>연습문제 5</h3>
    <hr>
    <table>
        <tr>
            <th>도시명</th>
            <th>인구 수</th>
            <th>공식 언어</th>
        </tr>
`;

let server = http.createServer((req, res) => {
    conn.connect();
    conn.query(sql, (error, rows, fields) => {
        if (error)
            console.log(error);
        for (let row of rows) {
            html += `<tr><td>${row.city}</td>
                         <td>${row.population}</td>
                         <td>${row.language}</td>
                     </tr>`;
        }
        html += `</table>
                </body>
                </html>`
        res.end(html);
    });
    conn.end();
});
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});