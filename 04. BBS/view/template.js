module.exports = {
    header: function(uid, uname, title) {
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <title>My BBS</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
            <link rel="stylesheet" href="/fontawesome-free-5.15.1-web/css/all.min.css"
            <script src="/jquery/jquery.min.js"></script>
            <script src="/popper/popper.min.js"></script>
            <script src="/bootstrap/js/bootstrap.min.js"></script>
        </head>
        <body>
            <nav id="top" class="navbar navbar-expand-sm bg-dark navbar-dark">
                <a class="navbar-brand" href="#">
                    <img src="/img/hoseo.jpg" alt="호서직업능력개발원" height="40px" style="margin-left: 10px;">
                </a>
                <ul class="nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" style="color: white; margin-left: 5px;" href="/bbs/list"><i class="fas fa-home" style="margin-right: 10px"></i>홈</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="color: white" href="/bbs/create"><i class="fas fa-pencil-alt" style="margin-right: 10px"></i>글 작성</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="color: white" href="/user/userInfo/${uid}"><i class="fas fa-user" style="margin-right: 10px"></i>사용자 정보</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="color: white" href="/logout"><i class="fas fa-sign-out-alt" style="margin-right: 10px"></i>로그아웃</a>
                    </li>
                </ul>
                <form class="form-inline mr-auto" method="post" action="/bbs/search">
                    <input class="form-control mr-sm-2" name="title" id="title" type="text" placeholder="검색">
                    <button class="btn btn-outline-success" type="submit"><i class="fas fa-search"></i></button>
                </form>
                <div class="navbar-text fixed-right" style="color:white;">
                    '${uname}'님 반갑습니다!
                </div>
            </nav>
        `;
    },
    footer: function() {
        return `
            <nav class="navbar navbar-expand-sm bg-light justify-content-center navbar-light fixed-bottom">
                <span class="navbar-text">Copyright &copy; 2020, Wy</span>
            </nav>
        </body>
        </html>
        `;
    }
}