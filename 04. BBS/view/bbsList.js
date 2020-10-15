const template = require('./template');

module.exports.bbsList = function(uname, rows) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `<tr>
                        <td style="padding-right: 20px">${row.bid}</td>
                        <td style="padding-right: 20px">${row.title}</td>
                        <td style="padding-right: 20px">${row.uid}</td>
                        <td style="padding-right: 20px">${row.regDate}</td>
                        <td style="padding-right: 20px">${row.viewCount}</td>
                    </tr>`;
    }
    return `
    ${template.header()}

    <div class="container" style="margin-top: 90px">  
    <div class="row">
        <div class="col-2"></div>
        <div class="col-10">
            <h5>${uname}님 환영합니다.</h5>
            <table class="table table-striped">
                <thead>
                    <tr>    
                        <th>번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>날짜</th>
                        <th>조회 수</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRow}
                </tbody>
            </table>
        </div>
        <div class="col-2"></div>
    
    </div>

    ${template.footer()}

    `;
}