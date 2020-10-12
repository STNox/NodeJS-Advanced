module.exports = {
    mainForm: (rows) => {
        let tableRow = '';
        for (let row of rows) {
            tableRow += `<tr>
                            <td>${row.ggid}</td>
                            <td>${row.NAME}</td>
                            <td>${row.debut}</td>
                            <td>
                                <a href="/update/${row.ggid}">수정</a> 
                                <a href="/delete/${row.ggid}">삭제</a>
                            </td>
                        </tr>`;
        }
        return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>걸그룹 조회</title>
</head>
<body>
    <h3>걸그룹 조회</h3>
    <hr>
    <table>
        <tr>
            <th>ggid</th>
            <th>그룹 이름</th>
            <th>데뷔</th>
        </tr>
        ${tableRow}
    </table>
    <button onclick="location.href='/insert'">추가</button>
</body>
</html>`
    }    
}