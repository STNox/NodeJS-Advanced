const express = require('express');                           // 모듈화
const userRouter = require('./userRouter');

const BBSRouter = express.Router();

userRouter.get('/list', (req, res) => {

});

userRouter.get('/create', (req, res) => {
    res.send('BBSRouter get create');
});

userRouter.post('/create', (req, res) => {

});
module.exports = BBSRouter;