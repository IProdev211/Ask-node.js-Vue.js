const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogTagSchema = Schema({
    name : { type : String , unique : true , required : true},
    slug : { type : String , unique : true , required : true},
} , { timestamps : true });

module.exports = mongoose.model('blogTag' , blogTagSchema);