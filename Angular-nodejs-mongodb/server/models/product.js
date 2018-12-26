const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    // _id: String,
   name:String,
   loai:String,
   types:String,
   cost:Number,
   img:String,
   detail:String

});

module.exports = mongoose.model('product', productSchema, 'products');