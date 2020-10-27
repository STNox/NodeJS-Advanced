const fs = require('fs');
const mysql = require('mysql');

let info = fs.readFileSync('../mysql.json', 'utf-8');
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

/* let sqlUsers = `
create table users (
    uid varchar(20) not null primary key,
    pwd char(44) not null,
    uname varchar(10) not null,
    tel varchar(20),
    email varchar(40),
    regDate datetime default current_timestamp,
    isDeleted int default 0,
    photo varchar(50) not null default 'upload/default.png'
);`;
let conn = getConnection();
conn.query(sqlUsers, function(error, fields) {
    if (error)
        console.log(error);
});
conn.end(); */

let usersArray = [
    ['admin', 'jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=', null, null, '관리자', '/upload/default.png'],
    ['iu', 'n+S4LzSDhLXRDgNoBChSFwhyGEkTIr9HiqZw25qSlqc=', '010-1111-2222', 'iu@iu.com', '아이유', '/upload/20201023013542074_iu.jpg'],
    ['dareharu', '3qNO2h0JgiJCwOfOSmVlfQzBE8KlFl4vtRPGnJmEQDo=', '010-9999-6699', 'dareharu@dareharu.com', '달의하루', '/upload/20201023014308499_dareharu.jpg'],
    ['younha', 'jvxFjuZk5+ZM2BrbqxDG3qRFgy2qpKQWIPrYVnIkEJg=', '010-9996-7888', 'younha@younha.com', '윤하', '/upload/20201023014830931_younha.png']
];
let sqlInsert = `INSERT INTO users(uid, pwd, tel, email, uname, photo) VALUES(?, ?, ?, ?, ?, ?);`;

let conn = getConnection();
for (let params of usersArray) {
    conn.query(sqlInsert, params, (error, fields) => {
        if (error)
            console.log(error);
    });
}
conn.end();

/* let sqlBbs = `
create table bbs (
    bid int not null primary key auto_increment,
    uid varchar(20) not null,
    title varchar(100) not null,
    content varchar(1000),
    modTime datetime default current_timestamp,
    viewCount int default 0,
    isDeleted int default 0,
    replyCount int default 0,
    image varchar(50) default 'upload/blank.jpg',
    foreign key (uid) references users(uid)
) auto_increment=1001;
`;
let conn = getConnection();
conn.query(sqlBbs, function(error, fields) {
    if (error)
        console.log(error);
});
conn.end(); */

/* let bbsArray = [
    ['iu', 'Love Poem', '01. unlucky\n02. 그 사람\n03. Blueming\n 04. 시간의 바깥\n 05. 자장가\n 06. Love Poem'],
    ['dareharu', '염라(karma)', '염라(karma)\n\n싱글'],
    ['younha', 'UNSTABLE MINDSET', '01. WINTER FLOWER (feat. RM)\n 02. 먹구름\n 03. 다음에 봐\n 04. 스무살 어느 날\n 05. 26']
];
let sqlInsert = `insert into bbs(uid, title, content) values(?, ?, ?);`;

let conn = getConnection();
for (let params of bbsArray) {
    conn.query(sqlInsert, params, function(error, fields) {
        if(error)
            console.log(error);
    });
} */

/* let sqlReply = `
create table reply (
    rid int not null primary key auto_increment,
    bid int not null,
    uid varchar(20) not null,
    content varchar(100),
    regTime datetime default current_timestamp,
    isMine tinyint(1) default 0,
    foreign key (bid) references bbs(bid),
    foreign key (uid) references users(uid)
);`;
let conn = getConnection();
conn.query(sqlReply, function(error, fields) {
    if (error)
        console.log(error);
});
conn.end(); */

/* let replyArray = [
    ['1001', 'iu', 'ㅎㅇ'],
    ['1001', 'iu)', '댓글놀이'],
    ['1001', 'younha', '❤'],
    ['1001', 'younha', '(●\'◡\'●)']
];
let sqlInsert = `insert into reply(bid, uid, content) values(?, ?, ?);`;

let conn = getConnection();
for (let params of replyArray) {
    conn.query(sqlInsert, params, function(error, fields) {
        if(error)
            console.log(error);
    });
} */
