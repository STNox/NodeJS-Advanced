const express = require('express');
const morgan = require('morgan');
const app = express();

// app.use(morgan('combined'));
// app.use(morgan(':method + :date + :remote-addr'));
app.use(morgan('short'))
app.use((req,res) => {
    res.send('<h1>Morgan Middleware</h1>');
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});