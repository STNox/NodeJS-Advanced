const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf-8');
let config = JSON.parse(info); 

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

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

app.get('/', (req, res) => {
    let conn = getConnection();
    let sql = `SELECT * FROM song ORDER BY hsid DESC LIMIT 5;`;
    conn.query(sql, (error, rows, field) => {
        let html = fs.readFileSync('11 list.html', 'utf-8');
        for (let row of rows) {
            html += `<tr><td>${row.hsid}</td>
                         <td>${row.title}</td>
                         <td>${row.lyrics}</td>
                     </tr>`;
        }
        html += `</table>
                </body>
                </html>`
        res.end(html);
    });
    conn.end();
});
app.get('/insert', (req, res) => {
    fs.readFile('11 song.html', 'utf8', (error, data) => {
        res.send(data);
    });
});

app.post('/insert', (req, res) => {
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let sql = `INSERT INTO song(title, lyrics) VALUES(?, ?)`;
    let params = [title, lyrics];
    let conn = getConnection();
    conn.query(sql, params, (error, fields) => {
        if (error)
            console.log(error);
        res.redirect('/');
    });
    conn.end();
});


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});