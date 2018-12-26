const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    email: String,
    text: String,
    timeComment: Date
});

module.exports = mongoose.model('commetnUser', commentSchema, 'commentUser');