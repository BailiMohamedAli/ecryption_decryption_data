const crypto = require('crypto');

function encryptWithPublicKey(publickey, message) {
    const bufferMessage = Buffer.from(message, 'utf-8');
    return crypto.publicEncrypt(publickey, bufferMessage);
}

module.exports.encryptWithPublicKey = encryptWithPublicKey;