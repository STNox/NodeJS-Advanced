module.exports = {
    getPassword: function() {
        const crypto = require('crypto');
    
        let shasum = crypto.createHash('sha256');  // SHA: Secure Hash Algorithm sha256, sha512
        shasum.update('1234');
        let output = shasum.digest('base64');      // hex, base64
        return output;
    }
}