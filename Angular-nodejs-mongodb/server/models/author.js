const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    code: String,
    nameAuthor: String,
    Class: String,
    Address: String,
    like: String,
    img: String,
    email: String,
    birthday: String,
    phone: String
});

module.exports = mongoose.model('author', authorSchema, 'author');