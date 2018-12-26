const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    UserName: String,
    PassWord: String,
});

module.exports = mongoose.model('useradmin', userSchema, 'userAdmin');