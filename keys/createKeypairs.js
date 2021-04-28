const crypto = require('crypto');
const fs = require('fs');

function genKeyPair(){
    //this will generate a key pair public and private: https://nodejs.org/api/crypto.html#crypto_crypto_generatekeypairsync_type_options
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs1',
          format: 'pem'
        }
      });
    // Create the public key file
    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey); 
    // Create the private key file
    fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
}
// Generates the keypair
genKeyPair();