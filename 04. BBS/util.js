const crypto = require('crypto');

module.exports = {
    genHash: function(sth) {
        let shasum = crypto.createHash('sha256');
        shasum.update(sth);
        return shasum.digest('base64');
    },
    isLoggedIn: function(req, res, next) {
        if (!req.session.uid) {
            res.redirect('/');
        } else {
            next();
        }
    }
}