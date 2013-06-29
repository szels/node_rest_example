var crypto = require('crypto');

exports.generateSHA256 = function(clean) {
    return crypto.createHash('sha256').update(clean).digest('hex');
};