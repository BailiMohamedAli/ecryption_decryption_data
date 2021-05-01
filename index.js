const express = require('express');
const app = express();
const path = require('path');
const PORT = 3003;
//requiring DB
require('./config/dataBase');
//setup view engine, assets dir and bassic json protocol
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//routing data
app.use(require('./routes/main'));
//new data
app.use('/data', require('./routes/dataroute'))
//listning to server
app.listen(PORT, () => console.log(`server runnig on port ${PORT}:\nhttp://localhost:${PORT}`));