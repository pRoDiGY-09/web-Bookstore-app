const mongoose = require("mongoose");

const bookSchema=new mongoose.Schema({
    id:Number,
    title:String,
    author:String,
    genre:String,
    description:String,
    isbn:String,
    image:String,
    pages:Number,
    stock:Number,
    reviews:Number,
    published:String,
    publisher:String,
    price:Number
})

module.exports=mongoose.model('books',bookSchema);