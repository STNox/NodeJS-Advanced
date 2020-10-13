module.exports.alerMsg = function(message, url) {
    return `
    <!Doctype html>
    <html>
    <head>
        <titleAlert Message</title>
        <meta charset="utf-8">
    </head>
    <body>
        <script>
            let message = '${message}';
            let returnUrl = '${url}';
            alert(message);
            document.location.href = returnUrl;
        </script>
    </body>
    </html>
    `;
}