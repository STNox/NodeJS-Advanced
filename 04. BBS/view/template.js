module.exports = {
    header: function() {
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <title>My BBS</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
            <link rel="stylesheet" href="fontawesome-free-5.15.1-web/css/all.min.css"
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
                        <a class="nav-link" style="color: white; margin-left: 5px;" href="index_login.html"><i class="fas fa-home" style="margin-right: 10px"></i>홈</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="color: white" href="/logout">로그아웃</a>
                    </li>
                </ul>
                <div class="navbar-text fixed-right" style="color:white;">
                    홍길동님 반갑습니다!
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