module.exports.insertForm = () => {
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Girl Group Form</title>
</head>
<body>
    <h3>Girl Group Form</h3>
    <hr>
    <form action="/insert" method="POST">
        <table>
            <tr>
                <td><label for="NAME">그룹 이름</label></td>  <!--for와 id가 매칭-->
                <td><input type="text" name="NAME" id="NAME"></td>
            </tr>
            <tr>
                <td><label for="debut">데뷔</label></td>
                <td><input type="text" placeholder="YYYYMMDD" name="debut" id="debut"></td>
            </tr>
            <tr>
                <td colspan="2"><input type="submit" value="제출"></td>
            </tr>
        </table>
    </form>
</body>
</html>`
}