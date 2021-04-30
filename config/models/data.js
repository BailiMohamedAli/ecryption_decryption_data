const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    web_title: {
        type: String,
        required: true
    },
    web_url: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    }
});

const data = mongoose.model('Data', dataSchema);

module.exports = data;