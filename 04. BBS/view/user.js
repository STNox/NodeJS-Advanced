const template = require('./template')

module.exports = {
    register: function() {
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
        <div class="container" style="margin-top: 90px">  
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h3>회원 가입</h3>
                        <hr>
                    </div>
                    <div class="col-3"></div>
                    <div class="col-6">
                        <p class="text-danger">*는 필수정보입니다.</p>
                        <form action="/user/register" method="post" enctype="multipart/form-data">
                            <table class="table">
                                <tr>
                                    <td><label for="uid">사용자 ID*</label></td>
                                    <td><input type="text" name="uid" id="uid"></td>
                                </tr>
                                <tr>
                                    <td><label for="pwd">패스워드*</label></td>
                                    <td><input type="password" name="pwd" id="pwd"></td>
                                </tr>
                                <tr>
                                    <td><label for="pwd2">패스워드 확인*</label></td>
                                    <td><input type="password" name="pwd2" id="pwd2"></td>
                                </tr>
                                <tr>
                                    <td><label for="uname">사용자 이름*</label></td>
                                    <td><input type="text" name="uname" id="uname"></td>
                                </tr>
                                <tr>
                                    <td><label for="tel">전화 번호</label></td>
                                    <td><input type="text" name="tel" id="tel" placeholder="010-0000-0000"></td>
                                </tr>
                                <tr>
                                    <td><label for="email">이메일</label></td>
                                    <td><input type="text" name="email" id="email"></td>
                                </tr>
                                <tr>
                                    <td><label for="photo">프로필 사진</label></td>
                                    <td><input type="file" name="photo" id="photo"></td>
                                <tr>
                                    <td colspan="2" style="text-align: center;">
                                        <input class="btn btn-primary" type="submit" value="회원 가입">
                                        <input class="btn btn-secondary" type="reset" value="내용 전체 삭제">
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div class="col-3">
                        <button class="btn btn-info" onclick="location.href='/'">초기 화면으로</button>
                    </div>
                </div>
            </div>
        </div>

        ${template.footer()}

        `;
    },
    userInfo: function(userInfo, result) {
        return `
        ${template.header(userInfo.uid, userInfo.uname)}
        <div class="container" style="margin-top: 90px">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h3>사용자 정보</h3>
                        <hr>
                    </div>
                    <div class="col-2"></div>
                    <div class="col-8">    
                    <table class="table">
                        <tr>
                            <td class="align-middle" style="text-align: center" rowspan="4"><img src="${result.photo}" width="250"></td>
                            <td class="align-middle"><label for="uid">사용자 ID</label></td>
                            <td class="align-middle">${result.uid}</td>
                        </tr>
                        <tr>
                            <td class="align-middle"><label for="uname">사용자 이름</label></td>
                            <td class="align-middle">${result.uname}</td>
                        </tr>
                        <tr>
                            <td class="align-middle"><label for="tel">전화 번호</label></td>
                            <td class="align-middle">${result.tel}</td>
                        </tr>
                        <tr>
                            <td class="align-middle"><label for="email">이메일</label></td>
                            <td class="align-middle">${result.email}</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="text-align: center;">
                                <button class="btn btn-primary" onclick="location.href='/user/update/${result.uid}'">수정</button>
                                <button class="btn btn-secondary" onclick="location.href='/bbs/list/1'">돌아가기</button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="text-align: right;">
                                <button class="btn btn-danger" onclick="location.href='/user/delete/${result.uid}'">탈퇴</button>
                            </td>
                        </tr>
                    </table>
                    </div>
                    <div class="col-2"></div>
                </div>
            </div>
        </div>

        ${template.footer()}
        `
    },
    admin_userInfo: function(userInfo, rows) {
        let tableRow = '';
        for (let row of rows) {
            tableRow += `<tr>
                            <td class="align-middle" style="padding-right: 20px; text-align: center;"><a href="/user/userInfo/${row.uid}">${row.uid}</a></td>
                            <td class="align-middle" style="padding-right: 20px; text-align: center;"><img src="${row.photo}" height="50"></td> 
                            <td class="align-middle" style="padding-right: 20px; text-align: center;">${row.uname}</td>
                            <td class="align-middle" style="padding-right: 20px; text-align: center;">${row.tel}</td>
                            <td class="align-middle" style="padding-right: 20px; text-align: center;">${row.email}</td>
                            <td class="align-middle" style="padding-right: 20px; text-align: center;">
                                <button class="btn btn-outline-danger" data-toggle="tooltip" title="삭제" data-placement="bottom" onclick="location.href='/user/delete/${row.uid}'"><i class="far fa-trash-alt"></i></button>
                            </td>
                        </tr>
                        `;
        }
        return`
        ${template.header(userInfo.uid, userInfo.uname)}
        
        <div class="container" style="margin-top: 20px">  
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                    <h3>사용자 목록</h3>
                    <table class="table" style="margin-top: 20px">
                        <thead class="thead-light">
                            <tr>    
                                <th style="text-align: center; width: 10%">사용자 ID</th>
                                <th style="text-align: center; width: 10%">프로필</th>
                                <th style="text-align: center; width: 25%">사용자 이름</th>
                                <th style="text-align: center; width: 20%">전화 번호</th>
                                <th style="text-align: center; width: 20%">이메일 주소</th>
                                <th style="text-align: center; width: 5%">탈퇴</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRow}
                        </tbody>
                    </table>
                </div>
                <div class="col-1">
                </div>
            </div>
        </div>
        <br><br><br><br>

        ${template.footer()}`
    },
    updateUser: function(result) {
        console.log(result);
        return `
        ${template.header(result.uid, result.uname)}
        <div class="container" style="margin-top: 90px">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                    <h3>사용자 정보 수정</h3>
                    <hr>
                    </div>
                    <div class="col-2"></div>
                    <div class="col-8">
                        <p class="text-danger">*는 필수정보입니다.</p>
                        <form action="/user/update" method="post" enctype="multipart/form-data">
                            <input type="hidden" name="uid" value="${result.uid}">
                            <table class="table">
                                <tr>
                                    <td class="align-middle" style="text-align: center" rowspan="6"><img src="${result.photo}" width="200"></td>
                                    <td><label for="pwd">패스워드*</label></td>
                                    <td><input type="password" name="pwd" id="pwd"></td>
                                </tr>
                                <tr>
                                    <td><label for="pwd2">패스워드 확인*</label></td>
                                    <td><input type="password" name="pwd2" id="pwd2"></td>
                                </tr>
                                <tr>
                                    <td><label for="uname">사용자 이름*</label></td>
                                    <td><input type="text" name="uname" id="uname" value="${result.uname}"></td>
                                </tr>
                                <tr>
                                    <td><label for="tel">전화 번호</label></td>
                                    <td><input type="text" name="tel" id="tel" value="${result.tel}"></td>
                                </tr>
                                <tr>
                                    <td><label for="email">이메일</label></td>
                                    <td><input type="text" name="email" id="email" value="${result.email}"></td>
                                </tr>
                                <tr>
                                    <td><label for="photo">프로필 사진</label></td>
                                    <td><input type="file" name="photo" id="photo"></td>
                                <tr>
                                <tr>
                                    <td colspan="3" style="text-align: center;">
                                        <input class="btn btn-primary" type="submit" value="완료">
                                    </td>
                                </tr>
                            </table>
                        </form>
                        <button class="btn btn-secondary float-right" onclick="location.href='/bbs/list/1'">돌아가기</button>
                    </div>
                    <div class="col-2"></div>
                </div>
            </div>
        </div>
        ${template.footer()}`
    },
    deleteUser: function(uid, uname) {
        return `
        ${template.header(uid, uname)}

        <div class="container" style="margin-top: 90px">
            <div class="container">
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-6">
                        <h3>계정 탈퇴</h3>
                        <hr>
                        <p style="text-align: center; font-weight: bold">정말 탈퇴하시겠습니까?</p>
                        <br>
                        <div style="text-align: center">
                            <button class="btn btn-danger" onclick="location.href='/user/deleteConfirm/${uid}'">탈퇴</button>
                            <button class="btn btn-secondary" onclick="location.href='/user/userInfo/${uid}'">취소</button>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>
            </div>
        </div>
        
        ${template.footer()}`
    }
}