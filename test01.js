require('dotenv').config();
const NodeRSA = require('node-rsa');
const fs = require('fs');

const publicKey = fs.readFileSync(__dirname + '/keys/id_rsa_pub.pem', 'utf-8');
const privateKey = fs.readFileSync(__dirname + '/keys/id_rsa_priv.pem', 'utf-8');


const text = JSON.stringify({
    email: "termavorus",
    password: "hatrimov",
});;

//create keys
// const public_Key = key.exportKey('public');
// const private_key = key.exportKey('private');

// console.log(public_Key);
// console.log(private_key);

const public_Key = new NodeRSA(publicKey);
const private_key = new NodeRSA(privateKey);

//public encription
var encrypted = public_Key.encrypt(text, 'base64');
console.log(encrypted);

//privet decrypt
var decrypt = private_key.decrypt(encrypted, 'utf8');
console.log(decrypt);