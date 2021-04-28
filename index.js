const fs = require('fs');
const encrypt = require('./encryption/encrypt');

const publicKey = fs.readFileSync(__dirname + '/keys/id_rsa_pub.pem', 'utf-8');
//store in buffer
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, 'message to encrypt in here')
//checking result by Logs
console.log(encryptedMessage.toString());