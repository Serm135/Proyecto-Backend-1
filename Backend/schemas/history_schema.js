let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let historySchema = new Schema({
    user_id:{type: String, required: true},
    product_id:{type: String, required: true},
    created_date:{type:String, required:true}
},{versionKey:false})

let History = mongoose.model('Histories',historySchema)

module.exports = History;