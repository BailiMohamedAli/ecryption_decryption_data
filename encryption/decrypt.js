const crypto = require('crypto');

function decryptWithPrivateKey(privateKey, encryptedMessage){
    const message = Buffer.from(encryptedMessage, 'utf-8');
    return crypto.privateDecrypt(privateKey, message);
}

module.exports.decryptWithPrivateKey = decryptWithPrivateKey;