module.exports = {
    header: function(uid, uname, title) {
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <title>Music Studio</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
            <link rel="stylesheet" href="/fontawesome-free-5.15.1-web/css/all.min.css"
            <script src="/jquery/jquery.min.js"></script>
            <script src="/popper/popper.min.js"></script>
            <script src="/bootstrap/js/bootstrap.min.js"></script>
            <style type="text/CSS">
                a:link{color: black; text-decoration: none;}
                a:visited{color: grey; text-decoration: none;}
            </style>
        </head>
        <body>
            <nav id="top" class="navbar navbar-expand-sm bg-dark navbar-dark">
                <a class="navbar-brand" href="#">
                    <img src="/img/music.jpg" alt="Music Stidio" height="50px" style="margin-left: 10px;">
                </a>
                <ul class="nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" style="color: white; margin-left: 5px;" href="/home"><i class="fas fa-home" style="margin-right: 10px"></i>홈</a>
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
                    ${uname} 님 반갑습니다!
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
    },
    loginHome: function(uid, uname) {
        console.log(uid, uname);
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <title>Music Studio</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            <style type="text/CSS">
                a:link{color: black; text-decoration: none;}
                a:visited{color: black; text-decoration: none;}
            </style>
        </head>
        <body>
            <div class="container">
                <div id="demo" class="carousel slide" data-ride="carousel" style="margin-top: 40px; text-align: center;">
                    <ul class="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" class="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                        <li data-target="#demo" data-slide-to="3"></li>
                        <li data-target="#demo" data-slide-to="4"></li>
                        
                    </ul>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img src="/img/iu.jpg" alt="IU" height="500">
                        <div class="carousel-caption">
                            <h3 class="text-body"></h3>
                            <p class="text-body"></p>
                        </div>   
                        </div>
                        <div class="carousel-item">
                        <img src="/img/younha.jpg" alt="Younha" height="500">
                        <div class="carousel-caption">
                            <h3 class="text-body"></h3>
                            <p class="text-body"></p>
                        </div>   
                        </div>
                        <div class="carousel-item">
                        <img src="/img/beenzino.jpg" alt="Beenzino" height="500">
                        <div class="carousel-caption">
                            <h3 class="text-body"></h3>
                            <p class="text-body"></p>
                        </div>   
                        </div>
                        <div class="carousel-item">
                        <img src="/img/jangbeomjun.jpg" alt="Jangbeomjun" height="500">
                        <div class="carousel-caption">
                            <h3></h3>
                            <p></p>
                        </div>   
                        </div>
                        <div class="carousel-item">
                        <img src="/img/bol4.jpg" alt="Bol4" height="500">
                        <div class="carousel-caption">
                            <h3></h3>
                            <p></p>
                        </div>   
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#demo" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </a>
                </div>
                <div class="row">
                    <div class="col-2"></div>
                    <div class="col-8 mt-4">
                    <h3>Music Studio</h3>
                    <p class="text-info">${uname}님 환영합니다!</p>
                    </div>
                    <div class="col-2">
                    </div>
                </div>
                <hr>
                <div class="row mt-5">
                    <div class="col-4"></div>
                    <div class="col-4">
                        <table class="table table-borderless">
                        <tr>
                            <td style="text-align: center;">
                            <a href="/bbs/list/1"><i class="far fa-list-alt" style="margin-right: 10px; font-size: 100px; color: grey"></i></a>
                            </td>
                            <td style="text-align: center;">
                            <a href="/user/userInfo/${uid}"><i class="fas fa-user" style="margin-right: 10px; font-size: 100px; color: darkblue"></i></a>
                            </td>
                            <td style="text-align: center;">
                            <a href="/logout"><i class="fas fa-sign-out-alt" style="margin-right: 10px; font-size: 100px; color: darkred"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: center; font-size: large; font-weight: bold"><a href="/bbs/list/1">게시판</a></td>
                            <td style="text-align: center; font-size: large; font-weight: bold"><a href="/user/userInfo/${uid}">사용자 정보</a></td>
                            <td style="text-align: center; font-size: large; font-weight: bold"><a href="/logout">로그아웃</a></td>
                        </tr>
                        </table>
                        <br><br>
                    </div>
                    <div class="col-4"></div>
                </div>
                <nav class="navbar navbar-expand-sm bg-light justify-content-center navbar-light fixed-bottom">
                <span class="navbar-text">Copyright &copy; 2020, Wy</span>
                </nav>
            </div>
        </body>
        </html>`
    }
}