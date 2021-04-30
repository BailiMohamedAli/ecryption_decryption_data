const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const encrypt = require('./encryption/encrypt');
const decrypt = require('./encryption/decrypt');
//keys
const publicKey = fs.readFileSync(__dirname + '/keys/id_rsa_pub.pem', 'utf-8');
const privateKey = fs.readFileSync(__dirname + '/keys/id_rsa_priv.pem', 'utf-8');
const PORT = 3003;

//setup view engine, assets dir and bassic json protocol
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//routing data
const nav ={
    local: '',
    username: ''
}

app.get('/', (req, res) => {
    nav.local= 'home';
    res.render('pages/home', {nav : nav});
})
app.get('/newdata', (req, res) => {
    nav.local= 'addData';
    res.render('pages/adddata', {nav : nav});
})
//new data
app.post('/data/add', (req, res) =>{
    console.log(req.body);
    res.redirect('/newdata');
})
//listning to server
app.listen(PORT, () => console.log(`server runnig on port ${PORT}:\nhttp://localhost:${PORT}`));