let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reviewsSchema = new Schema({
    user_id:{type: String, required: true},
    product_id:{type: String, required: true},
    rating:{type: Number, required: true},
    description:{type: String, required: true},
    created_date:{type:String, required:true}
},{versionKey:false})

let Review = mongoose.model('Reviews',reviewsSchema)

module.exports = Review;