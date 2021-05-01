const router = require('express').Router();
const Data = require('../config/models/data');
const fs = require('fs');
const NodeRSA = require('node-rsa');
//key pairsfor encryption decrryption process
const publicKey = fs.readFileSync(__dirname + '../../keys/id_rsa_pub.pem', 'utf-8');
const public_Key = new NodeRSA(publicKey);

//new data
router.post('/add', async (req, res) =>{
    const data = JSON.stringify({
        email: req.body.email,
        password: req.body.password,
    });
    const encryptedMessage =  public_Key.encrypt(data, 'base64');
    const newData = new Data({
        web_title: req.body.web_title,
        web_url: req.body.web_url,
        secret: encryptedMessage,
    });
    try{
        const addData = await newData.save();
        if(!addData) throw new Error ('registration process failed!');
        console.log(addData);
        res.status(200).redirect('/newdata');
    }catch (err){
        res.status(500).error(err);
    }
});

module.exports = router;