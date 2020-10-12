module.exports.updateForm = (result) => {
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Girl Group Form</title>
</head>
<body>
    <h3>걸그룹 수정</h3>
    <hr>
    <form action="/update" method="POST">
    <input type="hidden" name="ggid" value="${result.ggid}">
        <table>
            <tr>
                <td><label for="title">그룹 이름</label></td>
                <td><input type="text" name="NAME" id="NAME" value="${result.NAME}"></td>
            </tr>
            <tr>
                <td><label for="debut">데뷔</label></td>
                <td><input type="text" name="debut" id="debut" value="${result.debut}"></td>
            </tr>
            <tr>
                <td colspan="2"><input type="submit" value="제출"></td>
            </tr>
        </table>
    </form>
</body>
</html>`
}