let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usersSchema = new Schema({
    display_name:{type: String, required: true},
    username:{type: String, required: true},
    password:{type: String, required: true}
},{versionKey:false})

let User = mongoose.model('Users',usersSchema)

module.exports = User;