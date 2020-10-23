const template = require('./template');

module.exports = {
    bbsList:  function(userInfo, rows, pageNo, startPage, endPage, totalPage) {
        let tableRow = '';
        for (let row of rows) {
            tableRow += `<tr>
                            <td style="padding-right: 20px; text-align: center;">${row.bid}</td>
                            <td style="padding-right: 20px; text-align: left;"><a href="/bbs/list/post/${row.bid}">${row.title} [${row.replyCount}]</a></td>
                            <td style="padding-right: 20px; text-align: left;"><img src="${row.photo}" width="20"> ${row.uname}</td>
                            <td style="padding-right: 20px; text-align: center;">${row.regDate}</td>
                            <td style="padding-right: 20px; text-align: center;">${row.viewCount}</td>
                        </tr>
                        `;
        }

        let leftPage = (pageNo > 10) ? `/bbs/list/${Math.floor(pageNo / 10) * 10}` : '#';
        let pages = `<li class="page-item">
                        <a class="page-link active" href="${leftPage}" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span></a>
                    </li>`;
        for (let page = startPage; page <= endPage; page++) {
            if (page === pageNo)
                pages += `<li class="page-item active" aria-current="page">
                            <span class="page-link">
                                ${page}<span class="sr-only">(current)</span>
                            </span>
                        </li>`;
            else
                pages += `<li class="page-item"><a class="page-link" href="/bbs/list/${page}">${page}</a></li>`;
        }

        let rightPage = (endPage < totalPage) ? `/bbs/list/${Math.ceil(pageNo / 10) * 10 + 1}` : '#';
        pages += `<li class="page-item">
                    <a class="page-link" href="${rightPage}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span></a>
                </li>`;
        return `
        ${template.header(userInfo.uid, userInfo.uname)}
    
        <div class="container" style="margin-top: 20px">  
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                    <h3>게시판</h3>
                    <table class="table table-striped" style="margin-top: 20px">
                        <thead>
                            <tr>    
                                <th style="text-align: center; width: 10%">글 번호</th>
                                <th style="text-align: center; width: 43%">제목</th>
                                <th style="text-align: center; width: 17%">글쓴이</th>
                                <th style="text-align: center; width: 20%">작성일</th>
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
                                <button class="btn btn-secondary" onclick="location.href='/bbs/create'"><i class="fas fa-pencil-alt" style="margin-right: 10px"></i>글쓰기</button>
                            </td>
                        </tr>
                    </table>
                    <ul class="pagination justify-content-center">
                        ${pages}
                    </ul>
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
        ${template.header(uid, uname)}
        <div class="container" style="margin-top: 20px">
            <h3>게시글 작성</h3>
            <hr>
            <form method="POST" action="/bbs/create" enctype="multipart/form-data">
                <table class="table-borderless">
                    <input type="hidden" name="uid" value="${uid}">
                    <tr>
                        <td><label class="col-form-label" for="title" style="margin-right: 10px">제목</label></td>
                        <td><input class="form-control" type="text" name="title" id="title" size="100"></td>
                    </tr>
                    <tr>
                        <td><label class="col-form-label" for="content" style="margin-right: 10px">내용</label></td>
                        <td><textarea class="form-control" style="resize: none" name="content" id="content" cols="140" rows="15"></textarea></td>
                    </tr>
                    <tr>
                        <td><label class="col-form-label" for="image" style="margin-right: 10px">이미지</label></td>
                        <td><input class="form-control" type="file" name="image" id="image"></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center">
                            <button type="submit" class="btn btn-primary">작성 완료</button>
                        </td>
                    </tr>
                </table>
            </form>
            <button class="btn btn-info float-right" onclick="location.href='/bbs/list/1'">돌아가기</buttton>
        </div>
        ${template.footer()}
        `;
    },
    postForm: function(userInfo, result, r_result) {
        result.content = result.content.replace(/\n/g, '<br>');
        if (userInfo.uid === result.uid) {
            return `
            ${template.header(userInfo.uid, userInfo.uname)}
            
            <div class="container" style="margin-top: 30px">
                <input type="hidden" name="uid" value="${result.uid}">
                <table class="table table-sm">
                    <tr>
                        <td style="font-size: 30px">제목: ${result.title}</td>
                        <td class="align-middle" style="text-align: right">작성자: <img src="${result.photo}" width="20"> ${result.uname}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left">글 번호: ${result.bid} | ${result.modTime}</td>
                        <td style="text-align: right">조회: ${result.viewCount}, 댓글: ${result.replyCount}</td>
                    </tr>
                    <tr>
                        <td colspan="2"></td>
                    </tr>
                    <tr>
                        <td colspan="2"><img src="${result.image}"><br><br>${result.content}</td>
                    </tr>
                </table>
                <hr>
                <div class="form-row float-right">
                    <button class="btn btn-outline-primary" data-toggle="tooltip" title="수정" data-placement="bottom" onclick="location.href='/bbs/update/${result.bid}/uid/${result.uid}'"><i class="fas fa-wrench"></i></button> &nbsp;
                    <button class="btn btn-outline-danger" data-toggle="tooltip" title="삭제" data-placement="bottom" onclick="location.href='/bbs/delete/${result.bid}/uid/${result.uid}'"><i class="far fa-trash-alt"></i></button> &nbsp;
                    <button class="btn btn-outline-secondary" data-toggle="tooltip" title="목록" data-placement="bottom" onclick="location.href='/bbs/list/1'"><i class="far fa-list-alt"></i></button>
                </div>
                <br><br>
                <h4>댓글</h4>
                <hr>
                <div class="container rounded borderless div-1" style="width: 800px">
                    ${this.replyForm(result, r_result)}
                    <br><br>
                </div>
                <div class="container" style="margin-top: 20px">
                    <form method="post" action="/bbs/reply">
                        <input type="hidden" name="bid" value="${result.bid}">
                        <table class="mx-auto">
                            <tr>
                                <td><textarea style="resize: none" name="content" id="content" cols="100" rows="3"></textarea></td>
                                <td><button class="btn btn-primary" type="submit" style="width: 70px; height: 70px">작성</button></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <br>
            <br>
            <br>
            <br>
    
            ${template.footer()}`
        } else {
            return `
            ${template.header(userInfo.uid, userInfo.uname)}
            
            <div class="container" style="margin-top: 30px">
                <input type="hidden" name="uid" value="${result.uid}">
                <table class="table table-sm">
                    <tr>
                        <td style="font-size: 30px">제목: ${result.title}</td>
                        <td class="align-middle" style="text-align: right">작성자: <img src="${result.photo}" width="20"> ${result.uname}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left">글 번호: ${result.bid} | ${result.modTime}</td>
                        <td style="text-align: right">조회: ${result.viewCount}, 댓글: ${result.replyCount}</td>
                    </tr>
                    <tr>
                        <td colspan="2"></td>
                    </tr>
                    <tr>
                        <td colspan="2"><img src="${result.image}"><br><br>${result.content}</td>
                    </tr>
                </table>
                <hr>
                <div class="form-row float-right">
                <button class="btn btn-outline-secondary" data-toggle="tooltip" title="목록" data-placement="bottom" onclick="location.href='/bbs/list/1'"><i class="far fa-list-alt"></i></button>
                </div>
                <br><br>
                <h4>댓글</h4>
                <hr>
                <div class="container rounded borderless div-1" style="width: 800px">
                    ${this.replyForm(result, r_result)}
                    <br><br>
                </div>
                <div class="container" style="margin-top: 20px">
                    <form method="post" action="/bbs/reply">
                        <input type="hidden" name="bid" value="${result.bid}">
                        <table class="mx-auto">
                            <tr>
                                <td class="align-middle"><textarea style="resize: none" name="content" id="content" cols="100" rows="3"></textarea></td>
                                <td class="align-middle"><button class="btn btn-primary" type="submit" style="width: 70px; height: 70px">작성</button></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <br>
            <br>
            <br>
            <br>
    
            ${template.footer()}`
        }
    },
    updateForm: function(result) {
        return `
        ${template.header(result.uid, result.uname)}
        
        <div class="container" style="margin-top: 20px">
        <form action="/bbs/update" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="uid" value="${result.uid}">
            <input type="hidden" name="bid" value="${result.bid}">
            <table>
                <tr>
                    <td><label class="col-form-label" for="title" style="margin-right: 10px">제목</label></td>
                    <td><input class="form-control" type="text" name="title" id="title" style="width: 400px" value="${result.title}"></td>
                </tr>
                <tr>
                    <td><label class="col-form-label" for="content" style="margin-right: 10px">내용</label></td>
                    <td><textarea class="form-control" style="resize: none" name="content" id="content" cols="100" rows="15">${result.content}</textarea></td>
                    <td><img src="${result.image}" width="200"></td>
                </tr>
                <tr>
                    <td><label class="col-form-label" for="image" style="margin-right: 10px">이미지</label></td>
                    <td><input class="form-control" type="file" name="image" id="image"></td>
                </tr>
                <tr>
                    <td style="text-align: center" colspan="2"><button type="submit" class="btn btn-primary">수정</button></td>
                </tr>
            </table>
        </form>
        <button class="btn btn-info float-right" onclick="location.href='/bbs/list/post/${result.bid}'">돌아가기</buttton>
        </div>

        ${template.footer()}
        `
    },
    searchList: function(userInfo, rows) {
        let tableRow = '';
        for (let row of rows) {
            tableRow += `<tr>
                            <td style="padding-right: 20px; text-align: center;">${row.bid}</td>
                            <td style="padding-right: 20px; text-align: left;"><a href="/bbs/list/post/${row.bid}">${row.title} [${row.replyCount}]</a></td>
                            <td style="padding-right: 20px; text-align: center;"><img src="${row.photo}" width="20"> ${row.uname}</td>
                            <td style="padding-right: 20px; text-align: center;">${row.regDate}</td>
                            <td style="padding-right: 20px; text-align: center;">${row.viewCount}</td>
                        </tr>
                        `;
        }
        return `
        ${template.header(userInfo.uid, userInfo.uname, rows[0].title)}
    
        <div class="container" style="margin-top: 20px">  
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                    <h3>검색 결과</h3>
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
                </div>
                <div class="col-1">
                </div>
            </div>
        </div>
        ${template.footer()}
        `;
    },
    replyForm: function(result, r_result) {
        let tableRow = '';
        for (let row of r_result) {
            if (row.bid !== result.bid) {
                tableRow = '';
            } else{
                if (row.isMine === 1) {
                    tableRow += `<table cellpadding="7" width="300" class="float-right">
                                    <tr>
                                        <td style="padding-right: 20px; text-align: center;"><img src="${row.photo}" width="20"> ${row.uname}</td>
                                        <td style="padding-right: 20px; text-align: right;">${row.regTime}</td>
                                    </tr><br>
                                    <tr>
                                        <td class="borderless bg-primary text-white rounded" colspan="2" style="padding-right: 20px; text-align: auto;">${row.content}</td>
                                    </tr>
                                </table>
                                <br><br><br>
                                `;
    
                } else {
                    tableRow += `<table cellpadding="7" width="300" class="float-left">
                                    <tr>
                                        <td style="padding-right: 20px; text-align: center;"><img src="${row.photo}" width="20"> ${row.uname}</td>
                                        <td style="padding-right: 20px; text-align: right;">${row.regTime}</td>
                                    </tr><br>
                                    <tr>
                                        <td class="borderless bg-white rounded" colspan="2" style="padding-right: 20px; text-align: auto;">${row.content}</td>
                                    </tr>
                                </table>
                                <br><br><br>
                                `;
                }
            }    
        }
        return `${tableRow}`;
    }
     //댓글 폼과 게시글 폼 분리
    //update bbs set viewCount=viewCount+1 where bid = 1001;
}