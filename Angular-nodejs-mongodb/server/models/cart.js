const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    iduser: String,
    namesp: String,
    soluong:Number,
    costsp:Number,
    img:String,
    crtime:Date,
    sumcost:Number,
    confirm:Number
});

module.exports = mongoose.model('cart', cartSchema, 'carts');