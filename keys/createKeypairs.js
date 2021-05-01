const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 4096});
const fs = require('fs');
// you need to run this algorith one time to generate your keys to use them in encryption
//==> node keys/createKeypairs.js
//create keys
const public_Key = key.exportKey('public');
const private_key = key.exportKey('private');

// Create the public key file
fs.writeFileSync(__dirname + '/id_rsa_pub.pem', public_Key); 
// Create the private key file
fs.writeFileSync(__dirname + '/id_rsa_priv.pem', private_key);
