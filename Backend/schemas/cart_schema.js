let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cartSchema = new Schema({
    user_id:{type: String, required: true},
    products:[{type: String, required: true}]
},{versionKey:false})

let Cart = mongoose.model('Carts',cartSchema)

module.exports = Cart;