const router = require('express').Router();
const Data = require('../config/models/data');
const fs = require('fs');
const NodeRSA = require('node-rsa');
//key pairsfor encryption decrryption process
const privateKey = fs.readFileSync(__dirname + '../../keys/id_rsa_priv.pem', 'utf-8');
const private_key = new NodeRSA(privateKey);
//routing data
const nav ={
    local: '',
    username: '',
    data:''
}
//home
router.get('/', (req, res) => {
    nav.local= 'home';
    res.render('pages/home', {nav : nav});
});
//add new data form
router.get('/newdata', (req, res) => {
    nav.local= 'addData';
    res.render('pages/adddata', {nav : nav});
});
//data feed
router.get('/datafeed', async (req, res) =>{
    try {
        const rawData = await Data.find();
        if(!rawData) throw Error('extracting data process fail!');
        let decrytedData = rawData.map(data =>{
            let decrypt = JSON.parse(private_key.decrypt(data.secret, 'utf8'));
            console.log(decrypt);
            return {
                web_title: data.web_title,
                web_url: data.web_url,
                ...decrypt
            }
        });
        nav.local= 'dataFeed';
        nav.data = decrytedData;
        res.status(200).render('pages/managedata', {nav : nav});
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;