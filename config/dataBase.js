const mongoose = require('mongoose');
require('dotenv').config();

async function connect(uriDb) {
    try {
        await mongoose.connect(uriDb, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
          }, () =>
          console.log("MongoDB database Connected..."));
      } catch (error) {
        console.log("error");
        process.exit(1);
      }
}
const connection = connect(process.env.DB_STRING);
module.exports = connection;