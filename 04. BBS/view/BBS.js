const template = require('./template');

module.exports = {
    bbsList:  function(uname, rows) {
        let tableRow = '';
        for (let row of rows) {
            tableRow += `<tr>
                            <td style="padding-right: 20px; text-align: center;">${row.bid}</td>
                            <td style="padding-right: 20px; text-align: left;"><a href="/bbs/list/${row.bid}">${row.title}</a></td>
                            <td style="padding-right: 20px; text-align: center;">${row.uid}</td>
                            <td style="padding-right: 20px; text-align: center;">${row.regDate}</td>
                            <td style="padding-right: 20px; text-align: center;">${row.viewCount}</td>
                        </tr>
                        `;
        }
        return `
        ${template.header(uname)}
    
        <div class="container" style="margin-top: 20px">  
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                    <h5>${uname}님 환영합니다.</h5><br>
                    <hr>
                    <h3>게시글 목록</h3>
                    <table class="table table-striped" style="margin-top: 20px">
                        <thead>
                            <tr>    
                                <th style="text-align: center; width: 10%">글 번호</th>
                                <th style="text-align: center; width: 50%">제목</th>
                                <th style="text-align: center; width: 10%">글쓴이</th>
                                <th style="text-align: center; width: 20%">날짜</th>
                                <th style="text-align: center; width: 10%">조회 수</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRow}
                        </tbody>
                    </table>
                    <table class="table borderless">
                        <tr style="text-align: right">
                            <td>
                                <button class="btn btn-secondary" onclick="location.href='/bbs/create'">글쓰기</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-1">
                </div>
            </div>
        </div>
        ${template.footer()}
        `;
    },
    createForm: function(uname, uid) {
        return `
        ${template.header(uname)}
        <div class="container" style="margin-top: 20px">
            <h3>게시글 작성</h3>
            <hr>
            <form method="POST" action="/bbs/create">
                <table class="table-borderless">
                    <input type="hidden" name="uid" value="${uid}">
                    <tr>
                        <td><label for="title">제목</label></td>
                        <td><input type="text" name="title" id="title" size="100"></td>
                    </tr>
                    <tr>
                        <td><label for="content">내용</label></td>
                        <td><textarea style="resize: none" name="content" id="content" cols="140" rows="15"></textarea></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;">
                            <button type="submit" class="btn btn-primary">작성 완료</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        ${template.footer()}
        `;
    },
    postForm: function(uname, result, r_result) {
        console.log(result.uid);
        return `
        ${template.header(uname)}
        
        <div class="container" style="margin-top: 20px">
            <input type="hidden" name="uid" value="${result.uid}">
            <table class="table table-striped table-sm">
                <tr>
                    <td colspan="3" style="height: 10%">제목: ${result.title}</td>
                </tr>
                <tr>
                    <td>글 번호: ${result.bid}</td>
                    <td style="text-align: center">작성자: ${result.uname}</td>
                    <td style="text-align: right">작성 시간: ${result.modTime}</td>
                </tr>
                <tr>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td colspan="3">${result.content}</td>
                </tr>
            </table>
            <hr>
            <div class="form-row float-right">
                <button class="btn btn-primary" onclick="location.href='/bbs/update/${result.bid}/uid/${result.uid}'">수정</button> &nbsp;
                <button class="btn btn-danger" onclick="location.href='/bbs/delete/${result.bid}/uid/${result.uid}'">삭제</button> &nbsp;
                <button class="btn btn-secondary" onclick="location.href='/bbs/list'">글 목록</button>
            </div>
            <br><br>
        </div>

        ${template.footer()}`
    },
    updateForm: function(result) {
        return `
        ${template.header(result.uname)}
        
        <div class="container" style="margin-top: 20px">
        <form action="/update" method="POST">
            <input type="hidden" name="uid" value="${result.uid}">
            <table>
                <tr>
                    <td><label for="title">제목</label></td>
                    <td><input type="text" name="title" id="title" value="${result.title}"></td>
                </tr>
                <tr>
                    <td><label for="content">내용</label></td>
                    <td><input type="text" name="content" id="content" value="${result.content}"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="수정"></td>
                </tr>
            </table>
        </form>
        </div>

        ${template.footer()}
        `
    } //댓글 폼과 게시글 폼 분리
    //update bbs set viewCount=viewCount+1 where bid = 1001;
}