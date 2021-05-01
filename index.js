const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const NodeRSA = require('node-rsa');
//key pairsfor encryption decrryption process
const publicKey = fs.readFileSync(__dirname + '/keys/id_rsa_pub.pem', 'utf-8');
const privateKey = fs.readFileSync(__dirname + '/keys/id_rsa_priv.pem', 'utf-8');
const public_Key = new NodeRSA(publicKey);
const private_key = new NodeRSA(privateKey);
const PORT = 3003;
//requiring DB
require('./config/dataBase');
//model 
const Data = require('./config/models/data');
//setup view engine, assets dir and bassic json protocol
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//routing data
const nav ={
    local: '',
    username: '',
    data:''
}
//home
app.get('/', (req, res) => {
    nav.local= 'home';
    res.render('pages/home', {nav : nav});
});
//add new data form
app.get('/newdata', (req, res) => {
    nav.local= 'addData';
    res.render('pages/adddata', {nav : nav});
});
//data feed
app.get('/datafeed', async (req, res) =>{
    try {
        const rawData = await Data.find();
        if(!rawData) throw Error('extracting data process fail!');
        let decrytedData = rawData.map(data =>{
            let decrypt = JSON.parse(private_key.decrypt(data.secret, 'utf8'));
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
        res.status(500).json({message: err});
    }
})
//new data
app.post('/data/add', async (req, res) =>{
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
//listning to server
app.listen(PORT, () => console.log(`server runnig on port ${PORT}:\nhttp://localhost:${PORT}`));