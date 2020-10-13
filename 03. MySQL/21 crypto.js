const crypto = require('crypto');

let shasum = crypto.createHash('sha256');  // SHA: Secure Hash Algorithm sha256, sha512
shasum.update('password');                 // 암호화할 내용
let output = shasum.digest('base64');      // hex, base64

console.log('password: ', output);