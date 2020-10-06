exports.index = function (title, list, content, control, showImg) {
    let tdImg = `<td> </td>`
    if (showImg === true)
        tdImg = `<td width="300"><img src="/${title}.jpg" alt="${title}" style="margin-left: 20px; height: 400px;"></td>`
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    <h1><a href="/">Web 기술</a></h1>
        ${list}
    <hr>
    <table>
        <tr>
            <td width="500">${content}</td>
            ${tdImg}
        </tr>
    </table>
    <hr>
    ${control}
</body>
</html>
`
} 
