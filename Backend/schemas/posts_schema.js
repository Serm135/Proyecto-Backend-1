let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postsSchema = new Schema({
    owner_id:{type: String, required: true},
    img_url:{type: String, required: true},
    display_name:{type: String, required: true},
    description:{type: String, required: true},
    price:{type: Number, required: true},
    created_date:{type:String, required:true}
},{versionKey:false})

let Post = mongoose.model('Posts',postsSchema)

module.exports = Post;